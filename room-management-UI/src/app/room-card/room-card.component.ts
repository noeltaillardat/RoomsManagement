import { Component, OnInit, Input, Output } from '@angular/core';
import { DataService } from '../data.service';
import { Room } from '../room';
import { NgxMaterialTimepickerTheme } from 'ngx-material-timepicker';
import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-room-card',
  templateUrl: './room-card.component.html',
  styleUrls: ['./room-card.component.scss']
})
export class RoomCardComponent implements OnInit {
  @Input() room: Room;
  /**
  @Input() clockOn = new Subject<{ light: string; computer: string; heater: string; window: string }>();
  @Input() clockOff= new Subject<{ light: string; computer: string; heater: string; window: string }>();
  
  public clockOn$  = this.clockOn .asObservable();
  public clockOff$ = this.clockOff.asObservable();*/
      
  darkTheme: NgxMaterialTimepickerTheme = {
    container: {
      bodyBackgroundColor: '#424242',
      buttonColor: '#ff4081'
    },
    dial: {
      dialBackgroundColor: '#555',
    },
    clockFace: {
      clockFaceBackgroundColor: '#555',
      clockHandColor: '#ff4081',
      clockFaceTimeInactiveColor: '#fff'
    }
  };
  primaryTheme: NgxMaterialTimepickerTheme = {
    container: {
      bodyBackgroundColor: '#fff',
      buttonColor: '#ff4081'
    },
    dial: {
      dialBackgroundColor: '#ff4081',
    },
    clockFace: {
      clockFaceBackgroundColor: '#eee',
      clockHandColor: '#ff4081',
      clockFaceTimeInactiveColor: '#aaa'
    }
  };
  constructor(private dataService: DataService) { /**
    this.clockOn .next({ light: null, computer: null, heater: null, window: null });
    this.clockOff.next({ light: null, computer: null, heater: null, window: null });*/
  }

  ngOnInit() {
  }

  getFullName(): string {
    // replace "_" by " "
    var name: string = this.room.name.replace(/_/g, " ");
    // if the room has no name, just a word or number,
    // call it "Room [x]"
    return ((name == this.room.name) ? "Room " : "") + name;
  }

  getName(): string {
    // replace "_" by " "
    return this.room.name.replace(/_/g, " ");
  }

  getFloorString(): string {
    switch (this.room.floor) {
      case 0:
        return "Ground floor";
      case 1:
        return "First floor";
      case 2:
        return "Second floor";
      case 3:
        return "Third floor";
      default:
        return this.room.floor + "th floor";
    }
  }

  getFloorAbbr(): string {
    switch (this.room.floor) {
      case 0:
        return "Gnd";
      case 1:
        return "1st";
      case 2:
        return "2nd";
      case 3:
        return "3rd";
      default:
        return this.room.floor + "th";
    }
  }

  getId(): string {
    return this.room.building + "/" + this.room.name;
  }

  getActuatorState(actuator: string): string {
    let state: string = "false";
    for (let act of this.room.actuators) {
      if (act.name === actuator) {
        state = act.state;
      }
    }
    return state;
  }

  setActuatorState(actuator: string, state: string): void {
    for (let act of this.room.actuators) {
      if (act.name === actuator) {
        act.state = state;
      }
    }
  }
  
  setActuatorTime(actuator: string, state: string, time: string): void {
    for (let act of this.room.actuators) {
      if (act.name === actuator) {
        if (state == "on" || state == "true")
          act.timeOn = time;
        else 
          act.timeOff = time;
      }
    }
  }
  
  getActuatorTimeOn(actuator: string): string {
    let time: string;
    for (let act of this.room.actuators) {
      if (act.name === actuator) {
        time = act.timeOn;
      }
    }
    return time;
  }
  getActuatorTimeOff(actuator: string): string {
    let time: string;
    for (let act of this.room.actuators) {
      if (act.name === actuator) {
        time = act.timeOff;
      }
    }
    return time;
  }

  getColor(actuator: string, state: string) {
    if (state === "false") {
      return "#eee";
    } else {
      switch (actuator) {
        case "light":
          if (state === "false")
            return "#eee";
          else
            return "accent";
        default:
          return "#ddd";
      }
    }
  }

  getIcon(actuator: string) {
    switch (actuator) {
      case "light":
        return "highlight";
      case "computer":
        return "computer";
      case "heater":
        return "waves";
      case "window":
        return "open-in-brower";
      case "temperature":
        return "window";
      default:
        return "devices_other";
    }
  }

  getLabel(actuator: string) {
    switch (actuator) {
      case "light":
        return " Light";
      case "computer":
        return "Computer";
      case "heater":
        return "Heater";
      case "window":
        return "Window's shutter";
      case "temperature":
        return "Temperature";
      default:
        return actuator;
    }
  }

  onToggle(event, actuator: string) {
    this.setActuatorState(actuator, event.checked.toString());
    this.dataService.sendSetAnActuator(this.getId(), actuator, this.getActuatorState(actuator)).subscribe((data: number) => {
    });
  }
  onChanged(actuator: string,  state: string, erase: boolean) {
    if (erase) {
      this.setActuatorTime(actuator, state, null);
    }
    this.dataService.sendSetAnActuatorTime(this.getId(), actuator, "on", this.getActuatorTimeOn(actuator)).subscribe((data: number) => {
    });
  }
  
  deleteScheduled() {
    this.room.actuators.forEach(act => {
      this.setActuatorTime(act.name, "on", null);
      this.setActuatorTime(act.name, "off", null);
      this.dataService.sendSetAnActuatorTime(this.getId(), act.name, "on", this.getActuatorTimeOn(act.name)).subscribe((data: number) => {
      });
      this.dataService.sendSetAnActuatorTime(this.getId(), act.name, "off", this.getActuatorTimeOff(act.name)).subscribe((data: number) => {
      });
    });
  }
/** 
  public subscriptionOn = this.clockOn$.subscribe(data => {
    // do stuff with data
    // e.g. this.property = data
  });
  public subscriptionOff = this.clockOff$.subscribe(data => {
    // do stuff with data
    // e.g. this.property = data
  });
  ngOnDestroy() {
    this.subscriptionOn.unsubscribe();
    this.subscriptionOff.unsubscribe();
  }*/
}

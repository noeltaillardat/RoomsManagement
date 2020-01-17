import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../data.service';
import { Room } from '../room';
import { delay } from 'rxjs/operators';
import { NgxMaterialTimepickerTheme } from 'ngx-material-timepicker';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  rooms: Room[] = [];
  interval: any;
  @Input() clockOn: { light: string; computer: string; heater: string; window: string }
    = { light: null, computer: null, heater: null, window: null };
  @Input() clockOff: { light: string; computer: string; heater: string; window: string }
    = { light: null, computer: null, heater: null, window: null };

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

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.sendGetRoomsAllRooms().subscribe((data: any[]) => {
      console.log(data);
      this.rooms = data;
      for (let room of this.rooms) {
        room.actuators = [];
      }
      this.refreshAll();
    })
    this.interval = setInterval(() => { 
      this.refreshAll(); 
    }, 30000);

  }

  getId(room: Room): string {
    return room.building + "/" + room.name;
  }

  refreshAll() {
    for (let room of this.rooms) {
      let actuatorsName = ["light", "computer"];
      for (let actuator of actuatorsName) {
        this.dataService.sendGetAnActuator(this.getId(room), actuator).subscribe((data: string) => {
          var device = { name: actuator, state: data , timeOn: null, timeOff: null};

          let checked = false;
          for (let act of room.actuators) {
            if (act.name == actuator) {
              act.state = device.state;
              checked = true;
            }
          }
          if (!checked)
            room.actuators.push(device);

        });
      }
    }
  }

  setActuatorsState(actuator: string, state: string) {
    for (let room of this.rooms) {
      this.dataService.sendSetAnActuator(this.getId(room), actuator, state).subscribe((data: number) => {
        var device = { name: actuator, state: state, timeOn: "false", timeOff: "false"};

        let checked = false;
        for (let act of room.actuators) {
          if (act.name == actuator) {
            act.state = device.state;
            checked = true;
          }
        }
        if (!checked)
          room.actuators.push(device);
      });
    }
  }
  setActuatorsStateSchedule(actuator: string, state: string) {
    for (let room of this.rooms) {
      this.dataService.sendSetAnActuator(this.getId(room), actuator, state).subscribe((data: number) => {
        var device = { name: actuator, state: state, timeOn: "false", timeOff: "false"};

        let checked = false;
        for (let act of room.actuators) {
          if (act.name == actuator) {
            act.state = device.state;
            checked = true;
          }
        }
        if (!checked)
          room.actuators.push(device);
      });
    }
  }/*
  getClockOn(actuator: string): string {
    let splitted: string[] = this.clockOn[actuator].split(':');
    let res: string;
    if (Number(splitted[0]) > 23)
      res = '';
    else
      res = splitted[0] + ':' + splitted[1];
    return res;
  }
  getClockOff(actuator: string): string {
    let splitted: string[] = this.clockOff[actuator].split(':');
    let res: string;
    if (Number(splitted[0]) > 23)
      res = '';
    else
      res = splitted[0] + ':' + splitted[1];
    return res;
  }
  /*  
    getActuatorsState(roomID: string, actuator: string): void {
      for (let room of this.rooms) {
        if (roomID === this.getId(room)) {
          this.dataService.sendGetAnActuator(roomID, actuator).subscribe((data: string) => {
            var device = { name: actuator, state: data };
            for (let act of room.actuators) {
              if (act.name == actuator)
                act.state = device.state;
            }
          });
        }
      }
    }
  */
}

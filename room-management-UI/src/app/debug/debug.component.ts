import { Component, OnInit, Input, HostListener } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-debug',
  templateUrl: './debug.component.html',
  styleUrls: ['./debug.component.scss']
})
export class DebugComponent implements OnInit {

  constructor(private dataService: DataService) { }
  answer: string = '';
  resGetRooms: string = '';
  resGetRoomIds: string = '';
  resGetRoomFloor: string = '';
  resGetActuator: {light: string; computer: string; heater: string; window: string; temperature: string}
    = {light: ' ', computer: ' ', heater: ' ', window: ' ', temperature: ' '};
  resGetActuatorTime: {light: string; computer: string; heater: string; window: string; temperature: string}
    = {light: ' ', computer: ' ', heater: ' ', window: ' ', temperature: ' '};
  
  @Input() building: string;
  @Input() room: string;
  @Input() actuator: string;
  @Input() state: string;
  @Input() top: number = 64;
  @Input() time: string;

  ngOnInit() {/*
    ["light", "computer", "heater", "window", "temperature"].forEach(element => {
      this.resGetActuator[element] = '';
    });*/
  }
  onSubmitGetActuator(actuator: string) {
    this.dataService.sendGetAnActuator(this.building + "/" + this.room, actuator).subscribe((data: string) => {
      this.resGetActuator[actuator] = " " + data;
    });
  }
  onSubmitSetActuator(actuator: string) {
    this.dataService.sendSetAnActuator(this.building + "/" + this.room, actuator, this.state).subscribe((data: any) => {
      this.answer = data;
    });
  }
  onSubmitGetActuatorTime(actuator: string) {
    this.dataService.sendGetAnActuatorTime(this.building + "/" + this.room, actuator, this.state).subscribe((data: string) => {
      this.resGetActuatorTime[actuator] = " " + data;
    });
  }
  onSubmitSetActuatorTime(actuator: string) {
    this.dataService.sendSetAnActuatorTime(this.building + "/" + this.room, actuator, this.state, this.time).subscribe((data: any) => {
      this.answer = data;
    });
  }
  
  onSubmitGetRooms() {
    this.dataService.sendGetRoomsAllRooms().subscribe((data: JSON) => {
      this.resGetRooms = JSON.stringify(data);
    });
  }

  onSubmitGetRoomsIds() {
    this.dataService.sendGetRoomsAllRoomsIds().subscribe((data: JSON) => {
      this.resGetRoomIds = JSON.stringify(data);
    });
  }
  
  onSubmitGetRoomFloor() {
    this.dataService.sendGetRoomFloor(this.building + "/" + this.room).subscribe((data: JSON) => {
      this.resGetRoomFloor = JSON.stringify(data);
    });
  }
  
  @HostListener("window:scroll", []) onWindowScroll() {
    // do some stuff here when the window is scrolled
    const verticalOffset = window.pageYOffset 
          || document.documentElement.scrollTop 
          || document.body.scrollTop || 0;
    this.top = verticalOffset<64 ? 64-verticalOffset : 0;
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

import {  throwError, Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private LIGHTS_MS      = "http://127.0.0.1:8082";
  private COMPUTER_MS    = "http://127.0.0.1:8083";
  private HEATER_MS      = "http://127.0.0.1:8084";
  private WINDOW_MS      = "http://127.0.0.1:8085";
  private TEMPERATURE_MS = "http://127.0.0.1:8086";
  private ROOMS_MS       = "http://127.0.0.1:8091";

  constructor(private httpClient: HttpClient) {}
  
  // ROOM_MS
  public sendGetRoomsAllRooms() {
    return this.get(this.ROOMS_MS + "/all").pipe(retry(3), catchError(this.handleError));
  }

  public sendGetRoomsAllRoomsIds() {
    return this.get(this.ROOMS_MS + "/all-id").pipe(retry(3), catchError(this.handleError));
  }

  public sendGetRoomFloor(roomID: string) {
    return this.get(this.ROOMS_MS + "/INSA/" + roomID + "/floor");
  }

  // ACTUATORS

  // URLs of MS based on the actuator to reach
  getURL(actuator: string): string {
    switch (actuator) {
      case "light":    return this.LIGHTS_MS;
      case "computer": return this.COMPUTER_MS;
      case "heater":   return this.HEATER_MS;
      case "window":   return this.WINDOW_MS;
      default:         return null;
    }
  }

  public sendGetAnActuator(roomID: string, actuator: string)  {
    return this.get(this.getURL(actuator) + "/INSA/"+ roomID + "/" + actuator);
  }

  public sendSetAnActuator(roomID: string, actuator: string, state: string) {
    return this.get(this.getURL(actuator) + "/INSA/"+ roomID + "/" + actuator + "/" + state);
  }

  public sendGetAnActuatorTime(roomID: string, actuator: string, state: string) {
    return this.get(this.getURL(actuator) + "/INSA/"+ roomID + "/" + actuator + "/" + state + "/scheduled");
  }
  
  public sendSetAnActuatorTime(roomID: string, actuator: string, state: string, time: string) {
    if (time == null)
      time = '42:00:00';
    return this.get(this.getURL(actuator) + "/INSA/"+ roomID + "/" + actuator + "/" + state + "/" + time);
  }

  // log then httpClient
  get(url: string) {
    console.log(url)
    return this.httpClient.get(url);
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}

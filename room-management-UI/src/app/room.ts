import { DataService } from './data.service';

export class Room {
    building: string;
    floor: number;
    name: string;

    actuators: { name: string, state: string, timeOn: string, timeOff: string }[];
    sensors: { name: string, value: number, unit: string; }[];
    
/*
    getActuatorState(actuator: string): string {
        let state: string = "false";
        for (let act of this.actuators) {
            if (act.name === actuator) {
                state = act.state;
            }
        }
        return state;
    }

    setActuatorState(actuator: string, state: string): void {
        for (let act of this.actuators) {
            if (act.name === actuator) {
                act.state = state;
            }
        }
    }*/
}


// Module represents an industrial unit with sensors
import { Sensor, SinusoidalSensor } from '../sensor/Sensor';

export class Module {
  public sensors: Sensor[] = [];
  constructor(public name: string, public moduleIndex: number) {
    // Create 3 sensors per module
    for (let i = 1; i <= 3; i++) {
      this.sensors.push(
        new SinusoidalSensor(
          `${this.name}_Sensor${i}`,
          {
            amplitude: 10,
            frequency: 0.5 + 0.1 * i, // slightly different frequency for each sensor
            phase: 0,
            dcOffset: 5 * i, // different DC offset for each sensor
          }
        )
      );
    }
  }
}
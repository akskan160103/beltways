// Module represents an industrial unit with sensors
import { Sensor, SinusoidalSensor, SinusoidalSensorParams } from '../sensor/Sensor';

export class Module {
  public sensors: Sensor[] = [];
  constructor(public name: string, public moduleIndex: number, sensorConfigs: SinusoidalSensorParams[]) {
    // Create sensors based on config
    for (let i = 0; i < sensorConfigs.length; i++) {
      this.sensors.push(
        new SinusoidalSensor(
          `${this.name}_Sensor${i + 1}`,
          sensorConfigs[i]
        )
      );
    }
  }
}
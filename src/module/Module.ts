// Module represents an industrial unit with sensors
import { Sensor, SinusoidalSensor, NoisySinusoidalSensor, SquareWaveSensor, SensorConfig } from '../sensor/Sensor';

export class Module {
  public sensors: Sensor[] = [];
  constructor(public name: string, public moduleIndex: number, sensorConfigs: SensorConfig[]) {
    // Create sensors based on config type
    for (let i = 0; i < sensorConfigs.length; i++) {
      const cfg = sensorConfigs[i];
      let sensor: Sensor;
      if (cfg.type === 'sinusoidal') {
        sensor = new SinusoidalSensor(`${this.name}_Sensor${i + 1}`, cfg);
      } else if (cfg.type === 'noisy_sinusoidal') {
        sensor = new NoisySinusoidalSensor(`${this.name}_Sensor${i + 1}`, cfg, cfg.noiseAmplitude);
      } else if (cfg.type === 'square_wave') {
        sensor = new SquareWaveSensor(`${this.name}_Sensor${i + 1}`, cfg.amplitude, cfg.frequency, cfg.dcOffset);
      } else {
        throw new Error(`Unknown sensor type: ${(cfg as any).type}`);
      }
      this.sensors.push(sensor);
    }
  }
}
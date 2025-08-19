// Base Sensor class
export abstract class Sensor {
  constructor(public name: string) {}
  abstract getValue(timestamp: number): number;
}

// SinusoidalSensor simulates a sensor with a sine wave pattern
export interface SinusoidalSensorParams {
  amplitude: number;
  frequency: number; // Hz
  phase: number; // radians
  dcOffset: number;
}

export class SinusoidalSensor extends Sensor {
  private params: SinusoidalSensorParams;

  constructor(name: string, params: SinusoidalSensorParams) {
    super(name);
    this.params = params;
  }

  getValue(timestamp: number): number {
    // timestamp in milliseconds
    const t = timestamp / 1000; // convert to seconds
    const { amplitude, frequency, phase, dcOffset } = this.params;
    return amplitude * Math.sin(2 * Math.PI * frequency * t + phase) + dcOffset;
  }
}
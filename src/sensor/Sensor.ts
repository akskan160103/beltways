// Base Sensor class
export abstract class Sensor {
  constructor(public name: string) {}
  abstract getValue(timestamp: number): number;
}

// SinusoidalSensor simulates a sensor with a sine wave pattern
export interface SinusoidalSensorParams {
  amplitude: number;
  frequency: number; // Hz by default
  phase: number; // radians by default
  dcOffset: number;
}

// SensorConfig for extensibility
export type SensorConfig =
  | ({ type: 'sinusoidal' } & SinusoidalSensorParams)
  | ({ type: 'noisy_sinusoidal'; noiseAmplitude: number } & SinusoidalSensorParams)
  | ({ type: 'square_wave'; amplitude: number; frequency: number; dcOffset: number });

export class SinusoidalSensor extends Sensor {
  private params: SinusoidalSensorParams;
  constructor(name: string, params: SinusoidalSensorParams) {
    super(name);
    this.params = params;
  }
  getValue(timestamp: number): number {
    const t = timestamp / 1000;
    const { amplitude, frequency, phase, dcOffset } = this.params;
    return amplitude * Math.sin(2 * Math.PI * frequency * t + phase) + dcOffset;
  }
}

// NoisySinusoidalSensor: Sine wave with added random noise
export class NoisySinusoidalSensor extends Sensor {
  private params: SinusoidalSensorParams;
  private noiseAmplitude: number;
  constructor(name: string, params: SinusoidalSensorParams, noiseAmplitude: number) {
    super(name);
    this.params = params;
    this.noiseAmplitude = noiseAmplitude;
  }
  getValue(timestamp: number): number {
    const t = timestamp / 1000;
    const { amplitude, frequency, phase, dcOffset } = this.params;
    const noise = (Math.random() * 2 - 1) * this.noiseAmplitude;
    return amplitude * Math.sin(2 * Math.PI * frequency * t + phase) + dcOffset + noise;
  }
}

// SquareWaveSensor: Digital on/off simulation
export class SquareWaveSensor extends Sensor {
  private amplitude: number;
  private frequency: number;
  private dcOffset: number;
  constructor(name: string, amplitude: number, frequency: number, dcOffset: number) {
    super(name);
    this.amplitude = amplitude;
    this.frequency = frequency;
    this.dcOffset = dcOffset;
  }
  getValue(timestamp: number): number {
    const t = timestamp / 1000;
    const period = 1 / this.frequency;
    const phase = (t % period) / period;
    return (phase < 0.5 ? this.amplitude : -this.amplitude) + this.dcOffset;
  }
}
import { SinusoidalSensor } from './Sensor';

const sensor = new SinusoidalSensor('TestSensor', {
  amplitude: 10,
  frequency: 0.5, // 0.5 Hz (period = 2s)
  phase: 0,
  dcOffset: 5,
});

console.log('Testing SinusoidalSensor:');
const now = Date.now();
for (let i = 0; i <= 10; i++) {
  const t = now + i * 200; // every 200ms
  const value = sensor.getValue(t);
  console.log(`t = ${((t - now) / 1000).toFixed(2)}s: value = ${value.toFixed(3)}`);
}
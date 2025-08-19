// PLCMockServer manages modules and configuration
import { Module } from '../module/Module';

export class PLCMockServer {
  private modules: Module[] = [];
  private intervalId: NodeJS.Timeout | null = null;

  constructor() {
    // For demo: create 2 modules
    for (let i = 1; i <= 2; i++) {
      this.modules.push(new Module(`Module${i}`, i));
    }
  }

  start() {
    console.log('PLC Mock Server started.');
    this.intervalId = setInterval(() => {
      const now = Date.now();
      this.modules.forEach((mod) => {
        console.log(`--- ${mod.name} ---`);
        mod.sensors.forEach((sensor) => {
          const value = sensor.getValue(now);
          console.log(`${sensor.name}: ${value.toFixed(3)}`);
        });
      });
      console.log('');
    }, 1000); // update every second
  }

  stop() {
    if (this.intervalId) clearInterval(this.intervalId);
  }
}
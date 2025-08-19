// PLCMockServer manages modules and configuration
import { Module } from '../module/Module';
import * as fs from 'fs';
import * as path from 'path';

interface SensorConfig {
  amplitude: number;
  frequency: number;
  phase: number;
  dcOffset: number;
}

interface ModuleConfig {
  name: string;
  sensors: SensorConfig[];
}

interface PLCConfig {
  updateIntervalMs: number;
  modules: ModuleConfig[];
}

export class PLCMockServer {
  private modules: Module[] = [];
  private intervalId: NodeJS.Timeout | null = null;
  private updateIntervalMs: number = 1000;

  constructor() {
    const configPath = path.resolve(__dirname, '../../config.json');
    const config: PLCConfig = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    this.updateIntervalMs = config.updateIntervalMs;
    this.modules = config.modules.map((modConfig, idx) =>
      new Module(modConfig.name, idx + 1, modConfig.sensors)
    );
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
    }, this.updateIntervalMs);
  }

  stop() {
    if (this.intervalId) clearInterval(this.intervalId);
  }
}
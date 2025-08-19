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

interface ServerConfig {
  host: string;
  port: number;
}

interface PLCConfig {
  server: ServerConfig;
  updateIntervalMs: number;
  modules: ModuleConfig[];
}

export class PLCMockServer {
  private modules: Module[] = [];
  private intervalId: NodeJS.Timeout | null = null;
  private updateIntervalMs: number = 1000;
  private serverConfig: ServerConfig = { host: '127.0.0.1', port: 3000 };

  constructor() {
    const configPath = path.resolve(__dirname, '../../config.json');
    const config: PLCConfig = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    this.updateIntervalMs = config.updateIntervalMs;
    this.serverConfig = config.server;
    this.modules = config.modules.map((modConfig, idx) =>
      new Module(modConfig.name, idx + 1, modConfig.sensors)
    );
  }

  start() {
    console.log('PLC Mock Server started.');
    console.log(`Server connection parameters: host=${this.serverConfig.host}, port=${this.serverConfig.port}`);
    this.intervalId = setInterval(() => {
      const now = Date.now();
      const isoTimestamp = new Date(now).toISOString();
      this.modules.forEach((mod) => {
        console.log(`--- ${mod.name} ---`);
        mod.sensors.forEach((sensor) => {
          const value = sensor.getValue(now);
          console.log(`[${isoTimestamp}] ${sensor.name}: ${value.toFixed(3)}`);
        });
      });
      console.log('');
    }, this.updateIntervalMs);
  }

  stop() {
    if (this.intervalId) clearInterval(this.intervalId);
  }
}
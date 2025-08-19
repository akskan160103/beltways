// PLCMockServer manages modules, configuration, and real-time sensor updates
import { Module } from '../module/Module';
import { SensorConfig } from '../sensor/Sensor';
import * as fs from 'fs';
import * as path from 'path';

// Types for configuration
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

// PLCMockServer: Main class for the mock PLC server
export class PLCMockServer {
  private modules: Module[] = [];
  private intervalId: NodeJS.Timeout | null = null;
  private updateIntervalMs: number = 1000;
  private serverConfig: ServerConfig = { host: '127.0.0.1', port: 3000 };

  // Load configuration and initialize modules
  constructor() {
    // Allow config file path override via environment variable
    const configPath = process.env.CONFIG_PATH
      ? path.resolve(process.env.CONFIG_PATH)
      : path.resolve(__dirname, '../../config.json');
    const config: PLCConfig = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    this.updateIntervalMs = config.updateIntervalMs;
    this.serverConfig = config.server;
    // Allow port override via environment variable
    if (process.env.PORT) {
      this.serverConfig.port = parseInt(process.env.PORT, 10);
    }
    this.modules = config.modules.map((modConfig, idx) =>
      new Module(modConfig.name, idx + 1, modConfig.sensors)
    );
  }

  // Start the server and begin periodic sensor updates
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
          // Log each sensor value with a timestamp
          console.log(`[${isoTimestamp}] ${sensor.name}: ${value.toFixed(3)}`);
        });
      });
      console.log('');
    }, this.updateIntervalMs);
  }

  // Stop the server and clear the update interval
  stop() {
    if (this.intervalId) clearInterval(this.intervalId);
  }
}
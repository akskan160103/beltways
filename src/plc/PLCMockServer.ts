// PLCMockServer manages modules, configuration, and real-time sensor updates
import { Module } from '../module/Module';
import { SensorConfig } from '../sensor/Sensor';
import * as fs from 'fs';
import * as path from 'path';
import express from 'express';
import http from 'http';

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
  private app = express();
  private httpServer: http.Server | null = null;
  private lastStatus: any = {};

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

    // Serve static dashboard (frontend will be in /dashboard)
    this.app.use(express.static(path.resolve(__dirname, '../../dashboard')));



    // API endpoint for real-time status
    this.app.get('/api/status', (_req, res) => {
      res.json(this.lastStatus);
    });
  }

  // Start the server and begin periodic sensor updates
  start() {
    console.log('PLC Mock Server started.');
    console.log(`Server connection parameters: host=${this.serverConfig.host}, port=${this.serverConfig.port}`);
    this.httpServer = this.app.listen(this.serverConfig.port, () => {
      console.log(`Dashboard available at http://localhost:${this.serverConfig.port}/`);
    });
    this.intervalId = setInterval(() => {
      const now = Date.now();
      const isoTimestamp = new Date(now).toISOString();
      // Prepare status for dashboard/API
      this.lastStatus = {
        timestamp: isoTimestamp,
        connection: 'online',
        modules: this.modules.map((mod) => ({
          name: mod.name,
          sensors: mod.sensors.map((sensor, i) => ({
            name: sensor.name,
            value: sensor.getValue(now),
            type: mod.sensorConfigs[i]?.type || '',
          })),
        })),
      };
      // Restore console logging for server output
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

  // Stop the server and clear the update interval
  stop() {
    if (this.intervalId) clearInterval(this.intervalId);
    if (this.httpServer) this.httpServer.close();
  }
}
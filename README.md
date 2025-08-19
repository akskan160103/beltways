# Beltways Mock PLC Server

A simple, configurable mock PLC (Programmable Logic Controller) server that simulates an industrial automation system with modular sensor components.

## Features
- Modular architecture: Simulate any number of modules, each with 3 sensors
- Real-time sensor data simulation (sinusoidal, noisy sinusoidal, square wave)
- Easy configuration via `config.json`
- Clean, extensible TypeScript codebase
- **Docker support** for easy deployment and environment-based configuration
- **Dashboard**: Real-time web dashboard shows live sensor values and connection status (shows "offline" if server is not running)

## Getting Started

### 1. Run with the helper script
```
./start-server.sh
```
This will install dependencies and start the server.

### 2. Or run manually
```
npm install
npx ts-node src/server.ts
```

### 3. Open the dashboard
Go to [http://localhost:4000/](http://localhost:4000/) in your browser.

## Dashboard
- Displays real-time sensor values for each module in a clean, color-coded table
- Shows connection status (green for online, red for offline; shows "offline" if server is not running)
- Highlights changing values for easy tracking
- Shows sensor type for each sensor

## Docker
- See earlier instructions for Dockerfile and docker-compose usage

## What Was Implemented
- **All core requirements** (modular server, sensor simulation, config, real-time updates)
- **Bonus: Advanced sensor types** (sinusoidal, noisy sinusoidal, square wave)
- **Bonus: Docker containerization** (Dockerfile, docker-compose, env config)
- **Bonus: Real-time dashboard** (see above for features)

## Configuration File (`config.json`)
- `server`: Host and port
- `updateIntervalMs`: How often to update sensor values (ms)
- `modules`: List of modules, each with 3 sensors and their parameters

## Contributing
Feel free to fork, clone, and experiment!

---


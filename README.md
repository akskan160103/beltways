# Beltways Mock PLC Server

A simple, configurable mock PLC (Programmable Logic Controller) server that simulates an industrial automation system with modular sensor components.

## Features
- Modular architecture: Simulate any number of modules, each with 3 sensors
- Real-time sensor data simulation (sinusoidal pattern, fully configurable)
- Easy configuration via `config.json`
- Clean, extensible TypeScript codebase

## Getting Started

### 1. Install dependencies
```
npm install
```

### 2. Configure your system
Edit `config.json` to set:
- Number of modules
- Sensor parameters (amplitude, frequency, phase, DC offset)
- Update interval (ms)
- Server connection parameters (host, port)

### 3. Run the server
```
npx ts-node src/server.ts
```

You’ll see real-time sensor values for each module printed every second, with timestamps.

## Example Output
```
PLC Mock Server started.
Server connection parameters: host=127.0.0.1, port=3000
--- Module1 ---
[2024-05-10T12:34:56.789Z] Module1_Sensor1: 10.144
[2024-05-10T12:34:56.789Z] Module1_Sensor2: 6.307
[2024-05-10T12:34:56.789Z] Module1_Sensor3: 3.030
--- Module2 ---
[2024-05-10T12:34:56.789Z] Module2_Sensor1: 12.824
[2024-05-10T12:34:56.789Z] Module2_Sensor2: 7.517
[2024-05-10T12:34:56.789Z] Module2_Sensor3: 11.060
```

## Configuration File (`config.json`)
- `server`: Host and port (for future network features)
- `updateIntervalMs`: How often to update sensor values (ms)
- `modules`: List of modules, each with 3 sensors and their parameters

## Contributing
Feel free to fork, clone, and experiment!

---

**Questions?** Just check the code or config—everything is designed to be clear and easy to extend.
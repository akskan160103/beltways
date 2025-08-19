// Entry point for the PLC Mock Server
import { PLCMockServer } from './plc/PLCMockServer';

const server = new PLCMockServer();
server.start();
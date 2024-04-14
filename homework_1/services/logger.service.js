import EventEmitter from 'events';
import path from 'path';
import { DataService } from './data.service.js';

const loggerPath = path.join(import.meta.dirname, '..', 'data', 'logger.txt');

class LoggerEmitter extends EventEmitter {}

const logger = new LoggerEmitter();

logger.on('log', async message => {
    const currentTime = new Date().toISOString();

    const data = `
    ${message}
    Logged at: ${currentTime}
    ======================================
    `;

    await DataService.appendData(loggerPath, data);
});

export default logger;
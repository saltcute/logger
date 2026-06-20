import "dotenv/config";

import { GlobalLogLevelManager } from "@loglayer/log-level-manager-global";
import { OneWayLogLevelManager } from "@loglayer/log-level-manager-one-way";
import { PinoTransport } from "@loglayer/transport-pino";
import { LogLayer, LogLevel } from "loglayer";
import { pino } from "pino";

const p = pino({
    level: "trace", // Enable all log levels
});

export const globalLogger = new LogLayer({
    transport: new PinoTransport({
        logger: p,
    }),
}).withLogLevelManager(new GlobalLogLevelManager());

export const logger = new LogLayer({
    transport: new PinoTransport({
        logger: p,
    }),
}).withLogLevelManager(new OneWayLogLevelManager());

function setLogLevel(level: LogLevel) {
    globalLogger.setLevel(level);
    logger.setLevel(level);
}

if (process.env.DEV) {
    setLogLevel(LogLevel.debug);
}

const logLevel = process.env.LOG_LEVEL?.toLowerCase();
switch (logLevel) {
    case LogLevel.trace:
    case LogLevel.debug:
    case LogLevel.info:
    case LogLevel.warn:
    case LogLevel.error:
    case LogLevel.fatal:
        setLogLevel(logLevel);
        break;
    default:
        break;
}

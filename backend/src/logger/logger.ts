import winston from 'winston';
import 'winston-daily-rotate-file';
import { Logger, format } from 'winston';
import fs from 'fs';
import path from 'path';

const { combine, timestamp, prettyPrint, colorize, errors, json, simple } =
  format;

let logger: Logger;

try {
  fs.readdirSync('log');
} catch (error) {
  console.error('log 폴더가 없어 log 폴더를 생성합니다.');
  fs.mkdirSync('log');
}

const createLogger = () => {
  if (logger) {
    logger.error('Logger instance already defined. So ignore it.');
    return;
  }

  logger = winston.createLogger({
    level: process.env.NODE_ENV === 'production' ? 'warn' : 'info',
    format: combine(
      errors({ stack: true }),
      timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
      }),
      json(),
      ...(process.env.NODE_ENV !== 'production' ? [prettyPrint()] : []),
    ),
    defaultMeta: { service: 'user-service' },
    transports: [
      new winston.transports.File({
        filename: `log/error/${Date.now()}error.log`,
        level: 'error',
      }),
      new winston.transports.File({
        filename: `log/info/${Date.now()}info.log`,
        level: 'info',
      }),
    ],
  });

  if (process.env.NODE_ENV !== 'production') {
    logger.add(
      new winston.transports.Console({
        format: combine(colorize(), simple()),
      }),
    );
  }

  if (process.env.NODE_ENV === 'production') {
    logger.add(
      new winston.transports.DailyRotateFile({
        level: 'error',
        filename: 'log/error-%DATE%.log',
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxSize: '2m',
        maxFiles: '14d',
      }),
    );
    logger.add(
      new winston.transports.DailyRotateFile({
        filename: 'log/application-%DATE%.log',
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxSize: '2m',
        maxFiles: '14d',
      }),
    );
  }
};

createLogger();

export { logger, createLogger };

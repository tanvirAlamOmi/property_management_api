import * as winston from 'winston';
import 'winston-daily-rotate-file';

const transport = new winston.transports.DailyRotateFile({
  filename: 'logs/error-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,                
  maxSize: '10m',                     
  maxFiles: '14d',                    
  level: 'error',                    
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
});

export const winstonLogger = winston.createLogger({
  transports: [
    transport,
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  ],
});

import { NgxLoggerLevel } from 'ngx-logger';

export const environment = {
  production: true,
  apiUrl: 'localhost',
  logLevel: NgxLoggerLevel.OFF,
  serverLogLevel: NgxLoggerLevel.ERROR
};

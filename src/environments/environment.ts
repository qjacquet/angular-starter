import { NgxLoggerLevel } from 'ngx-logger';

export const environment = {
  production: false,
  apiUrl: 'localhost',
  logLevel: NgxLoggerLevel.WARN,
  serverLogLevel: NgxLoggerLevel.OFF
};

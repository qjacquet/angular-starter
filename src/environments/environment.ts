import { NgxLoggerLevel } from 'ngx-logger';

export const environment = {
  production: false,
  apiUrl: 'localhost',
  logLevel: NgxLoggerLevel.WARN,
  serverLogLevel: NgxLoggerLevel.OFF,

  api: {
    movies: {
      url: 'https://api.themoviedb.org/',
      version: '3',
      key: '68c9d5e33a7aaa4ea39cf25e51f193b5',
    }
  }
};

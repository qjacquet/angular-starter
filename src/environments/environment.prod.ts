import { NgxLoggerLevel } from 'ngx-logger';

export const environment = {
  production: true,
  logLevel: NgxLoggerLevel.OFF,
  serverLogLevel: NgxLoggerLevel.ERROR,

  api: {
    logs: {
      url: 'localhost',
    },
    auth: {
      url: 'https://localhost:5001/api',
    },
    movies: {
      url: 'https://api.themoviedb.org/',
      version: '3',
      key: '68c9d5e33a7aaa4ea39cf25e51f193b5',
    }
  }
};

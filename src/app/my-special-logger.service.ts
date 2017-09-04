import { Injectable, Inject } from '@angular/core';
import { LogLevel } from './log-level.enum';
import * as forms from 'date-fns/format';

@Injectable()
export class MySpecialLoggerService {

  logLevel: LogLevel;
  logs: string[] = [];
  private readonly MAX_HISTOYR_CNT: number = 100;
  private readonly TIME_FORMATTER: string = 'YYYY-MM-DD HH:mm:ss.SSS';

  constructor (@Inject('logLevel') logLevel: LogLevel) { 
    this.logLevel = logLevel;
  }

  debug(msg: string) { this.log(LogLevel.DEBUG, msg); }
  info(msg: string) { this.log(LogLevel.INFO, msg); }
  warn(msg: string) { this.log(LogLevel.WARN, msg); }
  error(msg: string) { this.log(LogLevel.ERROR, msg); }

  log(logLevel: LogLevel, msg: string) {
    const logMsg = this.getFormatedLogMsg(logLevel, msg);
    if (this.isProperLogLevel(logLevel)) {
      console.log(logMsg);
      this.keepLogHistory(logMsg);
    }
  }

  getFormatedLogMsg(logLevel: LogLevel, msg: String): string  {
    const curTimestamp = forms(new Date(), this.TIME_FORMATTER);
    return `[${LogLevel[logLevel]}] ${curTimestamp} - ${msg}`;
  }

  isProperLogLevel(logLevel: LogLevel): Boolean {
    if (this.logLevel === LogLevel.DEBUG) {
      return true;
    }
    return logLevel >= this.logLevel;
  }

  keepLogHistory(log: string): void {
     if (this.logs.length === this.MAX_HISTOYR_CNT) {
       this.logs.shift();
     }

     this.logs.push(log);
  }
}

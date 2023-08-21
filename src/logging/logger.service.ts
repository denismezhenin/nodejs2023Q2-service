import { ConsoleLogger, Injectable, LoggerService, LogLevel, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.DEFAULT })
export class MyLoggerService extends ConsoleLogger {
  constructor() {
    super();
    this.setLoggingLevel(+(process.env.LOGGING_LEVEL));
  }
 
  log(message: any, ...optionalParams: any[]) {
    super.log(message)
  }

  error(message: any, ...optionalParams: any[]) {
    super.error(message)
  }

  warn(message: any, ...optionalParams: any[]) {
    super.warn(message)
  }


  debug(message: any, ...optionalParams: any[]) {
    super.debug(message)
  }


  verbose(message: any, ...optionalParams: any[]) {
    super.verbose(message)
  }
  
  private setLoggingLevel(currentLogLevel: number) {
    const LoggingLevels: LogLevel[] = ['error', 'warn', 'log', 'debug', 'verbose'];
    const logLevels = LoggingLevels.slice(0, currentLogLevel + 2);
    this.setLogLevels(logLevels);
  }
}
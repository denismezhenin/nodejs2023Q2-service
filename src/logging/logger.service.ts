import { ConsoleLogger, Injectable, LogLevel, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.DEFAULT })
export class MyLoggerService extends ConsoleLogger {
  constructor() {
    super();
    this.setLoggingLevel(+process.env.LOGGING_LEVEL);
  }

  log(message: any) {
    super.log(message);
  }

  error(message: any) {
    super.error(message);
  }

  warn(message: any) {
    super.warn(message);
  }

  debug(message: any) {
    super.debug(message);
  }

  verbose(message: any) {
    super.verbose(message);
  }

  private setLoggingLevel(currentLogLevel: number) {
    const LoggingLevels: LogLevel[] = [
      'error',
      'warn',
      'log',
      'debug',
      'verbose',
    ];
    const logLevels = LoggingLevels.slice(0, currentLogLevel + 2);
    this.setLogLevels(logLevels);
  }
}

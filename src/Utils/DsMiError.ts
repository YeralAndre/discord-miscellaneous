import chalk from 'chalk';

export class DsMiError extends Error {
  constructor(message: string) {
    super(chalk.red('[Discord Miscellaneous Error]') + ': ' + message);
  }
}

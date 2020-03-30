const chalk = require('chalk');
const fs = require('fs');

/**
 * Logger
 */
class Logger {
  constructor() {
    this.level = process.env.LEVEL || process.env.level || 'info';
    this.levels = {
      debug: 0,
      info: 1,
      warning: 2,
      error: 3,
    };
  }

  /**
   * Get a timestamp formatted as HH:MM:SS
   * @returns {string}
   */
  time() {
    const date = new Date();
    const hours =
      `${date.getHours()}`.length === 1
        ? `0${date.getHours()}`
        : date.getHours();
    const minutes =
      `${date.getMinutes()}`.length === 1
        ? `0${date.getMinutes()}`
        : date.getMinutes();
    const seconds =
      `${date.getSeconds()}`.length === 1
        ? `0${date.getSeconds()}`
        : date.getSeconds();
    return `${hours}:${minutes}:${seconds}`;
  }

  /**
   *  Write a message to events.log
   * @param {string} type - Message type
   * @param {string} message - Message to log
   */
  write(type, message) {
    const date = new Date();
    fs.appendFileSync(
      'events.log',
      `\n${date.getFullYear()}/${date.getMonth()}/${date.getDate()} ${this.time()} [${type}] ${message}`,
    );
  }

  /**
   * Set the logging level
   * @param {string} newLevel - Level
   * @returns {Logger}
   */
  setLevel(newLevel) {
    this.level = newLevel;
    return this;
  }

  /**
   * Log a debugging message
   * @param {string | number | object} message - Message to log
   */
  debug(message) {
    if (this.levels[this.level] > 0) return;
    if (typeof message === 'object') message = JSON.stringify(message);
    const type = ' debug ';
    this.write(type, message);
    console.log(`${this.time()} [${chalk.gray(type)}] ${chalk.gray(message)}`);
  }

  /**
   * Log an informative message
   * @param {string | number | object} message - Message to log
   */
  info(message) {
    if (this.levels[this.level] > 1) return;
    if (typeof message === 'object') message = JSON.stringify(message);
    const type = ' info  ';
    this.write(type, message);
    console.log(`${this.time()} [${chalk.cyan(type)}] ${message}`);
  }

  /**
   * Log a warning
   * @param {string | number | object} message - Message to log
   */
  warning(message) {
    if (this.levels[this.level] > 2) return;
    if (typeof message === 'object') message = JSON.stringify(message);
    const type = 'warning';
    this.write(type, message);
    console.log(`${this.time()} [${chalk.yellow(type)}] ${message}`);
  }

  /**
   * Log an error
   * @param {string | number | object} message - Message to log
   */
  error(message) {
    if (this.levels[this.level] > 3) return;
    if (typeof message === 'object') message = JSON.stringify(message);
    const type = ' error ';
    this.write(type, message);
    console.log(`${this.time()} [${chalk.red(type)}] ${message}`);
  }
}

module.exports = new Logger();

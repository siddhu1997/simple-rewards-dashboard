import { CONSTANTS } from "../utils/Config";

class Logger {
  constructor() {
    if (CONSTANTS.LOG_LEVEL === "log") {
      this.log = console.log.bind(console);
    } else {
      this.log = console.warn.bind(console);
    }

    this.error = console.error.bind(console);
  }
}

export default new Logger();

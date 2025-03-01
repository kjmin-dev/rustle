import chalk from 'chalk';

/**
 * Logger utility for consistent colorful console output
 * @param {Object} options - Logger options
 * @param {boolean} options.verbose - Whether to show verbose logs
 * @returns {Object} Logger object with methods for different log levels
 */
export const createLogger = (options = { verbose: false }) => {
    return {
        /**
         * Log informational message
         * @param {string} message - Message to log
         */
        info: (message) => console.log(chalk.blue('ℹ ') + message),

        /**
         * Log success message
         * @param {string} message - Message to log
         */
        success: (message) => console.log(chalk.green('✓ ') + message),

        /**
         * Log warning message
         * @param {string} message - Message to log
         */
        warn: (message) => console.log(chalk.yellow('⚠ ') + message),

        /**
         * Log error message
         * @param {string} message - Message to log
         */
        error: (message) => console.error(chalk.red('✖ ') + message),

        /**
         * Log verbose message (only if verbose option is enabled)
         * @param {string} message - Message to log
         */
        verbose: (message) => options.verbose && console.log(chalk.gray('➤ ') + message),

        /**
         * Create a styled text with the specified color
         * @param {string} text - Text to style
         * @param {string} style - Style to apply (bold, italic, etc.)
         * @returns {string} Styled text
         */
        style: {
            bold: (text) => chalk.bold(text),
            italic: (text) => chalk.italic(text),
            underline: (text) => chalk.underline(text),
            blue: (text) => chalk.blue(text),
            green: (text) => chalk.green(text),
            yellow: (text) => chalk.yellow(text),
            red: (text) => chalk.red(text),
            gray: (text) => chalk.gray(text),
        },
    };
};

export default createLogger;

import { Command } from 'commander';
import createLogger from './logger.mjs';

/**
 * Create a CLI program with common options and configuration
 * @param {Object} options - CLI options
 * @param {string} options.name - Name of the CLI program
 * @param {string} options.description - Description of the CLI program
 * @param {string} options.version - Version of the CLI program
 * @returns {Object} CLI object with program and logger
 */
export const createCLI = (options = {}) => {
    const { name = 'rustle-cli', description = 'Rustle CLI tool', version = '1.0.0' } = options;

    // Create a new command instance
    const program = new Command();

    // Configure basic program info
    program.name(name).description(description).version(version).option('-v, --verbose', 'Show verbose output');

    // Add common help text
    program.addHelpText(
        'after',
        `
Example:
  $ ${name} [options] [command]
    `,
    );

    return {
        /**
         * The commander program instance
         */
        program,

        /**
         * Parse arguments and return options and args
         * @returns {Object} Object containing options and args
         */
        parse: () => {
            program.parse(process.argv);
            const options = program.opts();
            const args = program.args;

            // Create logger with verbose option
            const logger = createLogger({ verbose: options.verbose });

            return {
                options,
                args,
                logger,
            };
        },
    };
};

export default createCLI;

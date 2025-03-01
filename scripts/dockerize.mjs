import { spawn } from 'child_process';
import fs from 'node:fs';
import path from 'node:path';
import createCLI from './lib/cli.mjs';
import { ROOT_DIR } from './lib/directory.mjs';

// Create CLI with custom configuration
const cli = createCLI({
    name: 'Rustle-dockerize',
    description: 'Build Docker images for Rustle services',
    version: '1.0.0',
});

// Add command-specific options
cli.program
    .argument('<service-name>', 'Name of the service to dockerize (e.g., api, auth, frontend)')
    .option('-n, --no-latest', 'Do not tag the image as latest');

// Add custom help text with examples
cli.program.addHelpText(
    'after',
    `
Examples:
  $ Rustle-dockerize services/api           # Build Docker image for the API service
`,
);

// Parse arguments and get options, args, and logger
const { options, args, logger } = cli.parse();
const serviceName = args[0];

/**
 * Build Docker image for a service
 */
export const buildDocker = async (serviceName) => {
    if (!serviceName) {
        logger.error('Service name is required');
        process.exit(1);
    }

    const serviceDir = path.join(ROOT_DIR, `${serviceName}`);

    // Check if service directory exists
    if (!fs.existsSync(serviceDir)) {
        logger.error(`Service directory not found: ${logger.style.bold(serviceDir)}`);
        process.exit(1);
    }

    logger.info(`Preparing to build Docker image for ${logger.style.bold(serviceName)}`);

    try {
        const packageJson = JSON.parse(fs.readFileSync(path.join(serviceDir, 'package.json'), 'utf8'));
        const packageVersion = packageJson?.version;

        if (!packageVersion) {
            logger.error('Package version is not set in package.json');
            process.exit(1);
        }

        const dockerImageName = `rustle-${serviceName}`;
        logger.info(`Building Docker image ${logger.style.bold(dockerImageName)}:${logger.style.bold(packageVersion)}`);

        const dockerfile = path.join(serviceDir, 'Dockerfile');

        if (!fs.existsSync(dockerfile)) {
            logger.error(`Dockerfile does not exist or is not readable: ${logger.style.bold(dockerfile)}`);
            process.exit(1);
        }

        // Prepare docker tags
        const dockerTags = [`-t ${dockerImageName}:${packageVersion}`];

        // Add latest tag if not disabled
        if (options.latest) {
            dockerTags.push(`-t ${dockerImageName}:latest`);
            logger.verbose(`Adding latest tag to the image`);
        }

        const tagsString = dockerTags.join(' ');
        const dockerBuildCommand = `docker build ${tagsString} -f ${dockerfile} ${serviceDir}`;
        logger.verbose(`Running command: ${logger.style.italic(dockerBuildCommand)}`);

        const [cmd, ...args] = dockerBuildCommand.split(' ');
        const buildProcess = spawn(cmd, args, {
            stdio: 'inherit',
            shell: true,
        });

        buildProcess.on('close', (code) => {
            if (code === 0) {
                logger.success(`Successfully built Docker image: ${logger.style.bold(dockerImageName)}`);
            } else {
                logger.error(`Docker build failed with exit code ${code}`);
                process.exit(code);
            }
        });

        buildProcess.on('error', (err) => {
            logger.error(`Failed to start Docker build process: ${err.message}`);
            process.exit(1);
        });
    } catch (error) {
        logger.error(`An error occurred: ${error.message}`);
        if (options.verbose) {
            console.error(error);
        }
        process.exit(1);
    }
};

// Execute the build function with the provided service name
buildDocker(serviceName);

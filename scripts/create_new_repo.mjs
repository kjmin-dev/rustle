#!/usr/bin/env node

import fs from 'node:fs/promises';
import path from 'node:path';
import readline from 'node:readline';
import { ROOT_DIR } from './lib/directory.mjs';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

async function question(query) {
    return new Promise((resolve) => {
        rl.question(query, (answer) => {
            resolve(answer);
        });
    });
}

async function createNewRepo() {
    try {
        console.log('🚀 Starting new repository creation script...\n');

        // Get user input
        const repoName = await question('Enter repository name: ');
        const repoPath = path.join(ROOT_DIR, repoName);

        // Check if directory already exists
        try {
            const stats = await fs.stat(repoPath);
            if (stats.isDirectory()) {
                console.error(`❌ Error: Directory '${repoName}' already exists. Please choose a different name.`);
                return;
            }
        } catch (error) {
            // If error is ENOENT (no such file or directory), that's what we want
            if (error.code !== 'ENOENT') {
                throw error;
            }
        }

        const description = await question('Enter a brief description: ');

        // Create directory structure
        console.log(`\n📁 Creating ${repoName} directory...`);
        await fs.mkdir(repoPath, { recursive: true });

        // Create basic directory structure
        const directories = ['src', 'tests', 'docs'];
        await Promise.all(directories.map((dir) => fs.mkdir(path.join(repoPath, dir), { recursive: true })));

        // Create package.json
        const packageName = path.basename(repoName);
        const packageJson = {
            name: packageName,
            version: '0.0.1',
            description,
            license: 'MIT',
            scripts: {
                prepare: '',
                dev: '',
                test: '',
                build: '',
                format: '',
            },
            dependencies: {},
            devDependencies: {},
        };

        // Create package.json, README.md, and .gitignore in parallel
        const readmeContent = `# ${repoName}`;

        await Promise.all([
            fs.writeFile(path.join(repoPath, 'package.json'), JSON.stringify(packageJson, null, 2)),
            fs.writeFile(path.join(repoPath, 'README.md'), readmeContent),
            fs.writeFile(path.join(repoPath, '.gitignore'), ''),
        ]);

        console.log('✅ Files created successfully');
    } catch (error) {
        console.error('❌ An error occurred:', error);
    } finally {
        rl.close();
    }
}

createNewRepo();

import type { StorybookConfig } from '@storybook/sveltekit';

import { dirname, join } from 'path';

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): any {
    return dirname(require.resolve(join(value, 'package.json')));
}
const config: StorybookConfig = {
    stories: ['../src/**/*.stories.@(js|ts|svelte)'],
    addons: [
        '@storybook/addon-essentials',
        {
            name: '@storybook/addon-svelte-csf',
            options: {
                legacyTemplate: true,
            },
        },
        '@chromatic-com/storybook',
        '@storybook/experimental-addon-test',
        'storybook-dark-mode',
    ],
    framework: {
        name: '@storybook/sveltekit',
        options: {},
    },
};
export default config;

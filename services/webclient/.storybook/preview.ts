import type { Preview } from '@storybook/svelte';
import '../src/app.css';

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
        darkMode: {
            stylePreview: true,
            darkClass: 'dark',
            lightClass: 'light',
        },
        backgrounds: { disable: true },
    },
};

export default preview;

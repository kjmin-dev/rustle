<script lang="ts" module>
import { Story, Template } from '@storybook/addon-svelte-csf';
import Text, { sizes } from './Text.svelte';

export const meta = {
    title: 'Common/Text',
    component: Text,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: 'This is a default text',
            },
        },
    },
    argTypes: {
        children: {
            control: 'text',
        },
        color: {
            control: 'select',
        },
        align: {
            control: 'select',
        },
        weight: {
            control: 'select',
        },
        size: {
            control: 'select',
        },
        case: {
            control: 'select',
        },
        tag: {
            control: 'select',
        },
        italic: {
            control: 'boolean',
        },
        underline: {
            control: 'boolean',
        },
    },
};
</script>

<Template let:args>
    <Text {...args}>{args.children}</Text>
</Template>

<Story
    name="Default"
    args={{
        children: 'Hello, Text!',
        color: 'default',
        align: 'left',
        weight: 'regular',
        size: 'md',
        tag: 'p',
        italic: false,
        underline: false,
        truncate: false,
        case: 'normal',
    }} />

<Story name="Color" let:args>
    <div class="space-y-2">
        <Text {...args} color="default">Default Color Text</Text>
        <Text {...args} color="primary">Primary Color Text</Text>
        <Text {...args} color="secondary">Secondary Color Text</Text>
        <Text {...args} color="error">Error Color Text</Text>
        <Text {...args} color="success">Success Color Text</Text>
        <Text {...args} color="warning">Warning Color Text</Text>
    </div>
</Story>

<Story name="Size" let:args>
    <div class="space-y-2">
        <Text {...args} size="xs">Extra Small Text</Text>
        <Text {...args} size="sm">Small Text</Text>
        <Text {...args} size="md">Default Text</Text>
        <Text {...args} size="lg">Large Text</Text>
        <Text {...args} size="xl">Extra Large Text</Text>
        <Text {...args} size="2xl">Double Extra Large Text</Text>
    </div>
</Story>

<Story name="Weight" let:args>
    <div class="space-y-2">
        <Text {...args} weight="regular">Regular Weight Text</Text>
        <Text {...args} weight="medium">Medium Weight Text</Text>
        <Text {...args} weight="bold">Bold Weight Text</Text>
    </div>
</Story>

<Story name="Align" let:args>
    <div class="space-y-2">
        <Text {...args} align="left">Left Aligned Text</Text>
        <Text {...args} align="center">Center Aligned Text</Text>
        <Text {...args} align="right">Right Aligned Text</Text>
    </div>
</Story>

<Story name="Case" let:args>
    <div class="space-y-2">
        <Text {...args} case="normal">Normal Case Text</Text>
        <Text {...args} case="uppercase">Uppercase Case Text</Text>
        <Text {...args} case="lowercase">Lowercase Case Text</Text>
    </div>
</Story>

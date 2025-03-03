<script lang="ts" module>
import clsx from 'clsx';
import type { Snippet } from 'svelte';

export const validTags = ['p', 'span', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'div'] as const;
export type TagName = (typeof validTags)[number];

export const colors = ['default', 'primary', 'secondary', 'error', 'success', 'warning'] as const;
export type ColorType = (typeof colors)[number];

export const aligns = ['left', 'center', 'right'] as const;
export type AlignType = (typeof aligns)[number];

export const weights = ['regular', 'medium', 'bold'] as const;
export type WeightType = (typeof weights)[number];

export const sizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const;
export type SizeType = (typeof sizes)[number];

export const cases = ['normal', 'uppercase', 'lowercase', 'capitalize'] as const;
export type CaseType = (typeof cases)[number];

export interface TextProps {
    tag?: TagName;
    color?: ColorType;
    align?: AlignType;
    weight?: WeightType;
    italic?: boolean;
    underline?: boolean;
    truncate?: boolean;
    maxLines?: number;
    className?: string;
    size?: SizeType;
    case?: CaseType;
    children?: Snippet;
}
</script>

<script lang="ts">
let { ...props }: TextProps = $props();

// Predefined class combinations
const colorClasses = {
    default: 'text-gray-800 dark:text-gray-200',
    primary: 'text-primary-600 dark:text-primary-400',
    secondary: 'text-secondary-600 dark:text-secondary-400',
    error: 'text-error-600 dark:text-error-400',
    success: 'text-success-600 dark:text-success-400',
    warning: 'text-warning-600 dark:text-warning-400',
};

const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
};

const weightClasses = {
    regular: 'font-normal',
    medium: 'font-medium',
    bold: 'font-bold',
};

const sizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
};

let tag = $derived(props.tag && validTags.includes(props.tag) ? props.tag : 'p');
let classes = $derived(
    clsx(
        colorClasses[props.color || 'default'],
        sizeClasses[props.size || 'md'],
        props.align && alignClasses[props.align],
        props.weight && weightClasses[props.weight],
        {
            italic: props.italic,
            underline: props.underline,
            truncate: props.truncate,
            ...(props.case ? { [props.case]: true } : {}),
        },
        props.className,
    ),
);
let styles = $derived(props.maxLines ? `--max-lines: ${props.maxLines};` : '');
</script>

<svelte:element this={tag} class={classes} style={styles}>
    {@render props.children?.()}
</svelte:element>

<style>
:global([style*='--max-lines']) {
    display: -webkit-box;
    line-clamp: var(--max-lines);
    box-orient: vertical;
    -webkit-line-clamp: var(--max-lines);
    -webkit-box-orient: vertical;
    overflow: hidden;
    white-space: normal;
}
</style>

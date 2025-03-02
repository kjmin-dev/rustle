<script lang="ts" module>
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

export const cases = ['uppercase', 'lowercase', 'capitalize'] as const;
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
    children: Snippet;
}
</script>

<script lang="ts">
const props: TextProps = $props();
const tag: TagName = props.tag && validTags.includes(props.tag) ? props.tag : 'p';
const color = props.color || 'default';
const align = props.align || 'left';
const weight = props.weight || 'regular';
const size = props.size || 'md';

// 색상 매핑 정의
const colorClasses = {
    default: 'text-gray-800 dark:text-gray-200',
    primary: 'text-primary-600 dark:text-primary-400',
    secondary: 'text- dark:text-secondary-400',
    error: 'text-error-600 dark:text-error-400',
    success: 'text-success-600 dark:text-success-400',
    warning: 'text-warning-600 dark:text-warning-400',
};

// 클래스 계산
let classes = [
    colorClasses[color],
    `text-${align}`,
    `font-${weight}`,
    `text-${size}`,
    props.italic ? 'italic' : '',
    props.underline ? 'underline' : '',
    props.truncate ? 'truncate' : '',
    props.case ? props.case : '',
    props.className || '',
]
    .filter(Boolean)
    .join(' ');

// 스타일 계산
let styles = props.maxLines ? `--max-lines: ${props.maxLines};` : '';
</script>

<svelte:element this={tag} class={classes} style={styles}>
    {@render props.children()}
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

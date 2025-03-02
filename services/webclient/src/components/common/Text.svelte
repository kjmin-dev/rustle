<script lang="ts" module>
import type { Snippet } from 'svelte';

export const validTags = ['p', 'span', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'div'] as const;
export type TagName = (typeof validTags)[number];

export const variants = ['headline', 'title', 'subtitle', 'body', 'caption', 'button'] as const;
export type VariantType = (typeof variants)[number];

export const colors = ['default', 'primary', 'secondary', 'error', 'success', 'warning'] as const;
export type ColorType = (typeof colors)[number];

export const aligns = ['left', 'center', 'right', 'justify'] as const;
export type AlignType = (typeof aligns)[number];

export const weights = ['regular', 'medium', 'bold'] as const;
export type WeightType = (typeof weights)[number];

export interface TextProps {
    tag?: TagName;
    variant?: VariantType;
    color?: ColorType;
    align?: AlignType;
    weight?: WeightType;
    italic?: boolean;
    underline?: boolean;
    uppercase?: boolean;
    truncate?: boolean;
    maxLines?: number;
    className?: string;
    children: Snippet;
}
</script>

<script lang="ts">
const props: TextProps = $props();
let tag: TagName = props.tag && validTags.includes(props.tag) ? props.tag : 'p';
let variant = props.variant || 'body';
let color = props.color || 'default';
let align = props.align || 'left';
let weight = props.weight || 'regular';

// 클래스 계산
let classes = [
    `text-variant-${variant}`,
    `text-color-${color}`,
    `text-align-${align}`,
    `text-weight-${weight}`,
    props.italic ? 'text-italic' : '',
    props.underline ? 'text-underline' : '',
    props.uppercase ? 'text-uppercase' : '',
    props.truncate ? 'text-truncate' : '',
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
/* 기본 스타일 */
:global(.text-truncate) {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

:global([style*='--max-lines']) {
    display: -webkit-box;
    line-clamp: var(--max-lines);
    box-orient: vertical;
    -webkit-line-clamp: var(--max-lines);
    -webkit-box-orient: vertical;
    overflow: hidden;
    white-space: normal;
}

/* 정렬 스타일 */
:global(.text-align-left) {
    text-align: left;
}
:global(.text-align-center) {
    text-align: center;
}
:global(.text-align-right) {
    text-align: right;
}
:global(.text-align-justify) {
    text-align: justify;
}

/* 폰트 스타일 */
:global(.text-italic) {
    font-style: italic;
}
:global(.text-underline) {
    text-decoration: underline;
}
:global(.text-uppercase) {
    text-transform: uppercase;
}

/* 폰트 두께 */
:global(.text-weight-regular) {
    font-weight: 400;
}
:global(.text-weight-medium) {
    font-weight: 500;
}
:global(.text-weight-bold) {
    font-weight: 700;
}

/* 여기에 variant와 color에 대한 스타일을 추가할 수 있습니다 */
</style>

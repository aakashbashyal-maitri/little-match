<script setup lang="ts">
import { computed } from 'vue'
import type { ItemId } from '../types/game'
import { svgContent } from '../data/svgs'
const props = defineProps<{itemId: ItemId; mode?: 'colorful' | 'silhouette'; size?: number}>()
// Strip sticker filters: their dilation hides the very contours children match.
const art = computed(() => svgContent[props.itemId].replace(/<defs>[\s\S]*?<\/defs>/g, '').replace(/ filter="[^"]*"/g, ''))
</script>
<template>
  <svg :width="size ?? 100" :height="size ?? 100" viewBox="-10 -10 140 140" xmlns="http://www.w3.org/2000/svg" :class="{ silhouette: mode === 'silhouette' }" aria-hidden="true" v-html="art" />
</template>
<style scoped>
svg { display: block; overflow: visible; pointer-events: none; }
.silhouette { filter: brightness(0) saturate(100%) invert(23%) sepia(14%) saturate(1162%) hue-rotate(124deg) brightness(92%); }
</style>

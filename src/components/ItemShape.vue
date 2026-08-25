<script setup lang="ts">
import { computed } from 'vue'
import type { ItemId } from '../types/game'
import { svgContent } from '../data/svgs'

const props = defineProps<{
  itemId: ItemId
  mode?: 'colorful' | 'silhouette'
  size?: number
}>()

const filterStyle = computed(() =>
  props.mode === 'silhouette'
    ? 'brightness(0) opacity(0.82)'
    : 'none'
)
</script>

<template>
  <svg
    :width="size ?? 100"
    :height="size ?? 100"
    viewBox="0 0 120 120"
    xmlns="http://www.w3.org/2000/svg"
    :style="{ filter: filterStyle, display: 'block', overflow: 'visible' }"
    v-html="svgContent[itemId]"
    aria-hidden="true"
  />
</template>

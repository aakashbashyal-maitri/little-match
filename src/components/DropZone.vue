<script setup lang="ts">
import { ref } from 'vue'
import type { ItemId } from '../types/game'
import ItemShape from './ItemShape.vue'

defineProps<{
  targetId:    ItemId
  zoneBg:      string
  isHovering?: boolean
  isSolved?:   boolean
}>()

const el = ref<HTMLElement | null>(null)
defineExpose({ el })
</script>

<template>
  <div
    ref="el"
    class="stage-frame"
    :class="{ hovering: isHovering, solved: isSolved }"
    :style="{}"
  >
    <!-- Silhouette -->
    <Transition name="fade-out">
      <div v-if="!isSolved" class="item-layer animate-zone-shimmer">
        <ItemShape :item-id="targetId" mode="silhouette" :size="150" />
      </div>
    </Transition>

    <!-- Colorful reveal -->
    <Transition name="pop-reveal">
      <div v-if="isSolved" class="item-layer animate-pop-in">
        <ItemShape :item-id="targetId" mode="colorful" :size="150" />
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.stage-frame {
  position: relative;
  width: min(74vw, 240px);
  height: min(74vw, 240px);
  border-radius: 22px;
  background: #ffffff;
  border: 3px solid rgba(0,0,0,0.14);
  box-shadow: 0 6px 20px rgba(0,0,0,0.12), 0 2px 6px rgba(0,0,0,0.07);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.22s ease, box-shadow 0.22s ease;
  overflow: visible;
  flex-shrink: 0;
}
.stage-frame.hovering {
  transform: scale(1.04);
  border-color: #fde68a;
  box-shadow:
    0 0 0 4px rgba(253,230,138,0.6),
    0 16px 56px rgba(0,0,0,0.18);
  animation: pulse-ring 1.2s ease-out infinite;
}
.stage-frame.solved {
  border-color: #86efac;
  box-shadow:
    0 0 0 4px rgba(134,239,172,0.5),
    0 12px 48px rgba(0,0,0,0.14);
}

.item-layer {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.fade-out-leave-active { transition: opacity 0.25s ease; }
.fade-out-leave-to     { opacity: 0; }
.pop-reveal-enter-active { animation: pop-in 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards; }
</style>

<script setup lang="ts">
import { ref } from 'vue'
import type { ItemId } from '../types/game'
import ItemShape from './ItemShape.vue'

defineProps<{
  targetId:    ItemId
  zoneBg?:     string
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
  >
    <!-- Black silhouette shown until solved -->
    <Transition name="fade-out">
      <div v-if="!isSolved" class="item-layer animate-zone-shimmer">
        <ItemShape :item-id="targetId" mode="silhouette" :size="150" />
      </div>
    </Transition>

    <!-- Colorful reveal on solve -->
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
  border-radius: 22px;
  border: 4px solid #1a1a1a;
  background: #d4d4d4;
  box-shadow: 0 5px 18px rgba(0,0,0,0.18), 0 2px 5px rgba(0,0,0,0.10);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.22s ease, box-shadow 0.22s ease;
  overflow: hidden;
  flex-shrink: 0;
}

.stage-frame.hovering {
  transform: scale(1.04);
  border-color: #fff176;
  box-shadow: 0 0 0 4px rgba(255,241,118,0.6), 0 14px 40px rgba(0,0,0,0.2);
}
.stage-frame.solved {
  border-color: #a5f3a5;
  box-shadow: 0 0 0 4px rgba(134,239,172,0.5), 0 10px 30px rgba(0,0,0,0.14);
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

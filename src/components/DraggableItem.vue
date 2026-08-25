<script setup lang="ts">
import { ref, watch } from 'vue'
import type { ItemId } from '../types/game'
import ItemShape from './ItemShape.vue'

// Per-position card colors (index 0, 1, 2)
const CARD_COLORS = ['#B39DDB', '#81C784', '#64B5F6', '#FFB74D']

const props = defineProps<{
  itemId:    ItemId
  cardIndex: number
  disabled?: boolean
  wobble?:   boolean
  dimmed?:   boolean
}>()

const emit = defineEmits<{
  (e: 'drag-start'): void
  (e: 'drag-move', cx: number, cy: number): void
  (e: 'drag-end',  cx: number, cy: number): void
}>()

const el         = ref<HTMLElement | null>(null)
const isDragging = ref(false)
const deltaX     = ref(0)
const deltaY     = ref(0)
const isWobbling = ref(false)
let startX = 0
let startY = 0

const cardBg = CARD_COLORS[props.cardIndex % CARD_COLORS.length]

watch(() => props.wobble, v => {
  if (v) {
    isWobbling.value = true
    setTimeout(() => { isWobbling.value = false }, 460)
  }
})

function onPointerDown(e: PointerEvent) {
  if (props.disabled) return
  e.preventDefault()
  startX = e.clientX; startY = e.clientY
  deltaX.value = 0;   deltaY.value = 0
  isDragging.value = true
  el.value!.setPointerCapture(e.pointerId)
  emit('drag-start')
}

function onPointerMove(e: PointerEvent) {
  if (!isDragging.value) return
  deltaX.value = e.clientX - startX
  deltaY.value = e.clientY - startY
  emit('drag-move', e.clientX, e.clientY)
}

function onPointerUp(e: PointerEvent) {
  if (!isDragging.value) return
  isDragging.value = false
  const cx = e.clientX, cy = e.clientY
  deltaX.value = 0; deltaY.value = 0
  emit('drag-end', cx, cy)
}
</script>

<template>
  <div
    ref="el"
    class="item-card"
    :class="{
      dragging:  isDragging,
      disabled:  disabled,
      wobbling:  isWobbling,
      dimmed:    dimmed,
    }"
    :style="{
      '--card-bg': cardBg,
      transform: isDragging
        ? `translate(${deltaX}px, ${deltaY}px) scale(1.13) rotate(4deg)`
        : isWobbling ? undefined : 'translate(0,0) scale(1)',
      zIndex: isDragging ? 200 : 1,
      cursor: disabled ? 'default' : isDragging ? 'grabbing' : 'grab',
      touchAction: 'none',
    }"
    @pointerdown="onPointerDown"
    @pointermove="onPointerMove"
    @pointerup="onPointerUp"
    @pointercancel="onPointerUp"
  >
    <ItemShape :item-id="itemId" :size="90" mode="colorful" />

    <!-- Bottom indicator dot -->
    <div class="dot" />
  </div>
</template>

<style scoped>
.item-card {
  width: min(calc(50vw - 23px), 170px);
  height: min(calc(50vw - 23px), 170px);
  border-radius: 22px;
  border: 4px solid white;
  background-color: var(--card-bg);
  background-image: repeating-linear-gradient(
    -45deg,
    transparent,
    transparent 8px,
    rgba(255,255,255,0.25) 8px,
    rgba(255,255,255,0.25) 10px
  );
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 5px 18px rgba(0,0,0,0.2), 0 2px 5px rgba(0,0,0,0.1);
  position: relative;
  will-change: transform;
  padding-bottom: 10px;
}
.item-card:not(.dragging):not(.wobbling) {
  transition: transform 0.38s cubic-bezier(0.34,1.56,0.64,1),
              box-shadow 0.2s ease, opacity 0.2s ease;
}
.item-card.dragging {
  box-shadow: 0 18px 44px rgba(0,0,0,0.25), 0 6px 14px rgba(0,0,0,0.14);
}
.item-card.disabled  { opacity: 0.3; pointer-events: none; }
.item-card.wobbling  { animation: wobble 0.45s ease-in-out; }
.item-card.dimmed    { opacity: 0.55; }

.dot {
  position: absolute;
  bottom: 9px;
  left: 50%;
  transform: translateX(-50%);
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: rgba(255,255,255,0.7);
  border: 2px solid rgba(255,255,255,0.9);
  box-shadow: 0 1px 4px rgba(0,0,0,0.12);
}
</style>

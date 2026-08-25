<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Level, Puzzle, ItemId } from '../types/game'
import DropZone      from './DropZone.vue'
import DraggableItem from './DraggableItem.vue'
import StarBurst     from './StarBurst.vue'
import { useSound }  from '../composables/useSound'

const props = defineProps<{
  level:        Level
  puzzle:       Puzzle
  puzzleIndex:  number
  totalPuzzles: number
}>()

const emit = defineEmits<{ (e: 'solved'): void }>()
const sound = useSound()

const dropZoneRef     = ref<InstanceType<typeof DropZone> | null>(null)
const isSolved        = ref(false)
const isHovering      = ref(false)
const burstActive     = ref(false)
const burstX          = ref(0)
const burstY          = ref(0)
const wobbleId        = ref<ItemId | null>(null)
const draggingId      = ref<ItemId | null>(null)
const shuffledChoices = ref<ItemId[]>([])

watch(() => props.puzzle, () => {
  shuffledChoices.value = [...props.puzzle.choiceIds].sort(() => Math.random() - 0.5)
  isSolved.value    = false
  isHovering.value  = false
  burstActive.value = false
  wobbleId.value    = null
  draggingId.value  = null
}, { immediate: true })

function getZoneRect() {
  return dropZoneRef.value?.el?.getBoundingClientRect() ?? null
}
function isOverZone(cx: number, cy: number) {
  const r = getZoneRect()
  return r ? cx >= r.left && cx <= r.right && cy >= r.top && cy <= r.bottom : false
}

function onDragStart() { sound.playPickup() }

function onDragMove(itemId: ItemId, cx: number, cy: number) {
  draggingId.value = itemId
  isHovering.value = isOverZone(cx, cy)
}

function onDragEnd(itemId: ItemId, cx: number, cy: number) {
  draggingId.value = null
  isHovering.value = false
  if (!isOverZone(cx, cy)) return

  if (itemId === props.puzzle.targetId) {
    isSolved.value = true
    const r = getZoneRect()!
    burstX.value = r.left + r.width  / 2
    burstY.value = r.top  + r.height / 2
    burstActive.value = true
    sound.playSuccess()
    setTimeout(() => { burstActive.value = false; emit('solved') }, 1600)
  } else {
    wobbleId.value = itemId
    sound.playWrong()
    setTimeout(() => { wobbleId.value = null }, 500)
  }
}
</script>

<template>
  <div class="game-screen">

    <!-- Header: level pill + progress dots -->
    <div class="header">
      <div class="level-pill" :style="{ color: level.accent, borderColor: level.accent }">
        <span>{{ level.emoji }}</span>
        <span>{{ level.name }}</span>
      </div>
      <div class="progress-dots">
        <div
          v-for="i in totalPuzzles" :key="i"
          class="dot"
          :class="{
            done:    i - 1 < puzzleIndex,
            current: i - 1 === puzzleIndex,
            todo:    i - 1 > puzzleIndex,
          }"
        />
      </div>
    </div>

    <!-- Central drop zone stage -->
    <DropZone
      ref="dropZoneRef"
      :target-id="puzzle.targetId"
      :zone-bg="level.zoneBg"
      :is-hovering="isHovering"
      :is-solved="isSolved"
    />

    <!-- 2x2 choices grid -->
    <div class="choices-grid">
      <DraggableItem
        v-for="(itemId, i) in shuffledChoices"
        :key="`${puzzle.targetId}-${itemId}`"
        :item-id="itemId"
        :card-index="i"
        :disabled="isSolved"
        :wobble="wobbleId === itemId"
        :dimmed="draggingId !== null && draggingId !== itemId"
        @drag-start="onDragStart"
        @drag-move="(cx,cy) => onDragMove(itemId, cx, cy)"
        @drag-end="(cx,cy) => onDragEnd(itemId, cx, cy)"
      />
    </div>

    <StarBurst :active="burstActive" :x="burstX" :y="burstY" />
  </div>
</template>

<style scoped>
.game-screen {
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 12px 12px 14px;
  box-sizing: border-box;
  gap: 10px;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 440px;
}

.level-pill {
  display: flex;
  align-items: center;
  gap: 8px;
  background: white;
  border: 3px solid;
  border-radius: 9999px;
  padding: 0.35rem 1.1rem;
  font-family: "Nunito", sans-serif;
  font-size: 1.2rem;
  font-weight: 900;
  box-shadow: 0 4px 12px rgba(0,0,0,0.12);
}

.progress-dots {
  display: flex;
  align-items: center;
  gap: 7px;
}
.dot { border-radius: 50%; transition: all 0.3s ease; }
.dot.done    { width: 11px; height: 11px; background: #7C3AED; }
.dot.current { width: 15px; height: 15px; background: #a78bfa; box-shadow: 0 0 0 3px rgba(167,139,250,0.35); }
.dot.todo    { width: 11px; height: 11px; background: rgba(255,255,255,0.6); border: 2px solid rgba(0,0,0,0.15); }

.choices-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  width: 100%;
  max-width: 440px;
}
</style>

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

    <!-- 3x3 grid: stage in center, 4 cards in corners -->
    <div class="play-area">

      <DraggableItem
        v-if="shuffledChoices[0]"
        :key="`tl-${puzzle.targetId}-${shuffledChoices[0]}`"
        class="pos-tl"
        :item-id="shuffledChoices[0]"
        :card-index="0"
        :disabled="isSolved"
        :wobble="wobbleId === shuffledChoices[0]"
        :dimmed="draggingId !== null && draggingId !== shuffledChoices[0]"
        @drag-start="onDragStart"
        @drag-move="(cx,cy) => onDragMove(shuffledChoices[0], cx, cy)"
        @drag-end="(cx,cy) => onDragEnd(shuffledChoices[0], cx, cy)"
      />

      <DraggableItem
        v-if="shuffledChoices[1]"
        :key="`tr-${puzzle.targetId}-${shuffledChoices[1]}`"
        class="pos-tr"
        :item-id="shuffledChoices[1]"
        :card-index="1"
        :disabled="isSolved"
        :wobble="wobbleId === shuffledChoices[1]"
        :dimmed="draggingId !== null && draggingId !== shuffledChoices[1]"
        @drag-start="onDragStart"
        @drag-move="(cx,cy) => onDragMove(shuffledChoices[1], cx, cy)"
        @drag-end="(cx,cy) => onDragEnd(shuffledChoices[1], cx, cy)"
      />

      <DropZone
        ref="dropZoneRef"
        class="pos-center"
        :target-id="puzzle.targetId"
        :zone-bg="level.zoneBg"
        :is-hovering="isHovering"
        :is-solved="isSolved"
      />

      <DraggableItem
        v-if="shuffledChoices[2]"
        :key="`bl-${puzzle.targetId}-${shuffledChoices[2]}`"
        class="pos-bl"
        :item-id="shuffledChoices[2]"
        :card-index="2"
        :disabled="isSolved"
        :wobble="wobbleId === shuffledChoices[2]"
        :dimmed="draggingId !== null && draggingId !== shuffledChoices[2]"
        @drag-start="onDragStart"
        @drag-move="(cx,cy) => onDragMove(shuffledChoices[2], cx, cy)"
        @drag-end="(cx,cy) => onDragEnd(shuffledChoices[2], cx, cy)"
      />

      <DraggableItem
        v-if="shuffledChoices[3]"
        :key="`br-${puzzle.targetId}-${shuffledChoices[3]}`"
        class="pos-br"
        :item-id="shuffledChoices[3]"
        :card-index="3"
        :disabled="isSolved"
        :wobble="wobbleId === shuffledChoices[3]"
        :dimmed="draggingId !== null && draggingId !== shuffledChoices[3]"
        @drag-start="onDragStart"
        @drag-move="(cx,cy) => onDragMove(shuffledChoices[3], cx, cy)"
        @drag-end="(cx,cy) => onDragEnd(shuffledChoices[3], cx, cy)"
      />
    </div>

    <StarBurst :active="burstActive" :x="burstX" :y="burstY" />

    <!-- Bottom bar: centered label only -->
    <div class="bottom-bar">
      <div class="level-pill" :style="{ color: level.accent, borderColor: level.accent }">
        <span>{{ level.name }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.game-screen {
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 12px;
  box-sizing: border-box;
  gap: 14px;
}

.bottom-bar {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
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
  padding: 0.3rem 1rem;
  font-family: "Nunito", sans-serif;
  font-size: 1.15rem;
  font-weight: 900;
  box-shadow: 0 3px 10px rgba(0,0,0,0.12);
}

.progress-dots { display: flex; align-items: center; gap: 7px; }
.dot { border-radius: 50%; transition: all 0.3s ease; }
.dot.done    { width: 11px; height: 11px; background: #7C3AED; }
.dot.current { width: 15px; height: 15px; background: #a78bfa; box-shadow: 0 0 0 3px rgba(167,139,250,0.35); }
.dot.todo    { width: 11px; height: 11px; background: rgba(255,255,255,0.6); border: 2px solid rgba(0,0,0,0.15); }

/* ── 3x3 grid ─────────────────────────────────────────────── */
.play-area {
  display: grid;
  grid-template-columns: 1fr 1.5fr 1fr;
  grid-template-rows: 1fr 1.5fr 1fr;
  gap: 8px;
  width: 100%;
  max-width: 440px;
  aspect-ratio: 1;
}

.pos-tl     { grid-row: 1; grid-column: 1; }
.pos-tr     { grid-row: 1; grid-column: 3; }
.pos-center { grid-row: 2; grid-column: 2; }
.pos-bl     { grid-row: 3; grid-column: 1; }
.pos-br     { grid-row: 3; grid-column: 3; }

/* Cards fill their grid cell */
.play-area :deep(.item-card) {
  width: 100% !important;
  height: 100% !important;
  border-radius: 18px;
}

/* Stage fills its grid cell */
.play-area :deep(.stage-frame) {
  width: 100% !important;
  height: 100% !important;
  border-radius: 18px;
}

/* SVGs inside corner cards */
.pos-tl :deep(svg),
.pos-tr :deep(svg),
.pos-bl :deep(svg),
.pos-br :deep(svg) {
  width: 65% !important;
  height: 65% !important;
}

/* SVG inside center stage */
.pos-center :deep(svg) {
  width: 62% !important;
  height: 62% !important;
}
</style>

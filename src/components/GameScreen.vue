<script setup lang="ts">
import { ref } from 'vue'
import type { Level, Puzzle, ItemId } from '../types/game'
import ItemShape from './ItemShape.vue'
import { useSound } from '../composables/useSound'
const props = defineProps<{level:Level; puzzle:Puzzle; puzzleIndex:number; totalPuzzles:number; solved:boolean; muted:boolean}>()
const emit = defineEmits<{solved:[]; next:[]}>()
const sound = useSound()
const label = (id: ItemId) => id === 'wateringcan' ? 'watering can' : id === 'icecream' ? 'ice cream' : id
const choices = [...props.puzzle.choiceIds]
for (let i=choices.length-1;i>0;i--) { const j=Math.floor(Math.random()*(i+1)); [choices[i],choices[j]]=[choices[j]!,choices[i]!] }
const wrong = ref<ItemId | null>(null), hint = ref(false), hovering = ref(false)
const zone = ref<HTMLElement | null>(null)
const dragging = ref<ItemId | null>(null), dx = ref(0), dy = ref(0)
let startX=0, startY=0, moved=false, suppressClick=false
function choose(id:ItemId) {
  if (props.solved) return
  if (id === props.puzzle.targetId) { wrong.value=null; emit('solved'); if (!props.muted) sound.playSuccess() }
  else { wrong.value=id; if (!props.muted) sound.playWrong() }
}
function down(e:PointerEvent,id:ItemId) {
  if (props.solved || e.button !== 0) return
  dragging.value=id; startX=e.clientX; startY=e.clientY; moved=false
  ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
}
function over(e:PointerEvent) { const r=zone.value?.getBoundingClientRect(); return !!r && e.clientX>=r.left && e.clientX<=r.right && e.clientY>=r.top && e.clientY<=r.bottom }
function move(e:PointerEvent) {
  if (!dragging.value) return
  dx.value=e.clientX-startX; dy.value=e.clientY-startY
  moved ||= Math.hypot(dx.value,dy.value)>8; hovering.value=over(e)
}
function cancel() { dragging.value=null; dx.value=0; dy.value=0; hovering.value=false }
function up(e:PointerEvent,id:ItemId) {
  if (!dragging.value) return
  suppressClick=moved
  if (moved && over(e)) choose(id)
  cancel()
}
function click(e:MouseEvent,id:ItemId) { if (e.detail===0 || !suppressClick) choose(id); suppressClick=false }
</script>
<template>
  <section class="game">
    <div class="game-topline"><span class="world-pill">{{ level.emoji }} World {{ level.id }} · {{ level.name }}</span><span>Match {{ puzzleIndex + 1 }} of {{ totalPuzzles }}</span></div>
    <div class="progress" role="progressbar" :aria-valuenow="puzzleIndex + (solved ? 1 : 0)" :aria-valuemax="totalPuzzles" aria-valuemin="0" aria-label="Matches completed"><span v-for="n in totalPuzzles" :key="n" :class="{filled:n <= puzzleIndex + (solved ? 1 : 0)}"></span></div>
    <h1>{{ solved ? 'You found its friend!' : 'Who’s hiding in the shadow?' }}</h1>
    <p class="instruction">{{ solved ? 'Wonderful matching. Ready for the next one?' : 'Tap the matching picture, or drag it to the shadow.' }}</p>
    <div ref="zone" class="shadow-stage" :class="{matched:solved, hovering}">
      <span class="stage-spark spark-one" aria-hidden="true">✧</span><span class="stage-spark spark-two" aria-hidden="true">✧</span>
      <div class="shadow-disc"><ItemShape :item-id="puzzle.targetId" :mode="solved || hint ? 'colorful' : 'silhouette'" :size="180" /></div>
      <span class="stage-label">{{ solved ? '✓ A perfect match' : hint ? 'Find this picture below' : 'Find my match' }}</span>
    </div>
    <div class="choices" :class="{'three-choices':choices.length===3}">
      <button v-for="(id,i) in choices" :key="id" class="choice" :class="[{correct:solved && id===puzzle.targetId, retry:wrong===id, dragging:dragging===id}, ['lavender','peach','blue','mint'][i]]" :disabled="solved" :aria-label="`Match ${label(id)}`" :style="dragging===id ? {transform:`translate(${dx}px,${dy}px)`, zIndex:5} : {}" @pointerdown="down($event,id)" @pointermove="move" @pointerup="up($event,id)" @pointercancel="cancel" @lostpointercapture="cancel" @click="click($event,id)"><ItemShape :item-id="id" :size="115" /><span>{{ label(id) }}</span><b v-if="solved && id===puzzle.targetId" class="check">✓</b></button>
    </div>
    <div class="feedback" aria-live="polite"><template v-if="solved">✦ Great job! It’s {{ label(puzzle.targetId) }}.</template><template v-else-if="wrong">Keep looking. You can try another picture!</template><template v-else>Take your time. You’ve got this.</template></div>
    <button v-if="solved" class="primary next-button" @click="emit('next')">{{ puzzleIndex + 1 === totalPuzzles ? 'Finish world' : 'Next match' }} →</button>
    <button v-else class="quiet-button hint-button" :aria-pressed="hint" @click="hint = !hint">{{ hint ? 'Show shadow again' : '✧ Give me a hint' }}</button>
  </section>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from 'vue'
import type { Level, Puzzle, ItemId } from '../types/game'
import ItemShape from './ItemShape.vue'
import { useSound } from '../composables/useSound'
const props = defineProps<{level:Level; puzzle:Puzzle; puzzleIndex:number; totalPuzzles:number; solved:boolean; muted:boolean}>()
const emit = defineEmits<{solved:[]; next:[]}>()
const sound = useSound()
const itemLabels: Partial<Record<ItemId, string>> = { wateringcan:'watering can', icecream:'ice cream', rollingpin:'rolling pin', tshirt:'T-shirt', paintbrush:'paint brush', hairdryer:'hair dryer', flowerpot:'flower pot', magnifier:'magnifying glass' }
const label = (id: ItemId) => itemLabels[id] ?? id
const choices = [...props.puzzle.choiceIds]
for (let i=choices.length-1;i>0;i--) { const j=Math.floor(Math.random()*(i+1)); [choices[i],choices[j]]=[choices[j]!,choices[i]!] }
const wrong = ref<ItemId | null>(null), hint = ref(false), hovering = ref(false)
const zone = ref<HTMLElement | null>(null)
const dragging = ref<ItemId | null>(null), dx = ref(0), dy = ref(0)
const celebrating = ref(false), attempt = ref(0)
let celebrationTimer: ReturnType<typeof setTimeout> | undefined
onUnmounted(() => clearTimeout(celebrationTimer))
const confetti = Array.from({ length: 16 }, (_, i) => ({
  x: `${Math.cos(i * Math.PI / 8) * (85 + i % 3 * 22)}px`,
  y: `${Math.sin(i * Math.PI / 8) * (70 + i % 3 * 20)}px`,
  color: ['#e8b34d', '#ba92ca', '#73a995', '#dd9173'][i % 4],
  delay: `${i % 4 * 35}ms`,
}))
let startX=0, startY=0, moved=false, suppressClick=false
function choose(id:ItemId) {
  if (props.solved) return
  if (id === props.puzzle.targetId) {
    wrong.value=null; celebrating.value=true; emit('solved')
    clearTimeout(celebrationTimer)
    celebrationTimer=setTimeout(() => { celebrating.value=false }, 1400)
    if (!props.muted) sound.playSuccess()
  }
  else { attempt.value++; wrong.value=id; if (!props.muted) sound.playWrong() }
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
  <section class="game" :class="{'game-solved':solved}">
    <div class="game-topline"><span class="world-pill">{{ level.emoji }} World {{ level.id }} · {{ level.name }}</span><span>Match {{ puzzleIndex + 1 }} of {{ totalPuzzles }}</span></div>
    <div class="progress" role="progressbar" :aria-valuenow="puzzleIndex + (solved ? 1 : 0)" :aria-valuemax="totalPuzzles" aria-valuemin="0" aria-label="Matches completed"><span v-for="n in totalPuzzles" :key="n" :class="{filled:n <= puzzleIndex + (solved ? 1 : 0)}"></span></div>
    <h1>{{ solved ? 'You found its friend!' : 'Who’s hiding in the shadow?' }}</h1>
    <p class="instruction">{{ solved ? 'Wonderful matching. Ready for the next one?' : 'Tap the matching picture, or drag it to the shadow.' }}</p>
    <div ref="zone" class="shadow-stage" :class="{matched:solved, hovering, celebrating}">
      <div v-if="celebrating" class="celebration-confetti" aria-hidden="true"><span v-for="(piece,i) in confetti" :key="i" :style="{'--x':piece.x, '--y':piece.y, '--piece-color':piece.color, animationDelay:piece.delay}">{{ i % 3 === 0 ? '★' : '●' }}</span></div>
      <span class="stage-spark spark-one" aria-hidden="true">✧</span><span class="stage-spark spark-two" aria-hidden="true">✧</span>
      <div class="shadow-disc"><ItemShape :item-id="puzzle.targetId" :mode="solved || hint ? 'colorful' : 'silhouette'" :size="180" /></div>
      <span class="stage-label">{{ solved ? '✓ A perfect match' : hint ? 'Find this picture below' : 'Find my match' }}</span>
    </div>
    <div class="choices" :class="{'three-choices':choices.length===3}">
      <button v-for="(id,i) in choices" :key="id" class="choice" :class="[{correct:solved && id===puzzle.targetId, retry:wrong===id, dragging:dragging===id}, ['lavender','peach','blue','mint'][i]]" :disabled="solved" :aria-label="`Match ${label(id)}`" :style="dragging===id ? {transform:`translate(${dx}px,${dy}px)`, zIndex:5} : {}" @pointerdown="down($event,id)" @pointermove="move" @pointerup="up($event,id)" @pointercancel="cancel" @lostpointercapture="cancel" @click="click($event,id)"><span :key="`${id}-${wrong === id ? attempt : 0}`" class="choice-art" :class="{'try-again':wrong === id}"><ItemShape :item-id="id" :size="115" /></span><span>{{ label(id) }}</span><b v-if="solved && id===puzzle.targetId" class="check">✓</b></button>
    </div>
    <div class="feedback" :class="{'success-feedback':celebrating}" aria-live="polite"><template v-if="solved">✦ Great job! It’s {{ label(puzzle.targetId) }}.</template><template v-else-if="wrong">Keep looking. You can try another picture!</template><template v-else>Take your time. You’ve got this.</template></div>
    <div v-if="solved" class="success-actions">
      <button class="primary next-button" @click="emit('next')">{{ puzzleIndex + 1 === totalPuzzles ? 'Finish world' : 'Next match' }} →</button>
    </div>
    <button v-else class="quiet-button hint-button" :aria-pressed="hint" @click="hint = !hint">{{ hint ? 'Show shadow again' : '✧ Give me a hint' }}</button>
  </section>
</template>

<style scoped>
/* Finished cards no longer need to capture drag gestures. */
.choice:disabled { touch-action: pan-y; }

@media (max-width: 600px), (max-height: 600px) and (pointer: coarse) {
  .game-solved { padding-bottom: calc(100px + env(safe-area-inset-bottom, 0px)); }
  .success-actions {
    position: fixed;
    inset: auto 0 0;
    z-index: 10;
    padding: 12px 18px calc(12px + env(safe-area-inset-bottom, 0px));
    background: #faf9f4;
    border-top: 1px solid #e5e8df;
    box-shadow: 0 -4px 16px #29483f12;
  }
  .success-actions .next-button {
    width: 100%;
    max-width: 480px;
    min-width: 0;
    min-height: 56px;
    margin: 0;
  }
}
.choice-art { display: block; width: 100%; max-width: 115px; margin: 0 !important; }
.choice-art.try-again { animation: gentle-wiggle 480ms ease-in-out; }
.celebrating .shadow-disc { animation: happy-pop 650ms cubic-bezier(.22,.8,.35,1); }
.celebrating .stage-label, .success-feedback { animation: happy-pop 500ms ease-out; }
.celebration-confetti { position: absolute; inset: 0; pointer-events: none; z-index: 2; overflow: hidden; border-radius: inherit; }
.celebration-confetti span { position: absolute; left: 50%; top: 45%; color: var(--piece-color); font-size: 22px; line-height: 1; opacity: 0; animation: confetti-pop 1100ms ease-out forwards; }
@keyframes happy-pop {
  0% { transform: scale(.85); }
  45% { transform: scale(1.1) rotate(-3deg); }
  72% { transform: scale(.98) rotate(2deg); }
  100% { transform: scale(1); }
}
@keyframes gentle-wiggle {
  0%, 100% { transform: translateX(0) rotate(0); }
  20% { transform: translateX(-7px) rotate(-5deg); }
  40% { transform: translateX(7px) rotate(5deg); }
  60% { transform: translateX(-5px) rotate(-3deg); }
  80% { transform: translateX(3px) rotate(2deg); }
}
@keyframes confetti-pop {
  0% { opacity: 0; transform: translate(-50%,-50%) scale(.4); }
  15% { opacity: 1; }
  70% { opacity: 1; }
  100% { opacity: 0; transform: translate(calc(-50% + var(--x)),calc(-50% + var(--y))) rotate(100deg) scale(.75); }
}
@media (prefers-reduced-motion: reduce) {
  .celebration-confetti { display: none; }
  .choice-art.try-again, .celebrating .shadow-disc, .celebrating .stage-label, .success-feedback { animation: none; }
}
</style>

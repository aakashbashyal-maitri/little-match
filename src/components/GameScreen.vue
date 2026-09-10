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
  <section class="game max-[600px]:pt-3!" :class="{'[@media(max-width:600px),(max-height:600px)_and_(pointer:coarse)]:pb-[calc(100px+env(safe-area-inset-bottom,0px))]!':solved}">
    <div class="game-topline"><span class="world-pill">{{ level.emoji }} World {{ level.id }} · {{ level.name }}</span><span>Match {{ puzzleIndex + 1 }} of {{ totalPuzzles }}</span></div>
    <div class="progress max-[600px]:my-3!" role="progressbar" :aria-valuenow="puzzleIndex + (solved ? 1 : 0)" :aria-valuemax="totalPuzzles" aria-valuemin="0" aria-label="Matches completed"><span v-for="n in totalPuzzles" :key="n" :class="{filled:n <= puzzleIndex + (solved ? 1 : 0)}"></span></div>
    <h1 class="max-[600px]:text-2xl!">{{ solved ? 'You found its friend!' : 'Who’s hiding in the shadow?' }}</h1>
    <p class="instruction max-[600px]:mt-1.5!">{{ solved ? 'Wonderful matching. Ready for the next one?' : 'Tap the matching picture, or drag it to the shadow.' }}</p>
    <div ref="zone" class="shadow-stage max-[600px]:my-3! max-[600px]:h-[clamp(130px,22dvh,165px)]!" :class="{matched:solved, hovering, celebrating}">
      <div v-if="celebrating" class="celebration-confetti" aria-hidden="true"><span v-for="(piece,i) in confetti" :key="i" :style="{'--x':piece.x, '--y':piece.y, '--piece-color':piece.color, animationDelay:piece.delay}">{{ i % 3 === 0 ? '★' : '●' }}</span></div>
      <span class="stage-spark spark-one" aria-hidden="true">✧</span><span class="stage-spark spark-two" aria-hidden="true">✧</span>
      <div class="shadow-disc max-[600px]:size-[clamp(100px,17dvh,130px)]! max-[600px]:[&_svg]:size-full!"><ItemShape :item-id="puzzle.targetId" :mode="solved || hint ? 'colorful' : 'silhouette'" :size="180" /></div>
      <span class="stage-label">{{ solved ? '✓ A perfect match' : hint ? 'Find this picture below' : 'Find my match' }}</span>
    </div>
    <div class="choices max-[600px]:gap-2!" :class="{'three-choices':choices.length===3}">
      <button v-for="(id,i) in choices" :key="id" class="choice disabled:touch-pan-y!" :class="[{correct:solved && id===puzzle.targetId, retry:wrong===id, dragging:dragging===id}, ['lavender','peach','blue','mint'][i]]" :disabled="solved" :aria-label="`Match ${label(id)}`" :style="dragging===id ? {transform:`translate(${dx}px,${dy}px)`, zIndex:5} : {}" @pointerdown="down($event,id)" @pointermove="move" @pointerup="up($event,id)" @pointercancel="cancel" @lostpointercapture="cancel" @click="click($event,id)"><span :key="`${id}-${wrong === id ? attempt : 0}`" class="choice-art max-[600px]:max-w-[clamp(60px,10dvh,80px)]!" :class="{'try-again':wrong === id}"><ItemShape :item-id="id" :size="115" /></span><span>{{ label(id) }}</span><b v-if="solved && id===puzzle.targetId" class="check">✓</b></button>
    </div>
    <div class="feedback max-[600px]:min-h-8! max-[600px]:pt-2!" :class="{'success-feedback':celebrating}" aria-live="polite"><template v-if="solved">✦ Great job! It’s {{ label(puzzle.targetId) }}.</template><template v-else-if="wrong">Keep looking. You can try another picture!</template><template v-else>Take your time. You’ve got this.</template></div>
    <div v-if="solved" class="[@media(max-width:600px),(max-height:600px)_and_(pointer:coarse)]:fixed [@media(max-width:600px),(max-height:600px)_and_(pointer:coarse)]:inset-x-0 [@media(max-width:600px),(max-height:600px)_and_(pointer:coarse)]:bottom-0 [@media(max-width:600px),(max-height:600px)_and_(pointer:coarse)]:z-10 [@media(max-width:600px),(max-height:600px)_and_(pointer:coarse)]:px-[18px] [@media(max-width:600px),(max-height:600px)_and_(pointer:coarse)]:pt-3 [@media(max-width:600px),(max-height:600px)_and_(pointer:coarse)]:pb-[calc(12px+env(safe-area-inset-bottom,0px))] [@media(max-width:600px),(max-height:600px)_and_(pointer:coarse)]:bg-[#faf9f4] [@media(max-width:600px),(max-height:600px)_and_(pointer:coarse)]:border-t [@media(max-width:600px),(max-height:600px)_and_(pointer:coarse)]:border-[#e5e8df] [@media(max-width:600px),(max-height:600px)_and_(pointer:coarse)]:shadow-[0_-4px_16px_#29483f12]">
      <button class="primary next-button [@media(max-width:600px),(max-height:600px)_and_(pointer:coarse)]:w-full [@media(max-width:600px),(max-height:600px)_and_(pointer:coarse)]:max-w-[480px] [@media(max-width:600px),(max-height:600px)_and_(pointer:coarse)]:min-w-0! [@media(max-width:600px),(max-height:600px)_and_(pointer:coarse)]:min-h-14 [@media(max-width:600px),(max-height:600px)_and_(pointer:coarse)]:m-0!" @click="emit('next')">{{ puzzleIndex + 1 === totalPuzzles ? 'Finish world' : 'Next match' }} →</button>
    </div>
    <button v-else class="quiet-button hint-button" :aria-pressed="hint" @click="hint = !hint">{{ hint ? 'Show shadow again' : '✧ Give me a hint' }}</button>
  </section>
</template>

<style scoped>
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

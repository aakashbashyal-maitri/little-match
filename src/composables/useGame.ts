import { ref, computed, watch } from 'vue'
import { levels } from '../data/levels'
import type { GamePhase } from '../types/game'
const KEY = 'little-match:progress:v2'
export function useGame() {
  const phase = ref<GamePhase>('welcome')
  const levelIndex = ref(0), puzzleIndex = ref(0), solved = ref(false), muted = ref(false)
  const hasSave = ref(false), storageAvailable = ref(true)
  let resumePhase: GamePhase = 'playing'
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) {
      const s = JSON.parse(raw)
      if (s.version === 2 && Number.isInteger(s.level) && levels[s.level] && Number.isInteger(s.puzzle) && levels[s.level].puzzles[s.puzzle] && ['playing','levelComplete','allDone'].includes(s.phase)) {
        levelIndex.value = s.level; puzzleIndex.value = s.puzzle
        solved.value = s.solved === true; muted.value = s.muted === true
        resumePhase = s.phase; hasSave.value = true
      }
    }
  } catch { storageAvailable.value = false }
  const currentLevel = computed(() => levels[levelIndex.value]!)
  const currentPuzzle = computed(() => currentLevel.value.puzzles[puzzleIndex.value]!)
  const totalPuzzles = computed(() => currentLevel.value.puzzles.length)
  const isLastLevel = computed(() => levelIndex.value === levels.length - 1)
  function save() {
    if (!hasSave.value) return
    try {
      localStorage.setItem(KEY, JSON.stringify({version:2, level:levelIndex.value, puzzle:puzzleIndex.value, phase:phase.value === 'welcome' ? resumePhase : phase.value, solved:solved.value, muted:muted.value}))
      storageAvailable.value = true
    } catch { storageAvailable.value = false }
  }
  watch([phase,levelIndex,puzzleIndex,solved,muted], save, { flush:'post' })
  function startGame() { hasSave.value = true; phase.value = resumePhase; save() }
  function home() { if (phase.value !== 'welcome') resumePhase = phase.value; phase.value = 'welcome' }
  function nextPuzzle() {
    solved.value = false
    if (puzzleIndex.value + 1 < totalPuzzles.value) puzzleIndex.value++
    else phase.value = 'levelComplete'
  }
  function nextLevel() {
    if (isLastLevel.value) phase.value = 'allDone'
    else { levelIndex.value++; puzzleIndex.value = 0; phase.value = 'playing' }
  }
  function restartGame() {
    levelIndex.value = 0; puzzleIndex.value = 0; solved.value = false
    resumePhase = 'playing'; hasSave.value = true; phase.value = 'playing'; save()
  }
  return {phase,levelIndex,puzzleIndex,solved,muted,hasSave,storageAvailable,currentLevel,currentPuzzle,totalPuzzles,isLastLevel,startGame,home,nextPuzzle,nextLevel,restartGame}
}

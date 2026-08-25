import { ref, computed } from 'vue'
import { levels } from '../data/levels'
import type { GamePhase } from '../types/game'

export function useGame() {
  const phase        = ref<GamePhase>('welcome')
  const levelIndex   = ref(0)
  const puzzleIndex  = ref(0)

  const currentLevel  = computed(() => levels[levelIndex.value])
  const currentPuzzle = computed(() => currentLevel.value.puzzles[puzzleIndex.value])
  const totalPuzzles  = computed(() => currentLevel.value.puzzles.length)
  const isLastLevel   = computed(() => levelIndex.value >= levels.length - 1)

  function startGame() {
    levelIndex.value  = 0
    puzzleIndex.value = 0
    phase.value       = 'playing'
  }

  function nextPuzzle() {
    if (puzzleIndex.value < currentLevel.value.puzzles.length - 1) {
      puzzleIndex.value++
    } else {
      phase.value = 'levelComplete'
    }
  }

  function nextLevel() {
    if (!isLastLevel.value) {
      levelIndex.value++
      puzzleIndex.value = 0
      phase.value       = 'playing'
    } else {
      phase.value = 'allDone'
    }
  }

  function restartGame() {
    levelIndex.value  = 0
    puzzleIndex.value = 0
    phase.value       = 'welcome'
  }

  return {
    phase, levelIndex, puzzleIndex,
    currentLevel, currentPuzzle, totalPuzzles, isLastLevel,
    startGame, nextPuzzle, nextLevel, restartGame,
  }
}


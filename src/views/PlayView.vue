<script setup lang="ts">
import GameScreen from '../components/GameScreen.vue'
import { useGameNavigation } from '../composables/useGameNavigation'
const { g, nextPuzzle } = useGameNavigation()
</script>
<template>
      <GameScreen :key="`${g.levelIndex.value}-${g.puzzleIndex.value}`" :level="g.currentLevel.value" :puzzle="g.currentPuzzle.value" :puzzle-index="g.puzzleIndex.value" :total-puzzles="g.totalPuzzles.value" :solved="g.solved.value" :muted="g.muted.value" @solved="g.solved.value = true" @next="nextPuzzle" />
</template>

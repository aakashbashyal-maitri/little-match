<script setup lang="ts">
import { useGameNavigation } from '../composables/useGameNavigation'
const { g, nextLevel, home } = useGameNavigation()
</script>
<template>
  <section class="completion">
    <div class="award">✦</div>
    <div class="eyebrow">WORLD {{ g.levelIndex.value + 1 }} COMPLETE</div>
    <h1>You found every match!</h1>
    <p>{{ g.currentLevel.value.name }} complete. Ready for another adventure?</p>
    <button class="primary" @click="nextLevel">{{ g.isLastLevel.value ? 'Collect my trophy' : 'Next world' }} →</button>
    <button class="quiet-button" @click="home">Back to home</button>
  </section>
</template>

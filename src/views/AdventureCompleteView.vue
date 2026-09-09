<script setup lang="ts">
import { useGameNavigation } from '../composables/useGameNavigation'
const { restart, home } = useGameNavigation()
</script>
<template>
  <section class="completion">
    <div class="award">🏆</div>
    <div class="eyebrow">ADVENTURE COMPLETE</div>
    <h1>Look at you, little star!</h1>
    <p>So many discoveries. So much to be proud of.</p>
    <button class="primary" @click="restart">Play again →</button>
    <button class="quiet-button" @click="home">Back to home</button>
  </section>
</template>

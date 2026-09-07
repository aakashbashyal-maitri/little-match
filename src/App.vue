<script setup lang="ts">
import { ref } from 'vue'
import { useGame } from './composables/useGame'
import { levels } from './data/levels'
import GameScreen from './components/GameScreen.vue'
import ItemShape from './components/ItemShape.vue'
const g = useGame()
const resetDialog = ref<HTMLDialogElement | null>(null)
function reset() { g.restartGame(); resetDialog.value?.close() }
</script>
<template>
  <div class="app-shell">
    <header class="site-header">
      <button class="brand" aria-label="Little Match home" @click="g.home"><span class="brand-mark">✦</span> little match<span class="brand-dot">.</span></button>
      <div class="header-actions"><span class="save-note">{{ g.storageAvailable.value ? 'Progress saved on this device' : 'Progress cannot be saved on this device' }}</span><button class="quiet-button" :aria-pressed="g.muted.value" @click="g.muted.value = !g.muted.value">{{ g.muted.value ? '♫ Sound off' : '♫ Sound on' }}</button></div>
    </header>
    <main>
      <section v-if="g.phase.value === 'welcome'" class="welcome">
        <div class="eyebrow">LITTLE DISCOVERIES. BIG SMILES.</div>
        <h1>A little match.<br>A big <span>“I did it!”</span></h1>
        <p class="intro">Look at the shadow. Find its colorful friend.<br>A playful little adventure, one match at a time.</p>
        <div class="preview-row" aria-hidden="true"><div class="preview-card lavender"><ItemShape item-id="butterfly" :size="110" /></div><div class="preview-card mint"><ItemShape item-id="elephant" :size="140" /></div><div class="preview-card peach"><ItemShape item-id="rocket" :size="110" /></div></div>
        <button class="primary" @click="g.startGame">{{ g.hasSave.value ? 'Keep playing' : 'Let’s play' }} <span>→</span></button>
        <p class="small-note">{{ g.hasSave.value ? `Your adventure is waiting · World ${g.levelIndex.value + 1}` : 'Tap or drag · No timer · Just discovery' }}</p>
        <div class="worlds"><div v-for="(level, i) in levels" :key="level.id" class="world" :class="{visited: g.hasSave.value && i <= g.levelIndex.value}"><span>{{ level.emoji }}</span><strong>{{ level.name }}</strong><small>{{ level.puzzles.length }} matches</small></div></div>
      </section>
      <GameScreen v-else-if="g.phase.value === 'playing'" :key="`${g.levelIndex.value}-${g.puzzleIndex.value}`" :level="g.currentLevel.value" :puzzle="g.currentPuzzle.value" :puzzle-index="g.puzzleIndex.value" :total-puzzles="g.totalPuzzles.value" :solved="g.solved.value" :muted="g.muted.value" @solved="g.solved.value = true" @next="g.nextPuzzle" />
      <section v-else class="completion">
        <div class="award">{{ g.phase.value === 'allDone' ? '🏆' : '✦' }}</div>
        <div class="eyebrow">{{ g.phase.value === 'allDone' ? 'ADVENTURE COMPLETE' : `WORLD ${g.levelIndex.value + 1} COMPLETE` }}</div>
        <h1>{{ g.phase.value === 'allDone' ? 'Look at you, little star!' : 'You found every match!' }}</h1>
        <p>{{ g.phase.value === 'allDone' ? 'So many discoveries. So much to be proud of.' : `${g.currentLevel.value.name} complete. Ready for another adventure?` }}</p>
        <button class="primary" @click="g.phase.value === 'allDone' ? g.restartGame() : g.nextLevel()">{{ g.phase.value === 'allDone' ? 'Play again' : g.isLastLevel.value ? 'Collect my trophy' : 'Next world' }} →</button>
        <button class="quiet-button" @click="g.home">Back to home</button>
      </section>
    </main>
    <footer><span>Made for curious little minds</span><button v-if="g.hasSave.value" class="text-button" @click="resetDialog?.showModal()">Start fresh ↻</button><span v-else>Small steps. Happy learning.</span></footer>
    <dialog ref="resetDialog" @click="(e) => { if (e.target === resetDialog) resetDialog?.close() }"><h2>A brand-new adventure?</h2><p>This clears your matches and starts at World 1.</p><div class="dialog-actions"><button class="quiet-button" autofocus @click="resetDialog?.close()">Keep my progress</button><button class="primary" @click="reset">Start fresh</button></div></dialog>
  </div>
</template>

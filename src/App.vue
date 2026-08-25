<script setup lang="ts">
import { useGame }  from "./composables/useGame"
import { useSound } from "./composables/useSound"
import WelcomeScreen from "./components/WelcomeScreen.vue"
import GameScreen    from "./components/GameScreen.vue"
import LevelComplete from "./components/LevelComplete.vue"

const game  = useGame()
const sound = useSound()

function handleSolved() {
  sound.playLevelComplete()
  game.nextPuzzle()
}
</script>

<template>
  <div class="app-wrapper">
    <div class="bg-deco" aria-hidden="true">
      <span class="deco deco-1 animate-spin-slow">✦</span>
      <span class="deco deco-2 animate-float" style="animation-delay:0.5s">✦</span>
      <span class="deco deco-3 animate-spin-slow" style="animation-direction:reverse">✦</span>
      <span class="deco deco-4 animate-float" style="animation-delay:1.2s">✦</span>
      <span class="deco deco-5 animate-spin-slow" style="animation-delay:3s">✦</span>
    </div>
    <div class="screen-container">
      <Transition name="screen" mode="out-in">
        <WelcomeScreen
          v-if="game.phase.value === 'welcome'"
          key="welcome"
          @start="game.startGame"
        />
        <GameScreen
          v-else-if="game.phase.value === 'playing'"
          :key="`level-${game.levelIndex.value}-puzzle-${game.puzzleIndex.value}`"
          :level="game.currentLevel.value"
          :puzzle="game.currentPuzzle.value"
          :puzzle-index="game.puzzleIndex.value"
          :total-puzzles="game.totalPuzzles.value"
          @solved="handleSolved"
        />
        <LevelComplete
          v-else-if="game.phase.value === 'levelComplete'"
          key="level-complete"
          :level="game.currentLevel.value"
          :is-last="game.isLastLevel.value"
          @next="game.nextLevel"
        />
        <div
          v-else-if="game.phase.value === 'allDone'"
          key="all-done"
          class="all-done"
        >
          <div class="trophy animate-bounce">🏆</div>
          <h1 class="star-title">You are a Star!</h1>
          <p class="star-sub">All levels complete! 🎉</p>
          <div class="stars-row">
            <span v-for="i in 5" :key="i" class="animate-bounce" :style="`animation-delay:${i*0.1}s`">⭐</span>
          </div>
          <button class="play-again-btn" @click="game.restartGame">Play Again 🔄</button>
        </div>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.app-wrapper {
  min-height: 100dvh;
  position: relative;
  overflow: hidden;
  background-color: #F5C842;
  background-image: repeating-linear-gradient(
    0deg,
    transparent 0px,
    transparent 38px,
    rgba(0,0,0,0.035) 38px,
    rgba(0,0,0,0.035) 40px
  );
}
.screen-container {
  position: relative;
  z-index: 1;
  min-height: 100dvh;
}
.bg-deco {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}
.deco {
  position: absolute;
  font-size: 2rem;
  color: rgba(160,98,10,0.15);
  user-select: none;
}
.deco-1 { top:  8%; left:  4%; font-size: 3rem; }
.deco-2 { top: 15%; right: 5%; font-size: 2rem; }
.deco-3 { top: 48%; left:  2%; font-size: 1.6rem; }
.deco-4 { top: 70%; right: 4%; font-size: 2.5rem; }
.deco-5 { top: 88%; left: 10%; font-size: 1.8rem; }
.all-done {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  min-height: 100dvh;
  padding: 2rem;
  text-align: center;
}
.trophy { font-size: 7rem; line-height: 1; filter: drop-shadow(0 8px 32px gold); }
.star-title { font-family: "Nunito", sans-serif; font-size: 3rem; font-weight: 900; color: #7C4700; margin: 0; }
.star-sub   { font-family: "Nunito", sans-serif; font-size: 1.5rem; font-weight: 800; color: #A0620A; margin: 0; }
.stars-row  { display: flex; gap: 8px; font-size: 2.5rem; }
.play-again-btn {
  font-family: "Nunito", sans-serif;
  font-size: 1.75rem;
  font-weight: 900;
  color: white;
  background: linear-gradient(135deg, #FF8C00, #FF6B35);
  border: none;
  border-radius: 9999px;
  padding: 1rem 3rem;
  box-shadow: 0 8px 32px rgba(255,140,0,0.4);
  cursor: pointer;
  transition: transform 0.15s ease;
  touch-action: manipulation;
}
.play-again-btn:active { transform: scale(0.94); }
</style>

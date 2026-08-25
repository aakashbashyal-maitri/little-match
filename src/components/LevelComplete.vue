<script setup lang="ts">
import type { Level } from '../types/game'
defineProps<{ level: Level; isLast: boolean }>()
defineEmits<{ (e: 'next'): void }>()
</script>

<template>
  <div class="celebrate">
    <div class="trophy animate-celebrate">🎉</div>

    <div>
      <p class="finished-text">You finished</p>
      <div class="level-badge">
        <span>{{ level.emoji }}</span>
        <span :style="{ color: level.accent }">{{ level.name }}!</span>
      </div>
    </div>

    <h2 class="great-job">Great Job! ⭐</h2>

    <div class="stars-row">
      <span v-for="i in 3" :key="i" class="animate-bounce" :style="`animation-delay:${i*0.12}s`">⭐</span>
    </div>

    <button class="next-btn" @click="$emit('next')">
      {{ isLast ? 'Play Again 🔄' : 'Next Level →' }}
    </button>
  </div>
</template>

<style scoped>
.celebrate {
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  padding: 2rem;
  text-align: center;
}
.trophy {
  font-size: 7rem;
  line-height: 1;
  filter: drop-shadow(0 8px 32px rgba(255,215,0,0.5));
}
.finished-text {
  font-family: 'Nunito', sans-serif;
  font-size: 1.5rem;
  font-weight: 900;
  color: #7C4700;
  margin: 0 0 8px;
}
.level-badge {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: white;
  border-radius: 18px;
  padding: 12px 28px;
  font-family: 'Nunito', sans-serif;
  font-size: 2rem;
  font-weight: 900;
  box-shadow: 0 4px 20px rgba(0,0,0,0.12);
}
.great-job {
  font-family: 'Nunito', sans-serif;
  font-size: 3rem;
  font-weight: 900;
  color: #FF8C00;
  text-shadow: 0 3px 0 rgba(0,0,0,0.08);
  margin: 0;
}
.stars-row {
  display: flex;
  gap: 8px;
  font-size: 2.5rem;
}
.next-btn {
  font-family: 'Nunito', sans-serif;
  font-size: 1.75rem;
  font-weight: 900;
  color: white;
  background: linear-gradient(135deg, #22c55e, #10b981);
  border: none;
  border-radius: 9999px;
  padding: 1rem 3rem;
  box-shadow: 0 8px 32px rgba(34,197,94,0.4);
  cursor: pointer;
  transition: transform 0.15s ease;
  touch-action: manipulation;
}
.next-btn:active { transform: scale(0.94); }
</style>

<script setup lang="ts">
import { levels } from '../data/levels'
defineEmits<{ (e: 'start'): void }>()
</script>

<template>
  <div class="welcome">
    <div class="star-logo animate-float">⭐</div>

    <div>
      <h1 class="title">Little Match</h1>
      <p class="subtitle">Find the matching picture!</p>
    </div>

    <div class="badges">
      <div v-for="level in levels" :key="level.id" class="badge">
        <span class="badge-emoji">{{ level.emoji }}</span>
        <span class="badge-name" :style="{ color: level.accent }">{{ level.name }}</span>
      </div>
    </div>

    <button class="start-btn" @click="$emit('start')">Let's Play! 🎮</button>
  </div>
</template>

<style scoped>
.welcome {
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  padding: 2.5rem 1.5rem;
  text-align: center;
}
.star-logo {
  font-size: 7rem;
  line-height: 1;
  filter: drop-shadow(0 8px 24px rgba(160,98,10,0.4));
}
.title {
  font-family: 'Nunito', sans-serif;
  font-size: 3.5rem;
  font-weight: 900;
  color: #7C4700;
  text-shadow: 0 3px 0 rgba(255,255,255,0.5), 0 6px 20px rgba(0,0,0,0.1);
  letter-spacing: -0.02em;
  margin: 0;
}
.subtitle {
  font-family: 'Nunito', sans-serif;
  font-size: 1.25rem;
  font-weight: 800;
  color: #A0620A;
  margin: 6px 0 0;
}
.badges {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
  justify-content: center;
}
.badge {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  background: white;
  border-radius: 18px;
  padding: 12px 22px;
  box-shadow: 0 4px 18px rgba(0,0,0,0.14);
}
.badge-emoji { font-size: 2.4rem; }
.badge-name {
  font-family: 'Nunito', sans-serif;
  font-size: 1rem;
  font-weight: 900;
}
.start-btn {
  font-family: 'Nunito', sans-serif;
  font-size: 1.75rem;
  font-weight: 900;
  color: white;
  background: linear-gradient(135deg, #FF8C00, #FF6B35);
  border: none;
  border-radius: 9999px;
  padding: 1rem 3rem;
  box-shadow: 0 8px 32px rgba(255,140,0,0.45), 0 2px 8px rgba(0,0,0,0.1);
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
  touch-action: manipulation;
}
.start-btn:active {
  transform: scale(0.94);
  box-shadow: 0 4px 16px rgba(255,140,0,0.3);
}
</style>

<script setup lang="ts">
defineEmits<{ (e: 'start'): void }>()

const levelCards = [
  { emoji: '🐄', name: 'Animals',  color: '#DCFCE7', accent: '#16a34a' },
  { emoji: '🍎', name: 'Fruits',   color: '#FFE4E6', accent: '#e11d48' },
  { emoji: '🥕', name: 'Food',     color: '#FEF3C7', accent: '#d97706' },
  { emoji: '🎒', name: 'Objects',  color: '#E0F2FE', accent: '#0369a1' },
  { emoji: '🚗', name: 'Vehicles', color: '#EDE9FE', accent: '#7c3aed' },
  { emoji: '🔷', name: 'Shapes',   color: '#FCE7F3', accent: '#be185d' },
]

const sparkles = [
  { char: '✦', size: '2rem',  color: '#FF6B35', top: '5%',  left: '8%',  delay: '0s',    dur: '3.2s' },
  { char: '★', size: '1.4rem',color: '#9333EA', top: '10%', left: '82%', delay: '0.5s',  dur: '4s'   },
  { char: '✦', size: '1rem',  color: '#22C55E', top: '20%', left: '92%', delay: '1s',    dur: '3.5s' },
  { char: '✨', size: '1.8rem',color: '#FF6B35', top: '38%', left: '4%',  delay: '0.8s',  dur: '4.2s' },
  { char: '★', size: '1.2rem',color: '#EC4899', top: '55%', left: '90%', delay: '1.5s',  dur: '3.8s' },
  { char: '✦', size: '1.6rem',color: '#9333EA', top: '70%', left: '6%',  delay: '0.3s',  dur: '5s'   },
  { char: '✨', size: '1rem',  color: '#22C55E', top: '78%', left: '88%', delay: '2s',    dur: '3.4s' },
  { char: '★', size: '2.2rem',color: '#F59E0B', top: '88%', left: '14%', delay: '0.6s',  dur: '4.6s' },
  { char: '✦', size: '1.3rem',color: '#EC4899', top: '92%', left: '78%', delay: '1.2s',  dur: '3.9s' },
  { char: '★', size: '0.9rem',color: '#FF6B35', top: '48%', left: '96%', delay: '1.8s',  dur: '3.1s' },
]
</script>

<template>
  <div class="welcome">

    <!-- Floating sparkles -->
    <span
      v-for="(s, i) in sparkles"
      :key="i"
      class="sparkle"
      :style="{
        fontSize: s.size,
        color: s.color,
        top: s.top,
        left: s.left,
        animationDelay: s.delay,
        animationDuration: s.dur,
      }"
    >{{ s.char }}</span>

    <!-- Mascot SVG -->
    <div class="mascot-wrap">
      <svg
        class="mascot"
        width="180" height="180"
        viewBox="0 0 160 160"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <!-- Star body -->
        <polygon
          points="80,8 95,55 145,55 105,83 120,130 80,103 40,130 55,83 15,55 65,55"
          fill="#FFD700"
          stroke="#F97316"
          stroke-width="4"
          stroke-linejoin="round"
        />
        <!-- Rosy cheeks -->
        <ellipse cx="58" cy="92" rx="10" ry="7" fill="#FFB3C1" opacity="0.7"/>
        <ellipse cx="102" cy="92" rx="10" ry="7" fill="#FFB3C1" opacity="0.7"/>
        <!-- Left eye -->
        <circle cx="65" cy="78" r="10" fill="white"/>
        <circle cx="67" cy="79" r="6"  fill="#1a1a2e"/>
        <circle cx="70" cy="76" r="2.5" fill="white"/>
        <!-- Right eye -->
        <circle cx="95" cy="78" r="10" fill="white"/>
        <circle cx="97" cy="79" r="6"  fill="#1a1a2e"/>
        <circle cx="100" cy="76" r="2.5" fill="white"/>
        <!-- Smile -->
        <path d="M 62 95 Q 80 112 98 95" stroke="#1a1a2e" stroke-width="3.5" fill="none" stroke-linecap="round"/>
        <!-- Left arm (waving up) -->
        <path d="M 30 70 Q 18 48 28 36" stroke="#F97316" stroke-width="7" fill="none" stroke-linecap="round"/>
        <circle cx="28" cy="36" r="7" fill="#FFD700" stroke="#F97316" stroke-width="3"/>
        <!-- Right arm -->
        <path d="M 130 70 Q 144 82 140 98" stroke="#F97316" stroke-width="7" fill="none" stroke-linecap="round"/>
        <circle cx="140" cy="98" r="7" fill="#FFD700" stroke="#F97316" stroke-width="3"/>
        <!-- Crown -->
        <polygon points="65,20 72,8 80,18 88,8 95,20" fill="#F97316" stroke="#FF6B35" stroke-width="1.5" stroke-linejoin="round"/>
        <circle cx="72" cy="8"  r="4" fill="#9333EA"/>
        <circle cx="80" cy="18" r="3" fill="#22C55E"/>
        <circle cx="88" cy="8"  r="4" fill="#EC4899"/>
      </svg>
    </div>

    <!-- Title -->
    <div class="title-block">
      <h1 class="title">Little Match</h1>
      <p class="tagline">Match the shadow! 🌟</p>
    </div>

    <!-- Level preview cards -->
    <div class="cards-grid">
      <div
        v-for="card in levelCards"
        :key="card.name"
        class="level-card"
        :style="{ background: card.color, '--accent': card.accent }"
      >
        <span class="card-emoji">{{ card.emoji }}</span>
        <span class="card-name" :style="{ color: card.accent }">{{ card.name }}</span>
      </div>
    </div>

    <!-- Play button -->
    <button class="play-btn" @click="$emit('start')">Let's Play! 🎮</button>

  </div>
</template>

<style scoped>
/* ── Layout ─────────────────────────────────────────── */
.welcome {
  position: relative;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.6rem;
  padding: 2rem 1.25rem 2.5rem;
  text-align: center;
  overflow: hidden;
  max-width: 440px;
  margin: 0 auto;
}

/* ── Sparkles ────────────────────────────────────────── */
.sparkle {
  position: absolute;
  pointer-events: none;
  user-select: none;
  animation: sparkle-float var(--dur, 4s) ease-in-out infinite;
  z-index: 0;
  filter: drop-shadow(0 0 4px currentColor);
}

/* ── Mascot ──────────────────────────────────────────── */
.mascot-wrap {
  position: relative;
  z-index: 1;
  animation: float 3.6s ease-in-out infinite, wiggle 2.8s ease-in-out infinite;
  filter: drop-shadow(0 12px 28px rgba(249,115,22,0.4));
}
.mascot { display: block; }

/* ── Title ───────────────────────────────────────────── */
.title-block { position: relative; z-index: 1; }

.title {
  font-family: 'Nunito', sans-serif;
  font-size: clamp(2.8rem, 10vw, 4rem);
  font-weight: 900;
  margin: 0;
  letter-spacing: -0.01em;
  background: linear-gradient(135deg, #FF6B35 0%, #9333EA 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: none;
  filter: drop-shadow(0 3px 0 rgba(255,255,255,0.85)) drop-shadow(0 6px 16px rgba(147,51,234,0.3));
  animation: pop-in 0.7s cubic-bezier(0.34,1.56,0.64,1) both;
}

.tagline {
  font-family: 'Nunito', sans-serif;
  font-size: 1.2rem;
  font-weight: 800;
  color: #7c3aed;
  margin: 6px 0 0;
  text-shadow: 0 2px 0 rgba(255,255,255,0.6);
  animation: pop-in 0.7s 0.15s cubic-bezier(0.34,1.56,0.64,1) both;
}

/* ── Level cards ─────────────────────────────────────── */
.cards-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  width: 100%;
  max-width: 360px;
  z-index: 1;
  position: relative;
}

.level-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  border-radius: 18px;
  padding: 14px 6px 10px;
  box-shadow: 0 4px 14px rgba(0,0,0,0.12), 0 0 0 2.5px var(--accent);
  animation: pop-in 0.55s cubic-bezier(0.34,1.56,0.64,1) both;
  transition: transform 0.18s ease, box-shadow 0.18s ease;
}
.level-card:nth-child(1) { animation-delay: 0.20s }
.level-card:nth-child(2) { animation-delay: 0.28s }
.level-card:nth-child(3) { animation-delay: 0.36s }
.level-card:nth-child(4) { animation-delay: 0.44s }
.level-card:nth-child(5) { animation-delay: 0.52s }
.level-card:nth-child(6) { animation-delay: 0.60s }

.level-card:hover { transform: translateY(-4px) scale(1.05); box-shadow: 0 8px 22px rgba(0,0,0,0.16), 0 0 0 2.5px var(--accent); }

.card-emoji { font-size: 2.2rem; line-height: 1; }
.card-name {
  font-family: 'Nunito', sans-serif;
  font-size: 0.78rem;
  font-weight: 900;
  letter-spacing: 0.02em;
  text-transform: uppercase;
}

/* ── Play button ─────────────────────────────────────── */
.play-btn {
  position: relative;
  z-index: 1;
  font-family: 'Nunito', sans-serif;
  font-size: 1.8rem;
  font-weight: 900;
  color: white;
  background: linear-gradient(135deg, #22C55E 0%, #16A34A 100%);
  border: none;
  border-radius: 9999px;
  padding: 1rem 3.2rem;
  cursor: pointer;
  touch-action: manipulation;
  box-shadow:
    0 6px 0 #15803d,
    0 10px 32px rgba(34,197,94,0.55),
    0 2px 8px rgba(0,0,0,0.12);
  animation: pulse-glow 2s ease-in-out infinite;
  transition: transform 0.12s ease, box-shadow 0.12s ease;
  text-shadow: 0 2px 4px rgba(0,0,0,0.2);
  letter-spacing: 0.01em;
}
.play-btn:active {
  transform: scale(0.95) translateY(3px);
  box-shadow: 0 2px 0 #15803d, 0 4px 16px rgba(34,197,94,0.3);
}

/* ── Keyframes ───────────────────────────────────────── */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-14px); }
}

@keyframes wiggle {
  0%, 100%  { transform: translateY(0px) rotate(-4deg); }
  25%       { transform: translateY(-7px) rotate(4deg); }
  50%       { transform: translateY(-14px) rotate(-3deg); }
  75%       { transform: translateY(-7px) rotate(3deg); }
}

@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

@keyframes pop-in {
  from { opacity: 0; transform: scale(0); }
  to   { opacity: 1; transform: scale(1); }
}

@keyframes pulse-glow {
  0%, 100% {
    transform: scale(1);
    box-shadow:
      0 6px 0 #15803d,
      0 10px 32px rgba(34,197,94,0.55),
      0 2px 8px rgba(0,0,0,0.12);
  }
  50% {
    transform: scale(1.05);
    box-shadow:
      0 6px 0 #15803d,
      0 14px 44px rgba(34,197,94,0.75),
      0 0 32px rgba(34,197,94,0.5),
      0 2px 8px rgba(0,0,0,0.12);
  }
}

@keyframes sparkle-float {
  0%, 100% { transform: translateY(0px) rotate(0deg) scale(1);   opacity: 0.8; }
  33%       { transform: translateY(-18px) rotate(120deg) scale(1.2); opacity: 1;   }
  66%       { transform: translateY(-8px) rotate(240deg) scale(0.9);  opacity: 0.6; }
}
</style>

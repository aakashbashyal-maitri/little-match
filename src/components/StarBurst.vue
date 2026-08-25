<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{ active: boolean; x: number; y: number }>()
const key = ref(0)

watch(() => props.active, v => { if (v) key.value++ })

const COLORS  = ['#FFD700','#FF69B4','#87CEEB','#98FB98','#DDA0DD','#FFA07A','#FFD700','#FF69B4','#87CEEB','#98FB98','#DDA0DD','#FFA07A','#FFF176','#FFAB40']
const CHARS   = ['⭐','✨','💫','🌟','⭐','✨','💫','🌟','⭐','✨','💫','🌟','⭐','✨']
const COUNT   = 14

const particles = Array.from({ length: COUNT }, (_, i) => {
  const angle = (i / COUNT) * Math.PI * 2
  const dist  = 65 + (i % 3) * 28
  return {
    id:    i,
    tx:    `${Math.cos(angle) * dist}px`,
    ty:    `${Math.sin(angle) * dist}px`,
    color: COLORS[i],
    char:  CHARS[i],
    size:  18 + (i % 5) * 5,
    delay: `${(i % 4) * 0.04}s`,
  }
})
</script>

<template>
  <Teleport to="body">
    <div
      v-if="active"
      :key="key"
      style="position:fixed;inset:0;pointer-events:none;z-index:9999;"
    >
      <span
        v-for="p in particles"
        :key="p.id"
        class="particle"
        :style="{
          position: 'fixed',
          left: `${x}px`,
          top:  `${y}px`,
          fontSize: `${p.size}px`,
          color: p.color,
          transform: 'translate(-50%,-50%)',
          animationDelay: p.delay,
          animationDuration: '0.85s',
          animationTimingFunction: 'ease-out',
          animationFillMode: 'forwards',
          animationName: 'particle-burst',
          '--tx': p.tx,
          '--ty': p.ty,
        } as any"
      >{{ p.char }}</span>
    </div>
  </Teleport>
</template>

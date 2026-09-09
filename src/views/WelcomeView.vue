<script setup lang="ts">
import { ref, computed } from 'vue'
import { useGameNavigation } from '../composables/useGameNavigation'
import { levels } from '../data/levels'
import ItemShape from '../components/ItemShape.vue'
const { g, start } = useGameNavigation()
const showAllLevels = ref(false)
const visibleLevels = computed(() => showAllLevels.value ? levels : levels.slice(Math.floor(g.levelIndex.value / 5) * 5, Math.floor(g.levelIndex.value / 5) * 5 + 5))
</script>
<template>
      <section class="welcome">
        <div class="eyebrow">LITTLE DISCOVERIES. BIG SMILES.</div>
        <h1>A little match.<br>A big <span>“I did it!”</span></h1>
        <p class="intro">Look at the shadow. Find its colorful friend.<br>A playful little adventure, one match at a time.</p>
        <div class="preview-row" aria-hidden="true"><div class="preview-card lavender"><ItemShape item-id="butterfly" :size="110" /></div><div class="preview-card mint"><ItemShape item-id="elephant" :size="140" /></div><div class="preview-card peach"><ItemShape item-id="rocket" :size="110" /></div></div>
        <button class="primary" @click="start">{{ g.hasSave.value ? 'Keep playing' : 'Let’s play' }} <span>→</span></button>
        <p class="small-note">{{ g.hasSave.value ? `Your adventure is waiting · World ${g.levelIndex.value + 1}` : 'Tap or drag · No timer · Just discovery' }}</p>
        <p class="small-note">{{ levels.length }} levels · {{ levels.reduce((sum, level) => sum + level.puzzles.length, 0) }} matches to discover</p>
        <div class="worlds"><div v-for="level in visibleLevels" :key="level.id" class="world" :class="{visited: g.hasSave.value && level.id <= g.levelIndex.value + 1}"><span>{{ level.emoji }}</span><strong>{{ level.name }}</strong><small>Level {{ level.id }} · {{ level.puzzles.length }} matches</small></div></div>
        <button class="text-button" :aria-expanded="showAllLevels" @click="showAllLevels = !showAllLevels">{{ showAllLevels ? 'Show current levels' : `Explore all ${levels.length} levels` }}</button>
      </section>
</template>

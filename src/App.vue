<script setup lang="ts">
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import { useGameNavigation } from './composables/useGameNavigation'
const { g, home, restart } = useGameNavigation()
const resetDialog = ref<HTMLDialogElement | null>(null)
function reset() { void restart(); resetDialog.value?.close() }
</script>
<template>
  <div class="app-shell">
    <header class="site-header">
      <button class="brand" aria-label="Little Match home" @click="home"><span class="brand-mark">✦</span> little match<span class="brand-dot">.</span></button>
      <div class="header-actions"><span class="save-note">{{ g.storageAvailable.value ? 'Progress saved on this device' : 'Progress cannot be saved on this device' }}</span><button class="quiet-button" :aria-pressed="g.muted.value" @click="g.muted.value = !g.muted.value">{{ g.muted.value ? '♫ Sound off' : '♫ Sound on' }}</button></div>
    </header>
    <main><RouterView /></main>
    <footer><span>Made for curious little minds</span><button v-if="g.hasSave.value" class="text-button" @click="resetDialog?.showModal()">Start fresh ↻</button><span v-else>Small steps. Happy learning.</span></footer>
    <dialog ref="resetDialog" @click="(e) => { if (e.target === resetDialog) resetDialog?.close() }"><h2>A brand-new adventure?</h2><p>This clears your matches and starts at World 1.</p><div class="dialog-actions"><button class="quiet-button" autofocus @click="resetDialog?.close()">Keep my progress</button><button class="primary" @click="reset">Start fresh</button></div></dialog>
  </div>
</template>

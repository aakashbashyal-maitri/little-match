import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createWebHashHistory } from 'vue-router'
import { useGame } from './composables/useGame'
import { gameKey } from './composables/gameContext'
import { createGameRouter } from './router'

const game = useGame()
// Hash history supports direct links on static hosts under /little-match/.
const router = createGameRouter(game, createWebHashHistory(import.meta.env.BASE_URL))
const app = createApp(App)
app.provide(gameKey, game)
app.use(router)
router.isReady().then(() => app.mount('#app'))

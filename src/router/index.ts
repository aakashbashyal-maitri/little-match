import { createRouter } from 'vue-router'
import type { RouterHistory } from 'vue-router'
import type { Game } from '../composables/gameContext'
import { phaseRoutes } from './gameRoutes'
import WelcomeView from '../views/WelcomeView.vue'
import PlayView from '../views/PlayView.vue'
import LevelCompleteView from '../views/LevelCompleteView.vue'
import AdventureCompleteView from '../views/AdventureCompleteView.vue'

export function createGameRouter(game: Game, history: RouterHistory) {
  const router = createRouter({
    history,
    routes: [
      { path: '/', name: 'welcome', component: WelcomeView },
      { path: '/play', name: 'playing', component: PlayView },
      { path: '/level-complete', name: 'levelComplete', component: LevelCompleteView },
      { path: '/complete', name: 'allDone', component: AdventureCompleteView },
      { path: '/:pathMatch(.*)*', redirect: '/' },
    ],
    scrollBehavior: () => ({ top: 0 }),
  })
  router.beforeEach(to => {
    if (to.name === 'welcome') {
      game.home()
      return true
    }
    // Refreshes and browser navigation must respect the saved game, including
    // completed levels. An old completion URL cannot skip unsolved puzzles.
    if (game.phase.value === 'welcome') game.startGame()
    const path = phaseRoutes[game.phase.value]
    if (to.path !== path) return { path, replace: true }
    return true
  })
  return router
}

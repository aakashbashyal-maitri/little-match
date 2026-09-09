import type { GamePhase } from '../types/game'

export const phaseRoutes: Record<GamePhase, string> = {
  welcome: '/', playing: '/play', levelComplete: '/level-complete', allDone: '/complete',
}

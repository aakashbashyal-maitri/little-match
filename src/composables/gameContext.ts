import { inject } from 'vue'
import type { InjectionKey } from 'vue'
import type { useGame } from './useGame'

export type Game = ReturnType<typeof useGame>
export const gameKey: InjectionKey<Game> = Symbol('game')

export function useGameContext() {
  const game = inject(gameKey)
  if (!game) throw new Error('Game state must be provided by the app')
  return game
}

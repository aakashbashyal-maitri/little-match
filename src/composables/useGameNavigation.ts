import { useRouter } from 'vue-router'
import { useGameContext } from './gameContext'
import { phaseRoutes } from '../router/gameRoutes'

export function useGameNavigation() {
  const g = useGameContext()
  const router = useRouter()
  const navigate = () => router.push(phaseRoutes[g.phase.value])
  return {
    g,
    home: () => router.push('/'),
    start: () => { g.startGame(); return navigate() },
    nextPuzzle: () => { g.nextPuzzle(); return navigate() },
    nextLevel: () => { g.nextLevel(); return navigate() },
    restart: () => { g.restartGame(); return navigate() },
  }
}

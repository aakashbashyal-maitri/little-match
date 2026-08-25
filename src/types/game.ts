export type ItemId =
  | 'circle' | 'square' | 'triangle' | 'star' | 'heart'
  | 'apple'  | 'carrot'  | 'banana'  | 'cake'  | 'cookie'
  | 'cat'    | 'dog'     | 'bird'    | 'fish'  | 'rabbit'

export interface Puzzle {
  targetId: ItemId
  choiceIds: ItemId[]
}

export interface Level {
  id: number
  name: string
  emoji: string
  accent: string
  zoneBg: string
  bgFrom: string
  bgTo: string
  puzzles: Puzzle[]
}

export type GamePhase = 'welcome' | 'playing' | 'levelComplete' | 'allDone'



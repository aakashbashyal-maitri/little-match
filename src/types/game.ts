export type ItemId =
  | 'circle' | 'square' | 'triangle' | 'star' | 'heart'
  | 'apple'  | 'carrot'  | 'banana'  | 'cake'  | 'cookie'
  | 'cat'    | 'dog'     | 'bird'    | 'fish'  | 'rabbit'
  | 'cow'    | 'elephant' | 'monkey' | 'chicken' | 'buffalo'
  | 'tiger'  | 'lion'    | 'panda'  | 'rhino' | 'kangaroo' | 'giraffe' | 'goat'
  | 'mango' | 'grapes' | 'orange' | 'watermelon' | 'strawberry' | 'pineapple' | 'pear'
  | 'cup' | 'comb' | 'book' | 'ball' | 'umbrella' | 'shoe' | 'clock' | 'bag' | 'key' | 'scissors'
  | 'car' | 'bus' | 'bike' | 'scooter' | 'cycle' | 'airplane' | 'boat' | 'train' | 'truck'

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



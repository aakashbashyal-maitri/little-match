import type { Level } from '../types/game'

export const levels: Level[] = [
  {
    id: 1,
    name: 'Animals',
    emoji: '🐄',
    accent: '#15803d',
    zoneBg: '#DCFCE7',
    bgFrom: '#f0fdf4',
    bgTo: '#dcfce7',
    puzzles: [
      { targetId: 'cow',      choiceIds: ['cow',      'elephant', 'monkey',  'chicken'] },
      { targetId: 'elephant', choiceIds: ['elephant', 'cow',      'buffalo', 'monkey']  },
      { targetId: 'monkey',   choiceIds: ['monkey',   'chicken',  'cow',     'elephant']},
      { targetId: 'chicken',  choiceIds: ['chicken',  'buffalo',  'elephant','monkey']  },
      { targetId: 'buffalo',  choiceIds: ['buffalo',  'cow',      'chicken', 'elephant']},
    ],
  },
  {
    id: 2,
    name: 'Food',
    emoji: '🍎',
    accent: '#D97706',
    zoneBg: '#FEF3C7',
    bgFrom: '#f0fdf4',
    bgTo: '#fefce8',
    puzzles: [
      { targetId: 'apple',  choiceIds: ['apple',  'carrot', 'banana', 'cake']   },
      { targetId: 'carrot', choiceIds: ['apple',  'carrot', 'banana', 'cookie'] },
      { targetId: 'banana', choiceIds: ['carrot', 'banana', 'apple',  'cake']   },
      { targetId: 'cake',   choiceIds: ['cake',   'cookie', 'apple',  'carrot'] },
      { targetId: 'cookie', choiceIds: ['cake',   'cookie', 'carrot', 'banana'] },
    ],
  },
  {
    id: 3,
    name: 'Shapes',
    emoji: '🔷',
    accent: '#7C3AED',
    zoneBg: '#EDE9FE',
    bgFrom: '#e0f2fe',
    bgTo: '#ede9fe',
    puzzles: [
      { targetId: 'circle',   choiceIds: ['circle',   'square',   'triangle', 'star']   },
      { targetId: 'square',   choiceIds: ['triangle', 'square',   'circle',   'heart']  },
      { targetId: 'triangle', choiceIds: ['square',   'triangle', 'circle',   'star']   },
      { targetId: 'star',     choiceIds: ['star',     'heart',    'circle',   'square'] },
      { targetId: 'heart',    choiceIds: ['star',     'circle',   'heart',    'triangle']},
    ],
  },
]


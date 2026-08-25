import type { Level } from '../types/game'

export const levels: Level[] = [
  {
    id: 1,
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
    name: 'Animals',
    emoji: '🐱',
    accent: '#B45309',
    zoneBg: '#FFF7ED',
    bgFrom: '#fff7ed',
    bgTo: '#fdf2f8',
    puzzles: [
      { targetId: 'cat',    choiceIds: ['cat',    'dog',    'bird',   'fish']   },
      { targetId: 'dog',    choiceIds: ['cat',    'dog',    'bird',   'rabbit'] },
      { targetId: 'bird',   choiceIds: ['cat',    'bird',   'dog',    'fish']   },
      { targetId: 'fish',   choiceIds: ['fish',   'cat',    'rabbit', 'dog']    },
      { targetId: 'rabbit', choiceIds: ['dog',    'fish',   'rabbit', 'cat']    },
    ],
  },
]


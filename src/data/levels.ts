import type { Level } from '../types/game'

export const levels: Level[] = [
  {
    id: 1,
    name: 'Easy',
    emoji: '⭐',
    accent: '#16a34a',
    zoneBg: '#DCFCE7',
    bgFrom: '#f0fdf4',
    bgTo: '#dcfce7',
    puzzles: [
      // Very distinctive silhouettes, cross-category distractors
      { targetId: 'elephant', choiceIds: ['airplane', 'elephant', 'umbrella', 'car'] },
      { targetId: 'giraffe',  choiceIds: ['cup',      'circle',   'giraffe',  'key'] },
      { targetId: 'airplane', choiceIds: ['elephant', 'airplane', 'key',      'watermelon'] },
      { targetId: 'umbrella', choiceIds: ['umbrella', 'banana',   'star',     'fish'] },
      { targetId: 'key',      choiceIds: ['key',      'elephant', 'circle',   'train'] },
      { targetId: 'star',     choiceIds: ['star',     'umbrella', 'giraffe',  'bus'] },
    ],
  },
  {
    id: 2,
    name: 'Fun',
    emoji: '🌟',
    accent: '#d97706',
    zoneBg: '#FEF3C7',
    bgFrom: '#fffbeb',
    bgTo: '#fef3c7',
    puzzles: [
      // Distinctive items, mostly cross-category distractors
      { targetId: 'kangaroo',  choiceIds: ['kangaroo',  'airplane',   'pineapple', 'scissors'] },
      { targetId: 'pineapple', choiceIds: ['apple',     'pineapple',  'bus',       'comb'] },
      { targetId: 'scissors',  choiceIds: ['scissors',  'watermelon', 'elephant',  'banana'] },
      { targetId: 'watermelon',choiceIds: ['watermelon','scissors',   'key',       'cat'] },
      { targetId: 'bus',       choiceIds: ['bus',       'kangaroo',   'pineapple', 'umbrella'] },
      { targetId: 'comb',      choiceIds: ['comb',      'fish',       'star',      'orange'] },
      { targetId: 'fish',      choiceIds: ['fish',      'comb',       'airplane',  'triangle'] },
    ],
  },
  {
    id: 3,
    name: 'Clever',
    emoji: '🏆',
    accent: '#7c3aed',
    zoneBg: '#EDE9FE',
    bgFrom: '#f5f3ff',
    bgTo: '#ede9fe',
    puzzles: [
      // Same-category distractors introduced
      { targetId: 'car',      choiceIds: ['car',      'bus',     'truck',    'bike'] },
      { targetId: 'apple',    choiceIds: ['orange',   'apple',   'pear',     'mango'] },
      { targetId: 'lion',     choiceIds: ['lion',     'tiger',   'panda',    'monkey'] },
      { targetId: 'umbrella', choiceIds: ['umbrella', 'clock',   'bag',      'ball'] },
      { targetId: 'train',    choiceIds: ['train',    'bus',     'car',      'airplane'] },
      { targetId: 'cookie',   choiceIds: ['cookie',   'cake',    'orange',   'ball'] },
      { targetId: 'book',     choiceIds: ['book',     'bag',     'elephant', 'banana'] },
      { targetId: 'triangle', choiceIds: ['triangle', 'square',  'star',     'heart'] },
    ],
  },
  {
    id: 4,
    name: 'Smart',
    emoji: '🧠',
    accent: '#c0392b',
    zoneBg: '#FFE4E6',
    bgFrom: '#fff1f2',
    bgTo: '#ffe4e6',
    puzzles: [
      // More same-category groupings
      { targetId: 'cat',     choiceIds: ['cat',     'dog',     'rabbit',  'monkey'] },
      { targetId: 'orange',  choiceIds: ['orange',  'apple',   'pear',    'mango'] },
      { targetId: 'scooter', choiceIds: ['scooter', 'bike',    'cycle',   'car'] },
      { targetId: 'cookie',  choiceIds: ['cookie',  'cake',    'ball',    'orange'] },
      { targetId: 'grapes',  choiceIds: ['grapes',  'strawberry', 'watermelon', 'pineapple'] },
      { targetId: 'rhino',   choiceIds: ['rhino',   'elephant', 'cow',    'buffalo'] },
      { targetId: 'shoe',    choiceIds: ['shoe',    'bag',     'book',    'clock'] },
    ],
  },
  {
    id: 5,
    name: 'Expert',
    emoji: '🎯',
    accent: '#0369a1',
    zoneBg: '#E0F2FE',
    bgFrom: '#f0f9ff',
    bgTo: '#e0f2fe',
    puzzles: [
      // Similar silhouettes across categories
      { targetId: 'cup',     choiceIds: ['cup',     'ball',    'orange',  'clock'] },
      { targetId: 'car',     choiceIds: ['car',     'bus',     'train',   'truck'] },
      { targetId: 'tiger',   choiceIds: ['tiger',   'lion',    'cat',     'dog'] },
      { targetId: 'key',     choiceIds: ['key',     'scissors','comb',    'umbrella'] },
      { targetId: 'pear',    choiceIds: ['pear',    'apple',   'orange',  'mango'] },
      { targetId: 'monkey',  choiceIds: ['monkey',  'panda',   'rabbit',  'cat'] },
      { targetId: 'bike',    choiceIds: ['bike',    'cycle',   'scooter', 'car'] },
      { targetId: 'heart',   choiceIds: ['heart',   'star',    'circle',  'triangle'] },
    ],
  },
]


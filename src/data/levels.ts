import type { Level, ItemId } from '../types/game'
const worlds: {name:string;emoji:string;targets:ItemId[];choices:number}[] = [
  {name:'First friends',emoji:'🌱',choices:3,targets:['elephant','butterfly','star','fish','rocket','rabbit','umbrella','giraffe']},
  {name:'Garden wonders',emoji:'🌼',choices:3,targets:['turtle','mushroom','snail','carrot','wateringcan','butterfly','bird','apple']},
  {name:'Off we go',emoji:'⛵',choices:4,targets:['airplane','boat','car','rocket','train','bus','truck','scooter']},
  {name:'Little treasures',emoji:'🍓',choices:4,targets:['icecream','pineapple','key','grapes','book','scissors','strawberry','heart']},
  {name:'Wild discoveries',emoji:'🦕',choices:4,targets:['dinosaur','kangaroo','elephant','rabbit','giraffe','fish','turtle','snail']},
]
const pool:ItemId[] = ['elephant','butterfly','rocket','fish','rabbit','star','umbrella','giraffe','turtle','mushroom','snail','carrot','wateringcan','bird','apple','boat','car','train','pineapple','key','book','scissors','icecream','dinosaur']
export const levels:Level[] = worlds.map((world,index) => ({
  id:index+1,name:world.name,emoji:world.emoji,accent:'#6b8b50',zoneBg:'#edf2e3',bgFrom:'#faf9f4',bgTo:'#edf2e3',
  puzzles:world.targets.map((targetId,i) => {
    const distractors = pool.filter(id => id !== targetId)
    const start = (i*5+index*7)%distractors.length
    return {targetId,choiceIds:[targetId,...Array.from({length:world.choices-1},(_,j) => distractors[(start+j*3)%distractors.length]!)]}
  }),
}))

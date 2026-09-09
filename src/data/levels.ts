import type { Level, ItemId } from '../types/game'
import { everydayArt } from './everydayArt'
const worlds: {name:string;emoji:string;targets:ItemId[];choices:number}[] = [
  {name:'First friends',emoji:'🌱',choices:3,targets:['elephant','butterfly','star','fish','rocket','rabbit','umbrella','giraffe']},
  {name:'Garden wonders',emoji:'🌼',choices:3,targets:['turtle','mushroom','snail','carrot','wateringcan','butterfly','bird','apple']},
  {name:'Off we go',emoji:'⛵',choices:4,targets:['airplane','boat','car','rocket','train','bus','truck','scooter']},
  {name:'Little treasures',emoji:'🍓',choices:4,targets:['icecream','pineapple','key','grapes','book','scissors','strawberry','heart']},
  {name:'Wild discoveries',emoji:'🦕',choices:4,targets:['dinosaur','kangaroo','elephant','rabbit','giraffe','fish','turtle','snail']},
]
const pool:ItemId[] = ['elephant','butterfly','rocket','fish','rabbit','star','umbrella','giraffe','turtle','mushroom','snail','carrot','wateringcan','bird','apple','boat','car','train','pineapple','key','book','scissors','icecream','dinosaur']
const themes: {name:string;emoji:string;targets:ItemId[]}[] = [
  {name:'Kitchen helpers',emoji:'🥄',targets:['spoon','fork','teapot','pan','rollingpin']},
  {name:'Our cozy home',emoji:'🏠',targets:['chair','table','bed','lamp','sofa']},
  {name:'Getting dressed',emoji:'🧦',targets:['tshirt','trousers','sock','mitten','hat']},
  {name:'Create and discover',emoji:'🎨',targets:['pencil','ruler','paintbrush','palette','magnifier']},
  {name:'Handy helpers',emoji:'🔨',targets:['hammer','wrench','screwdriver','shovel','broom']},
  {name:'Wash and brush',emoji:'🛁',targets:['toothbrush','soap','hairdryer','mirror','bathtub']},
  {name:'Music time',emoji:'🎵',targets:['guitar','drum','trumpet','violin','bell']},
  {name:'Around the house',emoji:'📷',targets:['camera','telephone','television','fan','flashlight']},
  {name:'Garden helpers',emoji:'🪴',targets:['bucket','flowerpot','leaf','wheelbarrow','rake']},
  {name:'At the market',emoji:'🍋',targets:['bread','egg','cheese','lemon','broccoli']},
]
const rounds = ['Explore','Practice','Discover','Mix and match','Little expert']
for (let round = 0; round < rounds.length; round++) {
  themes.forEach((theme, index) => {
    const neighbors = themes[(index + round + 1) % themes.length]!.targets
    worlds.push({
      name:`${theme.name} · ${rounds[round]}`,emoji:theme.emoji,choices:round === 0 ? 3 : 4,
      targets:[...theme.targets.slice(round),...theme.targets.slice(0,round),
        ...Array.from({length:3},(_,i) => neighbors[(round+i)%neighbors.length]!)],
    })
  })
}
const expandedPool: ItemId[] = [...pool, ...Object.keys(everydayArt) as ItemId[]]
export const levels:Level[] = worlds.map((world,index) => ({
  id:index+1,name:world.name,emoji:world.emoji,accent:'#6b8b50',zoneBg:'#edf2e3',bgFrom:'#faf9f4',bgTo:'#edf2e3',
  puzzles:world.targets.map((targetId,i) => {
    const distractors = (index < 5 ? pool : expandedPool).filter(id => id !== targetId)
    const start = (i*5+index*7)%distractors.length
    return {targetId,choiceIds:[targetId,...Array.from({length:world.choices-1},(_,j) => distractors[(start+j*3)%distractors.length]!)]}
  }),
}))

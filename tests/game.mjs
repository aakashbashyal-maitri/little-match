import assert from 'node:assert/strict'
import fs from 'node:fs'
import ts from 'typescript'
import * as Vue from 'vue'
import { createRouter, createMemoryHistory } from 'vue-router'
function moduleAt(path, deps = {}) {
 const source = fs.readFileSync(path,'utf8').replace(/^import .*$/gm,'')
 const js = ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText
 const exports = {}
 new Function('exports', ...Object.keys(deps), js)(exports,...Object.values(deps))
 return exports
}
const {everydayArt} = moduleAt('src/data/everydayArt.ts')
const {levels} = moduleAt('src/data/levels.ts',{everydayArt})
const {refreshedArt} = moduleAt('src/data/refreshedArt.ts')
const {svgContent} = moduleAt('src/data/svgs.ts',{refreshedArt,everydayArt})
for (const level of levels) for (const puzzle of level.puzzles) {
 assert.equal(new Set(puzzle.choiceIds).size,puzzle.choiceIds.length)
 assert.equal(puzzle.choiceIds.filter(id=>id===puzzle.targetId).length,1)
 for (const id of puzzle.choiceIds) assert.ok(svgContent[id],`Missing ${id}`)
}
assert.equal(levels.length,55)
assert.equal(Object.keys(everydayArt).length,50)
assert.equal(levels.flatMap(l=>l.puzzles).length,440)
const targets = new Set(levels.flatMap(l=>l.puzzles.map(p=>p.targetId)))
for (const id of Object.keys(everydayArt)) assert.ok(targets.has(id),`Unused new object: ${id}`)
assert.equal(new Set(levels.map(l=>l.name)).size,55)
const store = new Map()
globalThis.localStorage = {getItem:key=>store.get(key) ?? null,setItem:(key,value)=>store.set(key,value)}
const {useGame} = moduleAt('src/composables/useGame.ts',{...Vue,levels})
let g = useGame()
assert.equal(g.hasSave.value,false)
g.startGame();g.solved.value=true;await Vue.nextTick()
g = useGame();assert.equal(g.hasSave.value,true);g.startGame();assert.equal(g.solved.value,true)
g.nextPuzzle();await Vue.nextTick();assert.equal(g.puzzleIndex.value,1)
g.home();await Vue.nextTick();g=useGame();g.startGame();assert.equal(g.puzzleIndex.value,1)
g.muted.value=true;await Vue.nextTick();g=useGame();assert.equal(g.muted.value,true)
g.startGame()
for(let i=1;i<8;i++) g.nextPuzzle()
await Vue.nextTick();assert.equal(g.phase.value,'levelComplete')
g=useGame();g.startGame();assert.equal(g.phase.value,'levelComplete');g.nextLevel();assert.equal(g.levelIndex.value,1)
g.restartGame();await Vue.nextTick();g=useGame();g.startGame();assert.equal(g.levelIndex.value,0);assert.equal(g.puzzleIndex.value,0);assert.equal(g.solved.value,false)
for(const level of levels){for(const puzzle of level.puzzles)g.nextPuzzle();g.nextLevel()}
await Vue.nextTick();g=useGame();g.startGame();assert.equal(g.phase.value,'allDone')
store.set('little-match:progress:v2',JSON.stringify({version:2,level:4,puzzle:7,phase:'allDone',solved:true,muted:true}))
g=useGame();g.startGame();assert.equal(g.levelIndex.value,5);assert.equal(g.puzzleIndex.value,0);assert.equal(g.phase.value,'playing');assert.equal(g.solved.value,false);assert.equal(g.muted.value,true)
for(const value of ['{broken',JSON.stringify({version:2,level:-1,puzzle:0,phase:'playing'}),JSON.stringify({version:2,level:0,puzzle:999,phase:'playing'})]){
 store.set('little-match:progress:v2',value);g=useGame();assert.equal(g.hasSave.value,false)
}
globalThis.localStorage={getItem(){throw Error('denied')},setItem(){throw Error('quota')}}
g=useGame();g.startGame();g.solved.value=true;await Vue.nextTick();assert.equal(g.storageAvailable.value,false);assert.equal(g.solved.value,true)
console.log('Passed: 55 levels, 440 puzzles, 50 new objects, artwork coverage, progress, legacy completion migration, reset and storage handling.')

for (const [id, art] of Object.entries({...refreshedArt,...everydayArt})) {
  for (const [,d] of art.matchAll(/ d="([^"]+)"/g)) {
    const segments = [...d.matchAll(/([a-zA-Z])([^a-zA-Z]*)/g)]
    const sizes = {M:2,L:2,H:1,V:1,C:6,S:4,Q:4,T:2,A:7,Z:0}
    for (const [,command,args] of segments) {
      const size = sizes[command.toUpperCase()]
      assert.notEqual(size,undefined,`${id}: unknown path command ${command}`)
      const nums = args.trim().split(/[\s,]+/).filter(Boolean)
      assert.ok(nums.every(n=>Number.isFinite(Number(n))),`${id}: invalid path number`)
      assert.ok(size === 0 ? nums.length === 0 : nums.length >= size && nums.length % size === 0,`${id}: incomplete ${command}`)
    }
  }
  for (const [,hex] of art.matchAll(/(?:fill|stroke)="(#[^"]+)"/g)) assert.match(hex,/^#[0-9a-f]{6}$/i,`${id}: invalid color`)
}
console.log('Passed: redesigned SVG path commands and colors.')

// Exercise the real navigation guards without requiring a browser or rendering SFCs.
const {phaseRoutes} = moduleAt('src/router/gameRoutes.ts')
const {createGameRouter} = moduleAt('src/router/index.ts', {
 createRouter, phaseRoutes, WelcomeView:{}, PlayView:{}, LevelCompleteView:{}, AdventureCompleteView:{},
})
store.clear()
globalThis.localStorage = {getItem:key=>store.get(key) ?? null,setItem:(key,value)=>store.set(key,value)}
g=useGame()
const router=createGameRouter(g,createMemoryHistory())
await router.push('/')
assert.equal(g.hasSave.value,false)
await router.push('/complete')
assert.equal(router.currentRoute.value.path,'/play')
assert.equal(g.levelIndex.value,0)
g.solved.value=true;g.nextPuzzle();await Vue.nextTick()
await router.push('/')
assert.equal(g.phase.value,'welcome')
await router.push('/play')
assert.equal(g.puzzleIndex.value,1)
for(let i=1;i<8;i++)g.nextPuzzle()
await router.push('/level-complete')
assert.equal(router.currentRoute.value.path,'/level-complete')
await Vue.nextTick()
const reloaded=useGame()
const reloadRouter=createGameRouter(reloaded,createMemoryHistory())
await reloadRouter.push('/play')
assert.equal(reloadRouter.currentRoute.value.path,'/level-complete')
reloaded.nextLevel();await reloadRouter.push('/play')
await reloadRouter.push('/level-complete')
assert.equal(reloadRouter.currentRoute.value.path,'/play')
assert.equal(reloaded.levelIndex.value,1)
await reloadRouter.push('/unknown')
assert.equal(reloadRouter.currentRoute.value.path,'/')
assert.equal(reloaded.phase.value,'welcome')
reloaded.restartGame();await reloadRouter.push('/play')
assert.equal(reloaded.levelIndex.value,0)
assert.equal(reloaded.puzzleIndex.value,0)
for(const level of levels){for(const puzzle of level.puzzles)reloaded.nextPuzzle();reloaded.nextLevel()}
await reloadRouter.push('/complete')
assert.equal(reloadRouter.currentRoute.value.path,'/complete')
await Vue.nextTick()
const finished=useGame()
const finishedRouter=createGameRouter(finished,createMemoryHistory())
await finishedRouter.push('/complete')
assert.equal(finished.phase.value,'allDone')
finished.restartGame();await finishedRouter.push('/play')
assert.equal(finishedRouter.currentRoute.value.path,'/play')
console.log('Passed: route guards, direct links, resume, refresh at completion, stale URLs, fallback, restart and trophy route.')

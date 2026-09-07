import assert from 'node:assert/strict'
import fs from 'node:fs'
import ts from 'typescript'
import * as Vue from 'vue'
function moduleAt(path, deps = {}) {
 const source = fs.readFileSync(path,'utf8').replace(/^import .*$/gm,'')
 const js = ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText
 const exports = {}
 new Function('exports', ...Object.keys(deps), js)(exports,...Object.values(deps))
 return exports
}
const {levels} = moduleAt('src/data/levels.ts')
const {refreshedArt} = moduleAt('src/data/refreshedArt.ts')
const {svgContent} = moduleAt('src/data/svgs.ts',{refreshedArt})
for (const level of levels) for (const puzzle of level.puzzles) {
 assert.equal(new Set(puzzle.choiceIds).size,puzzle.choiceIds.length)
 assert.equal(puzzle.choiceIds.filter(id=>id===puzzle.targetId).length,1)
 for (const id of puzzle.choiceIds) assert.ok(svgContent[id],`Missing ${id}`)
}
assert.equal(levels.flatMap(l=>l.puzzles).length,40)
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
for(let world=0;world<5;world++){for(let p=0;p<8;p++)g.nextPuzzle();g.nextLevel()}
await Vue.nextTick();g=useGame();g.startGame();assert.equal(g.phase.value,'allDone')
for(const value of ['{broken',JSON.stringify({version:2,level:-1,puzzle:0,phase:'playing'}),JSON.stringify({version:2,level:0,puzzle:999,phase:'playing'})]){
 store.set('little-match:progress:v2',value);g=useGame();assert.equal(g.hasSave.value,false)
}
globalThis.localStorage={getItem(){throw Error('denied')},setItem(){throw Error('quota')}}
g=useGame();g.startGame();g.solved.value=true;await Vue.nextTick();assert.equal(g.storageAvailable.value,false);assert.equal(g.solved.value,true)
console.log('Passed: 40 puzzle definitions, artwork coverage, saved matches, resume, sound preference, world completion, all-done, reset, invalid saves and unavailable storage.')

for (const [id, art] of Object.entries(refreshedArt)) {
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

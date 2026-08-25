let ctx: AudioContext | null = null

function getCtx() {
  if (!ctx) ctx = new AudioContext()
  if (ctx.state === 'suspended') ctx.resume()
  return ctx
}

function tone(freq: number, dur: number, delay = 0, vol = 0.25, type: OscillatorType = 'sine') {
  const c = getCtx()
  const osc = c.createOscillator()
  const gain = c.createGain()
  osc.connect(gain); gain.connect(c.destination)
  osc.type = type
  osc.frequency.setValueAtTime(freq, c.currentTime + delay)
  gain.gain.setValueAtTime(vol, c.currentTime + delay)
  gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + delay + dur)
  osc.start(c.currentTime + delay)
  osc.stop(c.currentTime + delay + dur)
}

export function useSound() {
  return {
    playPickup()  { tone(660, 0.1, 0, 0.15) },
    playSuccess() {
      tone(523, 0.18, 0,    0.28)
      tone(659, 0.18, 0.12, 0.28)
      tone(784, 0.18, 0.24, 0.28)
      tone(1047,0.40, 0.36, 0.30)
    },
    playWrong() {
      tone(220, 0.12, 0,   0.12)
      tone(196, 0.18, 0.1, 0.08)
    },
    playLevelComplete() {
      const notes   = [523, 659, 784, 659, 784, 1047, 1047]
      const delays  = [  0, .12, .24, .38, .52,  .66,  .80]
      notes.forEach((f, i) => tone(f, 0.28, delays[i], 0.28))
    },
  }
}

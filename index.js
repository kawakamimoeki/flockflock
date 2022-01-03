import p5 from 'p5'
import { Fish } from './lib/fish'
import { Predator } from './lib/predator'
import { Bait } from './lib/bait'

class Baitball {
  constructor (selector, opts = {}) {
    this.element = document.querySelector(selector)
    this.opts = Object.assign(this.defaultOpts(), opts)
    new p5(this.sketch.bind(this), this.element)
  }

  defaultOpts () {
    return {
      n: 200,
      fps: 60,
      bait: true,
      predator: true
    }
  }

  sketch (p) {
    p.setup = () => {
      if (this.opts.predator) p.noCursor()
      const canvas = p.createCanvas(this.element.offsetWidth, this.element.offsetHeight)
      p.frameRate(this.fps)
      p.fill(255)
      p.stroke(163, 191, 196)
    
      if (this.opts.bait) {
        p.bait = new Bait(p, p.createVector(p.random(0, p.width), p.random(0, p.height)))
      }
      if (this.opts.predator) {
        p.predator = new Predator(p) 
      }
      p.fishes = []
      for (let i = 0; i < this.opts.n; i++) {
        p.fishes.push(new Fish(p, p.createVector(p.width / 2 + p.width / 4 * p.sin(i * p.TWO_PI / this.opts.n), p.height / 2 + p.height / 4 * p.cos(i * p.TWO_PI / this.opts.n))))
      }
    }
    
    p.draw = () => {
      p.background(255)
      p.fishes.forEach((fish) => fish.update(p.fishes, p.predator, p.bait))
      if (p.predator) {
        p.predator.update()
      }
    
      if (p.bait) {
        if (p.frameCount % (p.bait.lifespan * this.opts.fps) === 0) {
          p.bait = new Bait(p, p.createVector(p.random(0, p.width), p.random(0, p.height)))
        } else {
          p.bait.update()
        }
      }
    }
  }
}

export { Baitball }

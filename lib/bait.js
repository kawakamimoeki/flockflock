class Bait {
  constructor (p, vector) {
    this.p = p
    this.position = vector
    this.size = 10
    this.lifespan = 5
  }

  update () {
    this.p.fill(255, 0, 0)
    this.p.circle(this.position.x, this.position.y, this.size)
  }
}

export { Bait }

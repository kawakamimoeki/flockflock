class Predator {
  constructor (p) {
    this.size = 50
    this.p = p
  }

  update () {
    this.p.fill(255)
    this.p.circle(this.position().x, this.position().y, this.size)
  }

  position () {
    return this.p.createVector(this.p.mouseX, this.p.mouseY)
  }
}

export { Predator }

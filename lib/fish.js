import p5 from 'p5'

class Fish {
  constructor (p, vector) {
    this.p = p
    this.acceleration = this.p.createVector(0, 0)
    this.velocity = this.p.createVector(this.p.random(-1, 1), this.p.random(-1, 1))
    this.position = vector
    this.size = 10
    this.maxspeed = 5
    this.maxforce = 0.05
    this.tactile = 30
    this.view = 50
    this.worry = 200
    this.smell = 300
  }

  update (friends, predator, bait) {
    const force = this.p.createVector(0, 0)
    const diffs = this.p.createVector(0, 0)
    const alignPoint = this.p.createVector(0, 0)
    const cohesionPoint = this.p.createVector(0, 0)
    let neighbors = 0
    let touchers = 0

    friends.forEach((friend) => {
      const distance = p5.Vector.dist(friend.position, this.position)

      if (0 < distance && distance < this.tactile) {
        const diff = p5.Vector.sub(this.position, friend.position)
        diff.div(distance)
        diffs.add(diff)
        touchers++
      } else if (distance < this.view) {
        alignPoint.add(friend.velocity)
        cohesionPoint.add(friend.position)
        neighbors++
      }
    })

    if (touchers > 0) {
      const separate = diffs.div(touchers)
      if (separate.mag() > 0) {
        separate.normalize()
        separate.mult(this.maxspeed)
        separate.sub(this.velocity)
        force.add(separate)
      }
    }

    if (neighbors > 0) {
      alignPoint.div(neighbors)
      alignPoint.normalize()
      alignPoint.mult(this.maxspeed)
      force.add(p5.Vector.sub(alignPoint, this.velocity))

      cohesionPoint.div(neighbors)
      const desired = p5.Vector.sub(cohesionPoint, this.position)
      desired.normalize()
      desired.mult(this.maxspeed)
      force.add(p5.Vector.sub(desired, this.velocity))
    }

    force.limit(this.maxforce)
    this.acceleration.add(force)

    // Escape from predator!!
    if (predator) {
      const predatorDistance = p5.Vector.dist(predator.position(), this.position)
      if (0 < predatorDistance && predatorDistance < this.worry) {
        const diff = p5.Vector.sub(this.position, predator.position())
        diff.div(predatorDistance)
        diff.mult(this.maxspeed)
        diff.sub(this.velocity)
        diff.limit(this.maxforce * 5)
        this.acceleration.add(diff)
      }
    }

    // Eat bait!
    if (bait) {
      const baitDistance = p5.Vector.dist(bait.position, this.position)
      if (baitDistance < this.smell) {
        const baitPosition = bait.position
        const desired = p5.Vector.sub(baitPosition, this.position)
        desired.normalize()
        desired.mult(this.maxspeed)
        const force = p5.Vector.sub(desired, this.velocity)
        force.limit(this.maxforce)
        this.acceleration.add(force)
      }
    }

    this.velocity.add(this.acceleration)
    this.velocity.limit(this.maxspeed)
    this.position.add(this.velocity)
    this.acceleration.mult(0)

    this.wraparound(this.position)

    this.p.fill(255)
    this.p.push()
    this.p.translate(this.position.x, this.position.y)
    this.p.rotate(this.velocity.heading() + this.p.radians(90))
    this.p.triangle(0, -this.size, -this.size / 2, this.size, this.size / 2, this.size)
    this.p.pop()
  }

  wraparound (position) {
    if (position.x > this.p.width) position.x = position.x - this.p.width
    if (position.x < 0) position.x = this.p.width - position.x
    if (position.y > this.p.height) position.y = position.y - this.p.height
    if (position.y < 0) position.y = this.p.height - position.y
    return this.p.createVector(position.x, position.y)
  }
}

export { Fish }

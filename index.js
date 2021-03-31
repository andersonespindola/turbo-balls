const Ball = function (screenX, screenY, radius) {
  this.color =
    'rgb(' +
    Math.floor(Math.random() * 256) +
    ',' +
    Math.floor(Math.random() * 256) +
    ',' +
    Math.floor(Math.random() * 256) +
    ')'
  this.direction = Math.random() * Math.PI * 2
  this.radius = radius
  this.speed = Math.random() * 3 + 1
  this.screenX = screenX
  this.screenY = screenY
}

Ball.prototype = {
  updatePosition: function (width, height) {
    this.screenX += Math.cos(this.direction) * this.speed
    this.screenY += Math.sin(this.direction) * this.speed

    if (this.screenX - this.radius < 0) {
      this.screenX = this.radius

      this.direction = Math.atan2(
        Math.sin(this.direction),
        Math.cos(this.direction) * -1
      )
    } else if (this.screenX + this.radius > width) {
      this.screenX = width - this.radius

      this.direction = Math.atan2(
        Math.sin(this.direction),
        Math.cos(this.direction) * -1
      )
    }

    if (this.screenY - this.radius < 0) {
      this.screenY = this.radius

      this.direction = Math.atan2(
        Math.sin(this.direction) * -1,
        Math.cos(this.direction)
      )
    } else if (this.screenY + this.radius > height) {
      this.screenY = height - this.radius

      this.direction = Math.atan2(
        Math.sin(this.direction) * -1,
        Math.cos(this.direction)
      )
    }
  }
}

const context = document.querySelector('canvas').getContext('2d')

const balls = new Array()

const screenX = document.documentElement.clientWidth * 0.5
const screenY = document.documentElement.clientHeight * 0.5

function loop() {
  window.requestAnimationFrame(loop)
  const height = document.documentElement.clientHeight
  const width = document.documentElement.clientWidth

  context.canvas.height = height
  context.canvas.width = width

  balls.forEach(ball => {
    context.speed = ball.speed
    context.fillStyle = ball.color
    context.beginPath()
    context.arc(ball.screenX, ball.screenY, ball.radius, 0, Math.PI * 2)
    context.fill()

    ball.updatePosition(width, height)
  })
}

const generateOneBall = () => {
  const newBall = new Ball(
    screenX,
    screenY,
    Math.floor(Math.random() * 10 + 20)
  )

  balls.push(newBall)
}

const generateManyBalls = () => {
  const numberBallsToGenerate = 10
  new Array(numberBallsToGenerate).fill('').forEach(_ => {
    balls.push(new Ball(screenX, screenY, Math.floor(Math.random() * 10 + 20)))
  })
}

const turboMode = () => {
  const speedMultiply = 5
  new Array(speedMultiply).fill('').forEach(_ => loop())
}

loop()

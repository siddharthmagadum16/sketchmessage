window.onload = function () {
  let socket = io()

  const mobile =
    !!navigator.userAgent.match(/iphone|ipad|android|blackberry/gi) || false

  if (mobile) {
    document.querySelector('.error').style.display = 'flex'
    document.querySelector('.drawingBoardContainer').style.display = 'none'
  }

  document.querySelector('canvas').width = window.innerWidth - 100
  document.querySelector('canvas').height = window.innerHeight - 100

  let canvas = document.getElementById('drawing')
  let ctx = canvas.getContext('2d')

  let mouseDown = false

  let thicknessSlider = document.querySelector('.slider')

  const c = {
    x: 0,
    y: 0,
    lastX: 0,
    lastY: 0,
  }

  const draw = (c) => {
    ctx.beginPath()
    ctx.strokeStyle = c.color
    ctx.lineWidth = c.thickness
    ctx.lineJoin = 'round'
    ctx.lineCap = 'round'
    ctx.moveTo(c.x, c.y)
    ctx.lineTo(c.lastX, c.lastY)
    ctx.stroke()
    ctx.closePath()
  }

  canvas.addEventListener('mousedown', (e) => {
    mouseDown = true
    c.lastX = e.offsetX
    c.lastY = e.offsetY
  })
  canvas.addEventListener('mouseup', (e) => {
    mouseDown = false
  })

  socket.emit('mouse', c)

  socket.emit('mouse', c)
  socket.on('mouse', (data) => {
    draw(data)
  })
  const sketch = (e) => {
    if (!mouseDown) return

    c.x = e.offsetX
    c.y = e.offsetY

    c.color = localStorage.getItem('colour')
    c.thickness = parseInt(thicknessSlider.value)

    socket.emit('mouse', c)
    socket.on('mouse', function (data) {
      draw(data)
    })

    let rect = canvas.getBoundingClientRect()
    let x = e.clientX - rect.left
    let y = e.clientY - rect.top

    c.lastX = x
    c.lastY = y
  }

  canvas.addEventListener('mousemove', sketch)

  document.querySelector('.clear').addEventListener('click', () => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  })
}

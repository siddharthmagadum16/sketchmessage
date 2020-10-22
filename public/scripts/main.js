window.onload = function() {
      let socket = io();

      let canvasContainer = document.getElementById('drawingBoard')

      let canvas = document.getElementById('drawing');
      let ctx = canvas.getContext('2d');

      let thickness = document.getElementById('range-slider');

      let width = canvas.width = window.innerWidth-40;
      let height = canvas.height = window.innerHeight-230;
      canvasContainer.style.width = width + 'px';
      canvasContainer.style.height = height + 'px';

      let mouseDown = false;

      const c = {
        x: 0,
        y: 0,
        lastX: 0,
        lastY:0
      };

      function draw(c) {
        ctx.beginPath();
        ctx.strokeStyle = c.color;
        ctx.lineWidth = c.thickness;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.moveTo(c.x, c.y);
        ctx.lineTo(c.lastX, c.lastY);
        ctx.stroke();    
        ctx.closePath();
      }

      canvas.addEventListener('mousedown', function(e) {
        mouseDown = true;
        c.lastX = e.offsetX;
        c.lastY = e.offsetY;
      })
      canvas.addEventListener('mouseup', function(e) {
        mouseDown = false;
      });


      let cBounds = canvas.getBoundingClientRect();
      socket.emit('mouse', c );

      let fakeE = {
        offsetX : 0,
        offsetY : 0,
        touches : [{clientX : 0,clientY : 0}]
      }
      socket.emit('mouse', c );
      socket.on('mouse', function(data) {
        draw(data);
      });
      function sketch(e) {
        if (!mouseDown) return;

        c.x = e.offsetX;
        c.y = e.offsetY;

        c.color = color.value;
        c.thickness = parseInt(thickness.value);
        
        socket.emit('mouse', c );
        socket.on('mouse', function(data) {
          draw(data);
        });

        c.lastX = c.x;
        c.lastY = c.y;
      }
      canvas.addEventListener('mousemove', sketch);
    }
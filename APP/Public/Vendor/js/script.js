document.addEventListener('DOMContentLoaded', () => {
  const socket = io.connect();

  const tela = document.querySelector('#canvasDraw');
  const context = tela.getContext('2d');

  const pen = {
    active: false,
    move: false,
    pos: { x: 0, y: 0 },
    posPrevious: null,
  };

  // Defini o tamanho do canvas
  tela.width = 1378;
  tela.height = 671;

  const drawLine = (line) => {
    context.beginPath();
    context.moveTo(line.posPrevious.x, line.posPrevious.y);
    context.lineTo(line.pos.x, line.pos.y);

    context.stroke();
  };

  tela.onmousedown = (event) => { pen.active = true; };
  tela.onmouseup = (event) => { pen.active = false; };

  tela.mouseleave = (event) => { pen.active = true; };

  tela.onmousemove = (event) => {
    pen.pos.x = event.offsetX;
    pen.pos.y = event.offsetY;
    pen.move = true;
  };

  socket.on('draw', (line) => {
    drawLine(line);
  });

  const cycle = () => {
    if (pen.active && pen.move && pen.posPrevious) {
      socket.emit('draw', { pos: pen.pos, posPrevious: pen.posPrevious });
      // drawLine({ pos: pen.pos, posPrevious: pen.posPrevious });
      pen.move = false;
    }

    pen.posPrevious = { x: pen.pos.x, y: pen.pos.y };

    setTimeout(cycle, 10);
  };

  // Limpar o Canvas

  cycle();
  ClearDraw();
});

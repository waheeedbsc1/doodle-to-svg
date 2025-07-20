const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
ctx.lineWidth = 2;
ctx.lineCap = 'round';
ctx.strokeStyle = '#000';

let drawing = false;

canvas.addEventListener('mousedown', start);
canvas.addEventListener('touchstart', start);

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('touchmove', draw);

canvas.addEventListener('mouseup', end);
canvas.addEventListener('mouseleave', end);
canvas.addEventListener('touchend', end);

function getPos(e) {
  if (e.touches) {
    return {
      x: e.touches[0].clientX - canvas.getBoundingClientRect().left,
      y: e.touches[0].clientY - canvas.getBoundingClientRect().top
    };
  } else {
    return {
      x: e.clientX - canvas.getBoundingClientRect().left,
      y: e.clientY - canvas.getBoundingClientRect().top
    };
  }
}

function start(e) {
  drawing = true;
  ctx.beginPath();
  const pos = getPos(e);
  ctx.moveTo(pos.x, pos.y);
  e.preventDefault();
}

function draw(e) {
  if (!drawing) return;
  const pos = getPos(e);
  ctx.lineTo(pos.x, pos.y);
  ctx.stroke();
  e.preventDefault();
}

function end(e) {
  drawing = false;
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function downloadSVG() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${canvas.width}" height="${canvas.height}">
    <foreignObject width="100%" height="100%">
      <canvas xmlns="http://www.w3.org/1999/xhtml">${canvas.toDataURL()}</canvas>
    </foreignObject>
  </svg>`;
  const blob = new Blob([svg], {type: 'image/svg+xml'});
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'doodle.svg';
  link.click();
}

function downloadPNG() {
  const link = document.createElement('a');
  link.download = 'doodle.png';
  link.href = canvas.toDataURL();
  link.click();
}

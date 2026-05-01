const canvas = document.getElementById("flowCanvas");
const ctx = canvas.getContext("2d");

const labels = [
  "Form",
  "Call",
  "Email",
  "Lead log",
  "Alert",
  "First reply",
  "Follow-up",
  "Booked",
];

let width = 0;
let height = 0;
let nodes = [];
let frame = 0;

function resize() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  width = canvas.clientWidth;
  height = canvas.clientHeight;
  canvas.width = Math.floor(width * dpr);
  canvas.height = Math.floor(height * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  const cols = width < 760 ? 2 : 4;
  const rows = Math.ceil(labels.length / cols);
  const xGap = width / (cols + 1);
  const yStart = height * 0.24;
  const yGap = Math.min(145, (height * 0.55) / Math.max(rows - 1, 1));

  nodes = labels.map((label, index) => {
    const col = index % cols;
    const row = Math.floor(index / cols);
    return {
      label,
      x: xGap * (col + 1) + (row % 2) * 28,
      y: yStart + row * yGap + (col % 2) * 18,
      phase: index * 0.7,
    };
  });
}

function roundedRect(x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function drawLine(a, b, progress) {
  ctx.strokeStyle = "rgba(142, 215, 206, 0.26)";
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(a.x, a.y);
  ctx.lineTo(b.x, b.y);
  ctx.stroke();

  const x = a.x + (b.x - a.x) * progress;
  const y = a.y + (b.y - a.y) * progress;
  ctx.fillStyle = "rgba(239, 246, 241, 0.85)";
  ctx.beginPath();
  ctx.arc(x, y, 3.2, 0, Math.PI * 2);
  ctx.fill();
}

function drawNode(node, index) {
  const pulse = (Math.sin(frame * 0.025 + node.phase) + 1) / 2;
  const w = 132;
  const h = 48;
  const x = node.x - w / 2;
  const y = node.y - h / 2;

  ctx.fillStyle = `rgba(255, 255, 255, ${0.08 + pulse * 0.05})`;
  ctx.strokeStyle = index > 2 ? "rgba(142, 215, 206, 0.48)" : "rgba(255, 255, 255, 0.24)";
  ctx.lineWidth = 1;
  roundedRect(x, y, w, h, 8);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "rgba(255, 255, 255, 0.86)";
  ctx.font = "800 13px Inter, system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(node.label, node.x, node.y);
}

function drawGrid() {
  ctx.strokeStyle = "rgba(255, 255, 255, 0.055)";
  ctx.lineWidth = 1;
  const step = 56;
  const offset = (frame * 0.18) % step;
  for (let x = -step + offset; x < width + step; x += step) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  for (let y = -step + offset; y < height + step; y += step) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }
}

function draw() {
  frame += 1;
  ctx.clearRect(0, 0, width, height);
  drawGrid();

  for (let i = 0; i < nodes.length - 1; i += 1) {
    drawLine(nodes[i], nodes[i + 1], ((frame * 0.012 + i * 0.18) % 1));
  }

  nodes.forEach(drawNode);
  requestAnimationFrame(draw);
}

resize();
draw();
window.addEventListener("resize", resize);

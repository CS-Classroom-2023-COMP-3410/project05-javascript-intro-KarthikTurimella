const canvas = document.getElementById("drawing-canvas");
const ctx = canvas.getContext("2d");
const brushColorInput = document.getElementById("brush-color");
const brushSizeInput = document.getElementById("brush-size");
const canvasColorInput = document.getElementById("canvas-color");
const clearCanvasButton = document.getElementById("clear-canvas");
const undoButton = document.getElementById("undo");
const saveImageButton = document.getElementById("save-image");

canvas.width = 800;
canvas.height = 600;

let isDrawing = false;
let brushColor = "#000000";
let brushSize = 5;
let canvasColor = "#ffffff";
let strokes = [];
let currentStroke = [];

// Initialize canvas background
function initializeCanvas() {
  ctx.fillStyle = canvasColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}
initializeCanvas();

// Start drawing
canvas.addEventListener("mousedown", (e) => {
  isDrawing = true;
  currentStroke = [];
  draw(e);
});

// Stop drawing
canvas.addEventListener("mouseup", () => {
  if (isDrawing) {
    isDrawing = false;
    strokes.push([...currentStroke]);
  }
});

// Draw on canvas
canvas.addEventListener("mousemove", (e) => {
  if (!isDrawing) return;
  draw(e);
});

// Draw function
function draw(e) {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  ctx.fillStyle = brushColor;
  ctx.beginPath();
  ctx.arc(x, y, brushSize, 0, Math.PI * 2);
  ctx.fill();

  currentStroke.push({ x, y, brushColor, brushSize });
}

// Clear the canvas
clearCanvasButton.addEventListener("click", () => {
  strokes = [];
  initializeCanvas();
});

// Undo the last stroke
undoButton.addEventListener("click", () => {
  strokes.pop();
  redrawCanvas();
});

// Redraw the canvas from stored strokes
function redrawCanvas() {
  initializeCanvas();
  strokes.forEach((stroke) => {
    stroke.forEach(({ x, y, brushColor, brushSize }) => {
      ctx.fillStyle = brushColor;
      ctx.beginPath();
      ctx.arc(x, y, brushSize, 0, Math.PI * 2);
      ctx.fill();
    });
  });
}

// Save canvas as image
saveImageButton.addEventListener("click", () => {
  const image = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = image;
  link.download = "drawing.png";
  link.click();
});

// Update brush color
brushColorInput.addEventListener("input", (e) => {
  brushColor = e.target.value;
});

// Update brush size
brushSizeInput.addEventListener("input", (e) => {
  brushSize = parseInt(e.target.value, 10);
});

// Update canvas background color
canvasColorInput.addEventListener("input", (e) => {
  canvasColor = e.target.value;
  initializeCanvas();
  redrawCanvas();
});

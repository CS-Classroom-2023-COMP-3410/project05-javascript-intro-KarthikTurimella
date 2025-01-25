const mainDisplay = document.getElementById("main-display");
const memoryDisplay = document.getElementById("memory-display");
const buttons = document.querySelectorAll(".btn");

let currentInput = "0";
let previousValue = null;
let operator = null;
let memory = null;
let operatorClicked = false;

// Update the main and memory displays
function updateDisplay() {
  mainDisplay.textContent = currentInput;
  memoryDisplay.textContent = memory !== null ? `M: ${memory}` : "";
}

// Handle number button clicks
function handleNumber(number) {
  if (currentInput === "0" || operatorClicked) {
    currentInput = number;
  } else {
    currentInput += number;
  }
  operatorClicked = false;
  updateDisplay();
}

// Handle operator button clicks
function handleOperator(op) {
  if (operator && previousValue !== null) {
    calculate();
  }
  previousValue = parseFloat(currentInput);
  operator = op;
  operatorClicked = true;
}

// Perform calculation
function calculate() {
  const currentValue = parseFloat(currentInput);
  if (operator === "add") {
    currentInput = (previousValue + currentValue).toString();
  } else if (operator === "subtract") {
    currentInput = (previousValue - currentValue).toString();
  } else if (operator === "multiply") {
    currentInput = (previousValue * currentValue).toString();
  } else if (operator === "divide") {
    currentInput = currentValue === 0 ? "Error" : (previousValue / currentValue).toString();
  }
  previousValue = null;
  operator = null;
  updateDisplay();
}

// Handle equals button
function handleEquals() {
  if (operator && previousValue !== null) {
    calculate();
  }
}

// Handle clear button
function handleClear() {
  currentInput = "0";
  previousValue = null;
  operator = null;
  updateDisplay();
}

// Handle square root button
function handleSquareRoot() {
  const value = parseFloat(currentInput);
  currentInput = value >= 0 ? Math.sqrt(value).toString() : "Error";
  updateDisplay();
}

// Handle memory actions
function handleMemory(action) {
  const value = parseFloat(currentInput);
  if (action === "memory-clear") {
    memory = null;
  } else if (action === "memory-recall") {
    if (memory !== null) {
      currentInput = memory.toString();
    }
  } else if (action === "memory-add") {
    memory = memory !== null ? memory + value : value;
  }
  updateDisplay();
}

// Handle button clicks
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const number = button.dataset.number;
    const action = button.dataset.action;

    if (number) {
      handleNumber(number);
    } else if (action === "add") {
      handleOperator("add");
    } else if (action === "subtract") {
      handleOperator("subtract");
    } else if (action === "multiply") {
      handleOperator("multiply");
    } else if (action === "divide") {
      handleOperator("divide");
    } else if (action === "equals") {
      handleEquals();
    } else if (action === "clear") {
      handleClear();
    } else if (action === "square-root") {
      handleSquareRoot();
    } else if (action === "memory-clear" || action === "memory-recall") {
      handleMemory(action);
    }
  });
});

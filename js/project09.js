const arrayContainer = document.getElementById("array-container");
const algorithmSelect = document.getElementById("algorithm");
const speedInput = document.getElementById("speed");
const startSortingButton = document.getElementById("start-sorting");
const resetArrayButton = document.getElementById("reset-array");

let array = [];
let delay = 1000 / speedInput.value;

// Generate a random array
function generateArray(size = 20) {
  array = Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 1);
  renderArray();
}

// Render the array as bars
function renderArray() {
  arrayContainer.innerHTML = "";
  array.forEach((value) => {
    const bar = document.createElement("div");
    bar.classList.add("array-bar");
    bar.style.height = `${value}%`;
    arrayContainer.appendChild(bar);
  });
}

// Update delay based on speed input
speedInput.addEventListener("input", () => {
  delay = 1000 / speedInput.value;
});

// Swap two elements in the array
function swap(array, i, j) {
  [array[i], array[j]] = [array[j], array[i]];
}

// Bubble Sort Algorithm
async function bubbleSort() {
  const bars = document.querySelectorAll(".array-bar");
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      bars[j].style.backgroundColor = "red";
      bars[j + 1].style.backgroundColor = "red";

      if (array[j] > array[j + 1]) {
        swap(array, j, j + 1);
        await sleep(delay);
        renderArray();
      }

      bars[j].style.backgroundColor = "blue";
      bars[j + 1].style.backgroundColor = "blue";
    }
  }
}

// Insertion Sort Algorithm
async function insertionSort() {
  const bars = document.querySelectorAll(".array-bar");
  for (let i = 1; i < array.length; i++) {
    let key = array[i];
    let j = i - 1;

    bars[i].style.backgroundColor = "red";

    while (j >= 0 && array[j] > key) {
      array[j + 1] = array[j];
      j--;
      await sleep(delay);
      renderArray();
    }

    array[j + 1] = key;

    bars[i].style.backgroundColor = "blue";
  }
}

// Sleep function for delays
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Start sorting
startSortingButton.addEventListener("click", async () => {
  const algorithm = algorithmSelect.value;
  if (algorithm === "bubbleSort") {
    await bubbleSort();
  } else if (algorithm === "insertionSort") {
    await insertionSort();
  }
});

// Reset the array
resetArrayButton.addEventListener("click", () => {
  generateArray();
});

// Initialize the tool
generateArray();

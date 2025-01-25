const storyText = document.getElementById("story-text");
const choicesContainer = document.getElementById("choices");
const restartButton = document.getElementById("restart-button");

const story = {
  start: {
    text: "You wake up in a dark forest with no memory of how you got there. You see two paths ahead.",
    choices: [
      { text: "Take the left path", next: "left_path" },
      { text: "Take the right path", next: "right_path" },
    ],
  },
  left_path: {
    text: "You encounter a river. Do you cross it or follow it?",
    choices: [
      { text: "Cross the river", next: "cross_river" },
      { text: "Follow the river", next: "follow_river" },
    ],
  },
  right_path: {
    text: "You find an abandoned cabin. Do you enter or keep walking?",
    choices: [
      { text: "Enter the cabin", next: "enter_cabin" },
      { text: "Keep walking", next: "keep_walking" },
    ],
  },
  cross_river: {
    text: "You successfully cross the river but are exhausted. You find a safe spot to rest and survive.",
    choices: [],
  },
  follow_river: {
    text: "You follow the river and find a village where you get help. You survive.",
    choices: [],
  },
  enter_cabin: {
    text: "Inside the cabin, you find food and shelter. You survive.",
    choices: [],
  },
  keep_walking: {
    text: "You keep walking and get lost deeper into the forest. You do not survive.",
    choices: [],
  },
};

let currentNode = localStorage.getItem("currentNode") || "start";
let progress = JSON.parse(localStorage.getItem("progress")) || [];

// Load the current story node
function loadStory(node) {
  currentNode = node;
  const storyNode = story[node];
  storyText.textContent = storyNode.text;

  // Save progress in localStorage
  if (!progress.includes(node)) {
    progress.push(node);
    localStorage.setItem("progress", JSON.stringify(progress));
  }
  localStorage.setItem("currentNode", currentNode);

  // Display choices
  choicesContainer.innerHTML = "";
  storyNode.choices.forEach((choice) => {
    const button = document.createElement("button");
    button.textContent = choice.text;
    button.addEventListener("click", () => {
      loadStory(choice.next);
    });
    choicesContainer.appendChild(button);
  });

  // Show restart button if the story ends
  restartButton.style.display = storyNode.choices.length === 0 ? "block" : "none";

  // Display progress
  displayProgress();
}

// Display the user’s progress visually
function displayProgress() {
  const progressContainer = document.getElementById("progress-container");
  progressContainer.innerHTML = `<h3>Progress:</h3>`;
  progress.forEach((node) => {
    const progressItem = document.createElement("p");
    progressItem.textContent = story[node].text;
    progressContainer.appendChild(progressItem);
  });
}

// Restart the game
restartButton.addEventListener("click", () => {
  currentNode = "start";
  progress = [];
  localStorage.removeItem("currentNode");
  localStorage.removeItem("progress");
  loadStory(currentNode);
});

// Start the game
loadStory(currentNode);

const questions = [
    {
      question: "What is the capital of France?",
      options: ["Berlin", "Madrid", "Paris", "Lisbon"],
      correct: 2,
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Jupiter", "Saturn"],
      correct: 1,
    },
    {
      question: "What is the largest mammal in the world?",
      options: ["Elephant", "Blue Whale", "Giraffe", "Polar Bear"],
      correct: 1,
    },
    {
      question: "Who wrote 'Hamlet'?",
      options: ["Charles Dickens", "William Shakespeare", "Mark Twain", "J.K. Rowling"],
      correct: 1,
    },
  ];
  
  let currentQuestionIndex = 0;
  let score = 0;
  let selectedOption = null;
  let userResponses = [];
  
  const questionElement = document.getElementById("question");
  const optionsElement = document.getElementById("options");
  const nextButton = document.getElementById("next-button");
  const resultsContainer = document.getElementById("results-container");
  const scoreElement = document.getElementById("score");
  const restartButton = document.getElementById("restart-button");
  
  // Add a review section for detailed feedback
  const reviewContainer = document.createElement("div");
  reviewContainer.id = "review-container";
  resultsContainer.appendChild(reviewContainer);
  
  function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
  
    optionsElement.innerHTML = "";
    currentQuestion.options.forEach((option, index) => {
      const li = document.createElement("li");
      li.textContent = option;
      li.classList.add("option");
      li.dataset.index = index;
      li.addEventListener("click", selectOption);
      optionsElement.appendChild(li);
    });
  
    selectedOption = null;
    nextButton.disabled = true;
  }
  
  function selectOption(event) {
    const options = document.querySelectorAll(".option");
    options.forEach(option => option.classList.remove("selected"));
  
    const selected = event.target;
    selected.classList.add("selected");
    selectedOption = parseInt(selected.dataset.index, 10);
    nextButton.disabled = false;
  }
  
  function handleNextQuestion() {
    if (selectedOption === questions[currentQuestionIndex].correct) {
      score++;
    }
  
    // Save user response for review
    userResponses.push({
      question: questions[currentQuestionIndex].question,
      userAnswer: questions[currentQuestionIndex].options[selectedOption],
      correctAnswer: questions[currentQuestionIndex].options[questions[currentQuestionIndex].correct],
      isCorrect: selectedOption === questions[currentQuestionIndex].correct,
    });
  
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      loadQuestion();
    } else {
      showResults();
    }
  }
  
  function showResults() {
    document.getElementById("question-container").style.display = "none";
    resultsContainer.style.display = "block";
    scoreElement.textContent = `You scored ${score} out of ${questions.length}!`;
  
    // Display review of responses
    reviewContainer.innerHTML = "<h3>Review Your Answers</h3>";
    userResponses.forEach((response, index) => {
      const reviewItem = document.createElement("div");
      reviewItem.classList.add("review-item");
  
      const questionText = document.createElement("p");
      questionText.textContent = `${index + 1}. ${response.question}`;
  
      const userAnswerText = document.createElement("p");
      userAnswerText.textContent = `Your Answer: ${response.userAnswer}`;
      userAnswerText.style.color = response.isCorrect ? "green" : "red";
  
      const correctAnswerText = document.createElement("p");
      correctAnswerText.textContent = `Correct Answer: ${response.correctAnswer}`;
  
      reviewItem.appendChild(questionText);
      reviewItem.appendChild(userAnswerText);
      reviewItem.appendChild(correctAnswerText);
      reviewContainer.appendChild(reviewItem);
    });
  }
  
  function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    userResponses = [];
    document.getElementById("question-container").style.display = "block";
    resultsContainer.style.display = "none";
    loadQuestion();
  }
  
  nextButton.addEventListener("click", handleNextQuestion);
  restartButton.addEventListener("click", restartQuiz);
  
  // Initialize quiz
  loadQuestion();
  
document.addEventListener("DOMContentLoaded", () => {

  const quizQuestions = [
    {
      question: "What degrees does John hold?",
      answers: {
        a: "Bachelor of Arts",
        b: "Masters of Biomedical Science",
        c: "Masters of Science",
        d: "Bachelor of Cell biology"
      },
      correctAnswer: "b"
    },
    {
      question: "Which of the following is NOT a project title John worked on?",
      answers: {
        a: "Resolving mechanisms of cell division across the tree of life",
        b: "Substrate stiffness & neural crest EMT",
        c: "Unlocking the proteomics of Glycine receptors",
        d: "HOW: The long and short of intestinal stem cells"
      },
      correctAnswer: "a"
    },
    {
      question: "Which technique is used to separate DNA?",
      answers: {
        a: "Microscopy",
        b: "Gel electrophoresis",
        c: "Centrifugation",
        d: "PCR"
      },
      correctAnswer: "b"
    },
    {
      question: "What is one of John's skills?",
      answers: {
        a: "Tennis",
        b: "Chemical analysis",
        c: "Mass spectroscopy",
        d: "Good Laboratory Practice (GLP)"
      },
      correctAnswer: "d"
    }
  ];

  const quizContainer = document.getElementById("quiz-container");
  const resultContainer = document.getElementById("quiz-result");
  const submitButton = document.getElementById("submit-quiz");
  const resetButton = document.getElementById("reset-quiz");

  function buildQuiz() {
    const output = [];

    quizQuestions.forEach((q, index) => {
      const answers = [];

      for (let letter in q.answers) {
        answers.push(`
          <label>
            <input type="radio" name="question${index}" value="${letter}">
            ${letter}: ${q.answers[letter]}
          </label>
        `);
      }

      output.push(`
        <div class="quiz-question">
          <h4>${q.question}</h4>
          ${answers.join("")}
        </div>
      `);
    });

    quizContainer.innerHTML = output.join("");
  }

  buildQuiz();

  submitButton.addEventListener("click", () => {
    let score = 0;

    quizQuestions.forEach((q, index) => {
      const inputs = document.querySelectorAll(`input[name="question${index}"]`);
      let selected = null;

      inputs.forEach(input => {
        const label = input.parentElement;
        label.style.color = "black";

        if (input.checked) selected = input.value;

        if (input.value === q.correctAnswer) {
          label.style.color = "green";
        }
      });

      if (selected && selected !== q.correctAnswer) {
        const wrong = document.querySelector(
          `input[name="question${index}"][value="${selected}"]`
        );
        wrong.parentElement.style.color = "red";
      }

      if (selected === q.correctAnswer) score++;
    });

    let message = "";

    if (score <= 1) message = "Try again.";
    else if (score === 3) message = "Good job!";
    else if (score === 4) message = "Well done, all correct!";

    resultContainer.textContent = `You got ${score} out of ${quizQuestions.length}. ${message}`;
  });

  resetButton.addEventListener("click", () => {
    buildQuiz();
    resultContainer.textContent = "";
  });

});
const quizData = [
  {
    question: "¿En qué lugar se ejecuta generalmente el código JavaScript?",
    a: "Servidor",
    b: "Cliente (en el propio navegador de internet)",
    correct: "b",
  },
  {
    question:
      "¿Cuáles de estas son marcas para la inserción del código JavaScript en las páginas HTML?",
    a: "< javascript _code > y < /javascript_code >",
    b: "< ?script > y < script? >",
    c: "< script > y < /script >",
    correct: "c",
  },
  {
    question: "La llamada al código Javascript debe colocarse en:",
    a: "La sección Body de la página",
    b: "Antes de la etiqueta HTML",
    c: "Puede colocarse en la sección Head o en Body",
    correct: "c",
  },
  {
    question:
      "En JavaScript, para darle el nombre a una variable, objeto o función, debemos tener en cuenta que:",
    a: "No se pueden usar mayúsculas",
    b: "JavaScript no distingue entre mayúsculas y minúsculas",
    c: "JavaScript diferencia entre mayúsculas y minúsculas",
    correct: "c",
  },
  {
    question:
      "¿Cuál es la instrucción usada para devolver un valor en una función de JavaScript?",
    a: "Send",
    b: "Return",
    c: "Value",
    correct: "b",
  },
  {
    question: "Para terminar las instrucciones en Javascript se utiliza:",
    a: "Un punto y coma",
    b: "Un punto y coma o un salto de línea",
    c: "La sentencia End",
    correct: "b",
  },
  {
    question:
      "¿Cuál de estas instrucciones está correctamente escrita en Javascript?",
    a: "if (a==0) alert (a);",
    b: "if (a==0) { print [a] }",
    c: "if (a==0): print a;",
    d: "if (a=0) print a;",
    correct: "a",
  },
];

const answerEls = document.querySelectorAll(".answer");
const question = document.getElementById("question");
const a_answer = document.getElementById("a_answer");
const b_answer = document.getElementById("b_answer");
const c_answer = document.getElementById("c_answer");
const d_answer = document.getElementById("d_answer");
const btn_quiz = document.getElementById("submitQuiz");
const btn_end = document.getElementById("terminarBtn");

const a_ans = document.getElementById("a_ask");
const b_ans = document.getElementById("b_ask");
const c_ans = document.getElementById("c_ask");
const d_ans = document.getElementById("d_ask");
let currentQuiz = 0;
let score = 0;

loadQuestions();

function loadQuestions() {
  deselectAnswers();
  const currentQuizData = quizData[currentQuiz];
  question.innerText = currentQuizData.question;
  a_answer.innerText = currentQuizData.a;
  b_answer.innerText = currentQuizData.b;
  c_answer.innerText = currentQuizData.c;
  d_answer.innerText = currentQuizData.d;
  if (currentQuizData.c == undefined) {
    c_ans.classList.add("ocultar");
  } else {
    c_ans.classList.remove("ocultar");
    d_answer.innerText = currentQuizData.d;
  }
  if (currentQuizData.d == undefined) {
    d_ans.classList.add("ocultar");
  } else {
    d_ans.classList.remove("ocultar");
    d_answer.innerText = currentQuizData.d;
  }

  let x = currentQuiz + 1;
  if (x == quizData.length) {
    btn_quiz.innerText = "Enviar";
  } else {
    btn_quiz.innerText = "Responder " + x + "/" + quizData.length;
  }
}

function getSelected() {
  let answer = undefined;
  answerEls.forEach((answerEl) => {
    if (answerEl.checked) {
      answer = answerEl.id;
    }
  });
  checkAnswer(answer);
}
function deselectAnswers() {
  answerEls.forEach((answerEl) => {
    answerEl.checked = false;
  });
}

function message(i, t, time) {
  Swal.fire({
    position: "top",
    width: "30rem",
    icon: i,
    title: t,
    showConfirmButton: false,
    timer: time,
  });
}

function checkAnswer(ans) {
  const currentQuizData = quizData[currentQuiz];
  if (ans === undefined) {
    message("error", "Escoge una respuesta!", 1500);
  } else {
    if (ans === currentQuizData.correct) {
      score++;
    }
    if (currentQuiz < 6) {
      currentQuiz++;
      loadQuestions();
    } else {
      currentQuiz++;
      getAnswers();
    }
  }
}

function getAnswers() {
  deselectAnswers();
  question.innerText =
    "Has acabado la prueba! En hora buena! \n\n Tus resultados fueron " +
    score +
    "/" +
    quizData.length;
  a_ans.classList.add("ocultar");
  b_ans.classList.add("ocultar");
  c_ans.classList.add("ocultar");
  d_ans.classList.add("ocultar");
  btn_quiz.classList.add("ocultar");
  btn_end.classList.remove("ocultar");
  btn_end.innerText = "Empezar de nuevo";
  if (score >= 5) {
    message(
      "success",
      "Contestaste bien " + score + "/" + quizData.length,
      3000
    );
  } else {
    message("error", "Fallaste! " + score + "/" + quizData.length, 3000);
  }
}

btn_quiz.addEventListener("click", () => {
  getSelected();
});
btn_end.addEventListener("click", () => {
  location.reload();
});

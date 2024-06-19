import React, { useState } from "react";
import "./StyleQuiz.css"; // Importa il file CSS per lo stile del quiz
import { Col, Container, Row } from "react-bootstrap";

const questions = [
  {
    question: "Quale tra questi è un linguaggio di programmazione?",
    answers: [
      { text: "HTML", correct: false },
      { text: "CSS", correct: false },
      { text: "Python", correct: true },
      { text: "SQL", correct: false },
    ],
  },
  {
    question: "Cosa significa 'for loop' in programmazione?",
    answers: [
      {
        text: "È una struttura di controllo che ripete un blocco di codice un numero specifico di volte.",
        correct: true,
      },
      { text: "È un tipo di variabile.", correct: false },
      { text: "È un errore nel codice.", correct: false },
      { text: "È una funzione per ordinare gli elementi.", correct: false },
    ],
  },
  {
    question: "Qual è la funzione di 'if' in programmazione?",
    answers: [
      { text: "Definire una funzione.", correct: false },
      { text: "Dichiarare una variabile.", correct: false },
      { text: "Controllare una condizione e eseguire un blocco di codice se la condizione è vera.", correct: true },
      { text: "Ripetere un blocco di codice.", correct: false },
    ],
  },
  {
    question: "Quale simbolo viene comunemente utilizzato per i commenti in Python?",
    answers: [
      { text: "//", correct: false },
      { text: "/* */", correct: false },
      { text: "#", correct: true },
      { text: "<!-- -->", correct: false },
    ],
  },
  {
    question: "Che cos'è un array?",
    answers: [
      { text: "Un tipo di funzione.", correct: false },
      { text: "Una struttura dati che può contenere più valori dello stesso tipo.", correct: true },
      { text: "Un loop che si ripete all'infinito.", correct: false },
      { text: "Un tipo di variabile.", correct: false },
    ],
  },
  {
    question: "Che cosa rappresenta 'boolean' in programmazione?",
    answers: [
      { text: "Un numero.", correct: false },
      { text: "Una stringa di testo.", correct: false },
      { text: "Una variabile che può avere solo due valori: vero o falso.", correct: true },
      { text: "Un array.", correct: false },
    ],
  },
  {
    question: "Qual è l'output di: console.log('Hello, World!'); in JavaScript?",
    answers: [
      { text: "Hello World", correct: false },
      { text: "Hello, World!", correct: true },
      { text: "Console Log", correct: false },
      { text: "Error", correct: false },
    ],
  },
  {
    question: "Qual è lo scopo di una funzione in programmazione?",
    answers: [
      { text: "Memorizzare dati.", correct: false },
      { text: "Eseguire un blocco di codice quando chiamata.", correct: true },
      { text: "Ripetere un blocco di codice.", correct: false },
      { text: "Dichiarare una variabile.", correct: false },
    ],
  },
  {
    question: "In quale linguaggio di programmazione si utilizza la parola chiave 'def' per dichiarare una funzione?",
    answers: [
      { text: "Java", correct: false },
      { text: "JavaScript", correct: false },
      { text: "C++", correct: false },
      { text: "Python", correct: true },
    ],
  },
  {
    question: "Che cosa restituisce l'operatore modulo (%)?",
    answers: [
      { text: "La somma di due numeri.", correct: false },
      { text: "Il quoziente della divisione di due numeri.", correct: false },
      { text: "Il prodotto di due numeri.", correct: false },
      { text: "Il resto della divisione di due numeri.", correct: true },
    ],
  },
];

const ScopriSeFaPerTe = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]); // Stato per le risposte dell'utente

  const handleAnswerClick = (correct, answerIndex) => {
    // Salva la risposta selezionata dall'utente
    setUserAnswers([...userAnswers, { questionIndex: currentQuestion, answerIndex, correct }]);

    if (correct) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setShowScore(false);
    setScore(0);
    setUserAnswers([]);
  };

  return (
    <Container>
      <Row className="justify-content-center quiz-container text-white fw-semibold">
        <h1 className="text-dark mb-4">Quiz: Scopri SE Fa Per Te</h1>
        <Col md={8}>
          {showScore ? (
            <div className="score-section">
              <h2 className="text-dark">
                You scored {score} out of {questions.length}
              </h2>
              <ul className="list-group mt-3">
                {questions.map((question, qIndex) => (
                  <li key={qIndex} className="list-group-item">
                    <div>
                      <strong>{question.question}</strong>
                    </div>
                    <div>
                      {question.answers.map((answer, aIndex) => (
                        <div
                          key={aIndex}
                          className={
                            answer.correct
                              ? "text-success"
                              : userAnswers[qIndex]?.answerIndex === aIndex && !answer.correct
                              ? "text-danger"
                              : ""
                          }
                        >
                          {answer.text}
                        </div>
                      ))}
                    </div>
                    <div>
                      <strong>Risposta data:</strong>{" "}
                      <span
                        className={
                          questions[qIndex].answers[userAnswers[qIndex]?.answerIndex]?.correct
                            ? "text-success"
                            : "text-danger"
                        }
                      >
                        {questions[qIndex].answers[userAnswers[qIndex]?.answerIndex]?.text}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
              <button className="answer-button border border-dark" onClick={restartQuiz}>
                Restart Quiz
              </button>
            </div>
          ) : (
            <div className="question-section">
              <div className="question-count">
                <span>Question {currentQuestion + 1}</span>/{questions.length}
              </div>
              <div className="question-text">{questions[currentQuestion].question}</div>
              <div className="answer-section">
                {questions[currentQuestion].answers.map((answer, index) => (
                  <button
                    key={index}
                    className="answer-button w-75"
                    onClick={() => handleAnswerClick(answer.correct, index)}
                  >
                    {answer.text}
                  </button>
                ))}
              </div>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ScopriSeFaPerTe;

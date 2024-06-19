import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import animationData from "../../src/assets/Quiz.json";
import "./Quiz.css";
import Lottie from "lottie-react";
import { TiTick } from "react-icons/ti";

const Quiz = () => {
  return (
    <Container>
      <h1 className="quiz-title text-center">Sala Giochi</h1>

      <Row className="row-container-hero">
        <Col>
          <Lottie
            className="hero-quiz-animation img-fluid px-3 py-2 ms-lg-5"
            animationData={animationData}
            loop={true}
          />
        </Col>
        <Col>
          <p className="p-hero-quiz fs-5 fw-semibold lh-lg">
            Benvenuto nella nostra Sala Giochi!
            <br />
            Qui puoi mettere alla prova le tue conoscenze e abilità con una serie di quiz interattivi progettati per
            sfidarti e divertire.
          </p>
          <br />
          <p className="lh-base mt-1 fs-5 lh-lg">
            <TiTick className="icon-tick fs-2 " />
            Feedback immediato al termine del quiz
            <br />
            <TiTick className="icon-tick fs-2" />
            Valutazione Finale: Scopri il tuo punteggio
            <br />
            <TiTick className="icon-tick fs-2" />
            Interfaccia Intuitiva: Un design moderno e user-friendly
          </p>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <div className="list-group">
            <Link to="/scopri-se-fa-per-te" className="list-group-item list-group-item-action" aria-current="true">
              <div className="d-flex w-100 justify-content-center">
                <h5 className="mb-1">Scopri se fa per te</h5>
              </div>
              <p className="mb-1">Mettiti alla prova con delle semplici domande di programmazione generale </p>

              <small className="text-success fs-6 fw-semibold">BASE</small>
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Quiz;

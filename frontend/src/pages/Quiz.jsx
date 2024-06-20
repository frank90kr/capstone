import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import animationData from "../../src/assets/Quiz.json";
import "./Quiz.css";
import Lottie from "lottie-react";
import AOS from "aos";
import { TiTick } from "react-icons/ti";
import { IoIosArrowDropdownCircle } from "react-icons/io";

const Quiz = () => {
  return (
    <Container>
      <h1 className="quiz-title text-center">Sala Giochi</h1>

      <Row className="row-container-hero">
        <Col>
          <Lottie
            className="hero-quiz-animation img-fluid px-3 py-2 ms-lg-5"
            data-aos="zoom-in"
            data-aos-duration="1000"
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
          <p className="lh-base mt-1 fs-5">
            <div className="" data-aos="fade-left" data-aos-duration="1000">
              <TiTick className="icon-tick fs-1 " />
              Feedback immediato al termine del quiz
            </div>
            <br />
            <div data-aos="fade-left" data-aos-duration="1300">
              <TiTick className="icon-tick fs-1" />
              Valutazione Finale: Scopri il tuo punteggio
            </div>
            <br />
            <div data-aos="fade-left" data-aos-duration="1600">
              <TiTick className="icon-tick fs-1" />
              Interfaccia Intuitiva: Un design moderno e user-friendly
            </div>
          </p>
        </Col>
        <div className="d-flex justify-content-center container-icon-quiz">
          <IoIosArrowDropdownCircle className="float-icon float-icon-quiz" />
        </div>
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

import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import AOS from "aos";
import { TiTick } from "react-icons/ti";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import animationData from "../../src/assets/Quiz.json";
import "./Quiz.css";

const Quiz = () => {
  useEffect(() => {
    AOS.init(); // Inizializza AOS per le animazioni
  }, []);

  return (
    <Container>
      <h1 className="text-center course-list-title dysplay-1">Sala Giochi</h1>

      <Row className="row-container-hero">
        <Col md={6} className="d-flex align-items-center">
          <Lottie
            className="hero-quiz-animation img-fluid px-3 py-2 ms-lg-5"
            data-aos="zoom-in"
            data-aos-duration="1000"
            animationData={animationData}
            loop={true}
          />
        </Col>
        <Col md={6} className="body-quiz">
          <p className="p-hero-quiz fs-5 fw-semibold lh-lg">
            Benvenuto nella nostra Sala Giochi!
            <br />
            Qui puoi mettere alla prova le tue conoscenze e abilità con una serie di quiz interattivi progettati per
            sfidarti e divertire.
          </p>
          <br />
          <div className="d-flex flex-column">
            <div className="mb-3" data-aos="fade-left" data-aos-duration="1000">
              <TiTick className="icon-tick fs-1" />
              Feedback immediato al termine del quiz
            </div>
            <div className="mb-3" data-aos="fade-left" data-aos-duration="1300">
              <TiTick className="icon-tick fs-1" />
              Valutazione Finale: Scopri il tuo punteggio
            </div>
            <div className="mb-3" data-aos="fade-left" data-aos-duration="1600">
              <TiTick className="icon-tick fs-1" />
              Interfaccia Intuitiva: Un design moderno e user-friendly
            </div>
          </div>
        </Col>
        <div className="d-flex justify-content-center container-icon-quiz">
          <IoIosArrowDropdownCircle className="float-icon float-icon-quiz" />
        </div>
      </Row>

      <Row>
        <Col md={6} className="mx-auto">
          <div className="list-group">
            <Link to="/scopri-se-fa-per-te" className="list-group-item list-group-item-action" aria-current="true">
              <div className="d-flex w-100 justify-content-center">
                <h5 className="mb-1">Scopri se fa per te</h5>
              </div>
              <p className="mb-1">Mettiti alla prova con delle semplici domande di programmazione generale</p>
              <small className="text-success fs-6 fw-semibold">BASE</small>
            </Link>
          </div>
        </Col>
        <Col md={6} className="mx-auto">
          <div className="list-group">
            <Link to="/scopri-se-fa-per-te" className="list-group-item list-group-item-action" aria-current="true">
              <div className="d-flex w-100 justify-content-center">
                <h5 className="mb-1">Scopri se fa per te</h5>
              </div>
              <p className="mb-1">Mettiti alla prova con delle semplici domande di programmazione generale</p>
              <small className="text-success fs-6 fw-semibold">BASE</small>
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Quiz;

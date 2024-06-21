import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, Col, Container, Modal, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { GiClick } from "react-icons/gi";
import AOS from "aos";
import "aos/dist/aos.css";
import "./CourseList.css";

const CoursesList = () => {
  const [courses, setCourses] = useState([]);
  const [activeTab, setActiveTab] = useState(""); // Stato per il tab attivo
  const [showModal, setShowModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [authenticated, setAuthenticated] = useState(false); // Stato per verificare se l'utente è autenticato
  const navigate = useNavigate();
  const userRole = useSelector((state) => state.user?.role); // Stato per il ruolo dell'utente

  useEffect(() => {
    axios
      .get("/api/courses")
      .then((res) => {
        setCourses(res.data);
      })
      .catch((err) => console.error("Errore nel recupero dei corsi:", err));

    axios
      .get("/api/user/authenticated")
      .then((response) => {
        setAuthenticated(response.data.authenticated);
      })
      .catch((error) => {
        console.error("Errore nel controllo dell'autenticazione:", error);
      });

    // Inizializza AOS al caricamento del componente
    AOS.init({ once: true }); // Imposta once: true per eseguire l'animazione una sola volta
  }, []);

  // Funzione per gestire il click su un tab
  const handleTabClick = (title) => {
    setActiveTab(title); // Imposta il tab attivo
    const selected = courses.find((course) => course.title === title); // Trova il corso corrispondente al titolo
    if (selected) {
      setSelectedCourse(selected); // Imposta il corso selezionato
    }
  };

  // Funzione per gestire l'apertura del modale e impostare il corso selezionato
  const handleOpenModal = (course) => {
    setSelectedCourse(course);
    setShowModal(true);
  };

  // Funzione per chiudere il modale
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCourse(null);
  };

  // Funzione per gestire l'accesso al corso
  const handleAccessCourse = () => {
    if (authenticated) {
      navigate(`/lessons/${selectedCourse.id}`);
      handleCloseModal();
    } else {
      setShowModal(true);
    }
  };

  return (
    <Container fluid>
      <h2 className="text-center course-list-title">Panoramica Corsi</h2>

      <Row className="justify-content-center mt-4">
        <Col md={8}>
          {/* Paragrafo con animazione AOS */}
          <p className="fw-semibold lh-lg" data-aos="fade-down" data-aos-duration="1000">
            Benvenuto nel nostro programma di formazione avanzata per sviluppatori, dove puoi ampliare le tue competenze
            tecniche e accrescere la tua carriera nel campo dello sviluppo software. Offriamo una vasta gamma di corsi
            progettati per rispondere alle esigenze dell'industria tecnologica moderna, coprendo argomenti fondamentali
            e avanzati in vari ambiti della programmazione. Perché Scegliere i Nostri Corsi? Contenuti Didattici
            Approfonditi: I nostri corsi sono stati sviluppati da esperti del settore, garantendo contenuti aggiornati e
            pertinenti per rispondere alle richieste del mercato del lavoro attuale. Flessibilità di Apprendimento:
            Studia secondo il tuo ritmo, grazie alla nostra piattaforma di e-learning accessibile 24/7 da qualsiasi
            dispositivo. Abbiamo progettato i nostri corsi per adattarsi alle tue esigenze di apprendimento.
            Certificazioni Riconosciute: Al completamento di ciascun corso, riceverai un certificato di competenza che
            attesta le tue abilità acquisite, riconosciuto a livello internazionale nel settore IT. Cosa Offriamo Corsi
            Fondamentali Introduzione alla Programmazione: Un corso ideale per principianti, che copre i concetti
            fondamentali della programmazione utilizzando linguaggi come Python, JavaScript o Java. Sviluppo Web
            Front-end: Approfondisci le tue competenze nello sviluppo di interfacce utente responsive e dinamiche
            utilizzando HTML, CSS e JavaScript moderno. Sviluppo Web Back-end: Impara a costruire robuste API e servizi
            web utilizzando framework popolari come Node.js, Django o Spring Boot.
          </p>
        </Col>
      </Row>

      <Row className="justify-content-center mt-4">
        <Col md={8}>
          <ul className="nav nav-underline justify-content-center">
            <GiClick className="float-icon mt-2 text-dark" />
            {courses.map((course) => (
              <li key={course.id} className="nav-item">
                <button
                  type="button"
                  className={`nav-link text-dark ${activeTab === course.title ? "active" : ""}`}
                  onClick={() => handleTabClick(course.title)}
                >
                  {course.title}
                </button>
              </li>
            ))}
          </ul>
        </Col>
      </Row>

      <Row className="justify-content-center course-container gap-1">
        {selectedCourse && (
          <Col md={8} className="mb-4">
            <Card
              className="card border border-3 rounded-top border-light"
              onClick={() => handleOpenModal(selectedCourse)}
            >
              <Row className="g-0">
                <Col md={4}>
                  <Card.Img className="courseList-image rounded-top" variant="top" src={selectedCourse.image} />
                </Col>
                <Col md={8}>
                  <Card.Body>
                    <Card.Title>{selectedCourse.title}</Card.Title>
                    <Card.Text>{selectedCourse.description}</Card.Text>
                    <Card.Footer>
                      <p>Prezzo {selectedCourse.price}</p>
                      {authenticated ? (
                        userRole === "teacher" ? (
                          <Link to={`/lessons/${selectedCourse.id}`}>
                            <Button className="login-button border border-none" onClick={handleCloseModal}>
                              Vai al corso
                            </Button>
                          </Link>
                        ) : selectedCourse.price > 0 ? (
                          <Button className="login-button border border-none" onClick={handleCloseModal}>
                            Acquista
                          </Button>
                        ) : (
                          <Link to={`/lessons/${selectedCourse.id}`}>
                            <Button className="login-button border border-none" onClick={handleCloseModal}>
                              Vai al corso
                            </Button>
                          </Link>
                        )
                      ) : (
                        <Link to="/login">
                          <Button className="login-button border border-none" onClick={handleCloseModal}>
                            Effettua l'accesso per visualizzare il corso
                          </Button>
                        </Link>
                      )}
                    </Card.Footer>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          </Col>
        )}
      </Row>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Corso: {selectedCourse?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card.Img src={selectedCourse?.image} alt={selectedCourse?.title} className="img-fluid mb-3" />
          <p>{selectedCourse?.description}</p>
        </Modal.Body>
        <Modal.Footer>
          {authenticated ? (
            userRole === "teacher" ? (
              <Link to={`/lessons/${selectedCourse?.id}`}>
                <Button className="login-button border border-none" onClick={handleCloseModal}>
                  Vai al corso
                </Button>
              </Link>
            ) : selectedCourse?.price > 0 ? (
              <Button className="login-button border border-none" onClick={handleCloseModal}>
                Acquista
              </Button>
            ) : (
              <Link to={`/lessons/${selectedCourse?.id}`}>
                <Button className="login-button border border-none" onClick={handleCloseModal}>
                  Vai al corso
                </Button>
              </Link>
            )
          ) : (
            <Link to="/login">
              <Button className="login-button border border-none" onClick={handleCloseModal}>
                Effettua l'accesso per visualizzare il corso
              </Button>
            </Link>
          )}
          {/* <Button className="login-button close border border-none" onClick={handleCloseModal}>
            Chiudi
          </Button> */}
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default CoursesList;

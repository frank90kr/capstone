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

  const [selectedCourse, setSelectedCourse] = useState(null);
  // const [authenticated, setAuthenticated] = useState(false); // Stato per verificare se l'utente è autenticato
  // const [coursePurchases, setCoursePurchases] = useState({}); // Stato per tracciare gli acquisti dei corsi
  const navigate = useNavigate();
  const userRole = useSelector((state) => state.user?.role); // Stato per il ruolo dell'utente

  useEffect(() => {
    // Recupera la lista dei corsi
    axios
      .get("/api/courses")
      .then((res) => {
        setCourses(res.data);
      })
      .catch((err) => console.error("Errore nel recupero dei corsi:", err));

    // Controlla se l'utente è autenticato
    // axios
    //   .get("/api/user/authenticated")
    //   .then((response) => {
    //     setAuthenticated(response.data.authenticated);
    //     if (response.data.authenticated) {
    //       // Se l'utente è autenticato, recupera lo stato degli acquisti dei corsi
    //       axios
    //         .get("/api/user/purchases")
    //         .then((res) => {
    //           const purchases = res.data.reduce((acc, purchase) => {
    //             acc[purchase.course_id] = purchase.purchased;
    //             return acc;
    //           }, {});
    //           setCoursePurchases(purchases);
    //         })
    //         .catch((err) => console.error("Errore nel recupero degli acquisti dei corsi:", err));
    //     }
    //   })
    //   .catch((error) => {
    //     console.error("Errore nel controllo dell'autenticazione:", error);
    //   });

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
  };

  // // Funzione per gestire l'accesso al corso
  // const handleAccessCourse = () => {
  //   if (authenticated) {
  //     navigate(`/lessons/${selectedCourse.id}`);
  //     handleCloseModal();
  //   } else {
  //     setShowModal(true);
  //   }
  // };

  const handlePurchaseCourse = () => {
    navigate(`/payment/${selectedCourse.id}/${selectedCourse.title}/${selectedCourse.price}`);
  };

  return (
    <Container fluid>
      <h1 className="text-center course-list-title dysplay-1">Panoramica Corsi</h1>

      <Row className="justify-content-center mt-4">
        <Col md={8}>
          <p className="fw-semibold lh-lg mx-auto" data-aos="fade-down" data-aos-duration="1000">
            Benvenuto in <span className="text-success">Dev NeXt</span> , il nostro programma di formazione per
            sviluppatori, con noi potrai ampliare le tue competenze tecniche e accrescere la tua carriera nel campo
            dello sviluppo software. Offriamo una vasta gamma di corsi progettati per rispondere alle esigenze
            dell'industria tecnologica moderna, coprendo argomenti fondamentali e avanzati in vari ambiti della
            programmazione. Perché Scegliere i Nostri Corsi? Contenuti Didattici Approfonditi: I nostri corsi sono stati
            sviluppati da esperti del settore, garantendo contenuti aggiornati e pertinenti per rispondere alle
            richieste del mercato del lavoro attuale. Flessibilità di Apprendimento: Studia secondo il tuo ritmo, grazie
            alla nostra piattaforma di e-learning accessibile 24/7 da qualsiasi dispositivo. <br />
            Abbiamo progettato i nostri corsi per adattarsi alle tue esigenze di apprendimento. Sulla nostra piattaforma
            potrai imparare i linguaggi di programmazioni più conosciuti e richiesti dal mercato del lavoro. La nostra
            offerta formativa copre un ampio spettro di linguaggi e tecnologie. Che tu stia iniziando il tuo percorso
            nel mondo della programmazione o che tu sia già un professionista in cerca di specializzazione, abbiamo il
            corso giusto per te. Una delle principali caratteristiche della nostra piattaforma è la flessibilità. Puoi
            accedere ai corsi in qualsiasi momento e da qualsiasi luogo, utilizzando il tuo computer, tablet o
            smartphone. Questo ti permette di organizzare il tuo apprendimento in base ai tuoi impegni personali e
            professionali. Inoltre, i nostri corsi sono strutturati in moduli brevi, permettendoti di avanzare passo
            dopo passo e di monitorare i tuoi progressi.
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
              className="panoramic-card border border-3 rounded-top border-light"
              onClick={() => handleOpenModal(selectedCourse)}
            >
              <Row className="g-0">
                <Col md={4}>
                  <Card.Img className=" rounded-top" variant="top" src={selectedCourse.image} />
                </Col>
                <Col md={8}>
                  <Card.Body>
                    <Card.Title>{selectedCourse.title}</Card.Title>
                    <Card.Text>{selectedCourse.description}</Card.Text>
                    <Card.Footer>
                      <p className="text-center mb-4">Creato da: {selectedCourse.creator_name}</p>
                      <p>Prezzo {selectedCourse.price}</p>
                    </Card.Footer>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default CoursesList;

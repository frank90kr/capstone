import React, { useEffect, useState } from "react";
import { Container, Form, Button, Table, Modal, Row, Col, ListGroup, OverlayTrigger, Tooltip } from "react-bootstrap";
import axios from "axios";
import { useSelector } from "react-redux";
import "./Teacher.css";
import { FaInfo } from "react-icons/fa";

const Teacher = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [descriptionModal, setDescriptionModal] = useState("");
  const [priceModal, setPriceModal] = useState("");
  const [courseImage, setCourseImage] = useState(null);
  const [courseVideoUrl, setCourseVideoUrl] = useState("");

  const [lessonTitle, setLessonTitle] = useState("");
  const [lessonContent, setLessonContent] = useState("");
  const [language, setLanguage] = useState("");
  const [lessonCourseId, setLessonCourseId] = useState("");
  const userName = useSelector((state) => {
    return state.user?.name;
  }); // stato per nome utente
  const userEmail = useSelector((state) => {
    return state.user?.email;
  }); // stato per email utente
  const userRole = useSelector((state) => {
    return state.user?.role;
  }); // stato per ruolo utente

  //spinner e alert
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = () => {
    axios
      .get("/api/courses")
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const body = new FormData();
    body.append("title", title);
    body.append("description", description);
    body.append("price", price);
    if (courseImage) {
      body.append("course_img", courseImage);
    }
    if (courseVideoUrl) {
      body.append("youtube_video", courseVideoUrl);
    }

    axios
      .post("/api/courses", body)
      .then((response) => {
        console.log("Corso creato con successo:", response.data);
        fetchCourses(); // Aggiorna la lista dei corsi dopo la creazione
        setSuccessMessage("Corso creato con successo");
        setShowSuccessModal(true);
        //reset dei campi
        setTitle("");
        setDescription("");
        setPrice("");
        setCourseImage(null);
        setCourseVideoUrl("");
      })
      .catch((error) => {
        console.error("Errore durante la creazione del corso:", error);
        setErrorMessage("Si è verificato un errore durante la creazione del corso.");
        setShowErrorModal(true);
      });
  };

  const deleteCourse = (courseId) => {
    axios
      .delete(`/api/courses/${courseId}`)
      .then((response) => {
        console.log("Corso eliminato con successo:", response.data);
        fetchCourses(); // Aggiorna la lista dei corsi dopo l'eliminazione
        setSuccessMessage("Corso eliminato con successo");
        setShowSuccessModal(true);
        setErrorMessage(null);
        setShowErrorModal(false);
      })
      .catch((error) => {
        if (error.response && error.response.status === 403) {
          setErrorMessage("!Non sei autorizzato ad effettuare modifiche a questo corso.");
        } else {
          console.error("Errore durante l'eliminazione del corso:", error);
          setErrorMessage("Si è verificato un errore durante l'eliminazione del corso.");
        }
        setShowErrorModal(true);
      });
  };

  const handleUpdate = () => {
    if (!selectedCourse) return;

    const updatedCourse = {
      id: selectedCourse.id,
      title: titleModal,
      description: descriptionModal,
      price: priceModal,
    };

    axios
      .put(`/api/courses/${selectedCourse.id}`, updatedCourse)
      .then((response) => {
        console.log("Corso aggiornato con successo:", response.data);
        fetchCourses(); // Aggiorna la lista dei corsi dopo l'aggiornamento
        setSuccessMessage("Corso aggiornato con successo");
        setShowSuccessModal(true);
        setShowModal(false);
        handleCloseModal(); // Chiudi il modale dopo l'aggiornamento
        setErrorMessage(null);
        setShowErrorModal(false);
      })
      .catch((error) => {
        if (error.response && error.response.status === 403) {
          setErrorMessage("!Non sei autorizzato ad effettuare modifiche a questo corso.");
        } else {
          console.error("Errore durante l'aggiornamento del corso:", error);
          setErrorMessage("Si è verificato un errore durante l'aggiornamento del corso.");
        }
        setShowErrorModal(true);
      });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCourse(null); // Resetta lo stato del corso selezionato dopo la chiusura del modale
    setTitleModal("");
    setDescriptionModal("");
    setPriceModal("");
  };

  const handleLessonSubmit = (e) => {
    e.preventDefault();

    const lessonData = {
      title: lessonTitle,
      content: lessonContent,
      language: language,
      course_id: lessonCourseId,
    };

    axios
      .post("/api/lessons", lessonData)
      .then((response) => {
        console.log("Lezione creata con successo:", response.data);
        fetchCourses(); // Aggiorna la lista dei corsi dopo la creazione della lezione
        setSuccessMessage("Lezione creata con successo");
        setShowSuccessModal(true);
        setLessonTitle("");
        setLessonContent("");
        setLanguage("");
        setLessonCourseId("");
      })
      .catch((error) => {
        console.error("Errore durante la creazione della lezione:", error);
        setErrorMessage("Si è verificato un errore durante la creazione della lezione.");
        setShowErrorModal(true);
      });
  };

  return (
    <Container className="container-teacher">
      {/* Messaggio di errore */}
      <Modal className="" show={showErrorModal} onHide={() => setShowErrorModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Errore</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-danger">{errorMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowErrorModal(false)}>
            Chiudi
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Messaggio di conferma */}
      <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Successo</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-success">{successMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowSuccessModal(false)}>
            Chiudi
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="d-flex flex-column align-items-center">
        <h1 className="text-center fw-bold dysplay-1">Bentornato {userName}!</h1>
        <OverlayTrigger
          placement="bottom"
          overlay={
            <Tooltip id="tooltip-bottom">
              La pagina presenta una lista di tutti i corsi disponibili in formato tabellare, con dettagli chiave come
              titolo, descrizione, prezzo e azioni disponibili (Modifica ed Elimina). Inoltre, offre moduli ben
              strutturati per l'inserimento di nuovi corsi e lezioni, garantendo un'esperienza utente fluida e coerente.
            </Tooltip>
          }
        >
          <div style={{ marginTop: "15px" }}>
            <span className="d-inline-block" style={{ cursor: "pointer" }}>
              <FaInfo className="fs-5" />
              Passa il mouse se hai bisogno di aiuto
            </span>
          </div>
        </OverlayTrigger>
      </div>

      <Row className="mt-2">
        <Col>
          <p className="display-6">Profilo utente</p>
          <ListGroup.Item>username: {userName}</ListGroup.Item>
          <hr className="w-25" />
          <ListGroup.Item>e-mail: {userEmail}</ListGroup.Item>
          <hr className="w-25" />
          <ListGroup.Item>role: {userRole}</ListGroup.Item>
        </Col>
      </Row>

      <h1 className="text-center mt-2">Lista dei Corsi</h1>
      <p className="text-center">(! Puoi modificare solo i corsi da te creati)</p>
      <Row className="justify-content-center">
        <Col md={10}>
          <div className="table-responsive">
            <Table striped bordered hover responsive="sm" className="mx-auto mt-2">
              <thead>
                <tr>
                  <th className="text-center">Title</th>
                  {/* <th className="text-center">Description</th> */}
                  <th className="text-center">Price</th>
                  <th className="text-center">Teacher</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course) => (
                  <tr key={course.id}>
                    <td className="align-middle text-center">{course.title}</td>
                    {/* <td className="align-middle">{course.description}</td> */}
                    <td className="align-middle text-center">${course.price}</td>
                    <td className="align-middle text-center">
                      {course.creator_name} {/* Mostra il nome del creatore */}
                    </td>
                    <td className="align-middle">
                      <div className="d-flex flex-column align-items-center">
                        <Button
                          className="login-button border border-none text-white btn-info "
                          size="sm"
                          onClick={() => {
                            setSelectedCourse(course);
                            setTitleModal(course.title);
                            setDescriptionModal(course.description);
                            setPriceModal(course.price);
                            setShowModal(true);
                          }}
                        >
                          Modifica
                        </Button>{" "}
                        <Button
                          size="sm"
                          onClick={() => deleteCourse(course.id)}
                          className="login-button border border-none text-white btn-danger mt-1 px-4"
                        >
                          Elimina
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Modifica corso</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdate();
            }}
            className="mx-auto"
            style={{ maxWidth: "800px" }}
          >
            <Form.Group controlId="titleModal">
              <Form.Label>Titolo</Form.Label>
              <Form.Control
                type="text"
                placeholder="Inserisci il titolo del corso"
                value={titleModal}
                onChange={(e) => setTitleModal(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="descriptionModal">
              <Form.Label>Descrizione</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Inserisci la descrizione del corso"
                value={descriptionModal}
                onChange={(e) => setDescriptionModal(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="priceModal">
              <Form.Label>Prezzo</Form.Label>
              <Form.Control
                type="number"
                placeholder="Inserisci il prezzo del corso"
                value={priceModal}
                onChange={(e) => setPriceModal(e.target.value)}
                required
              />
            </Form.Group>

            <div className="text-center">
              <Button variant="primary" type="submit" className="mt-3">
                Aggiorna Corso
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      <h1 className="text-center mt-5">Crea un nuovo corso</h1>
      <Form onSubmit={handleSubmit} className="mx-auto lh-lg" style={{ maxWidth: "800px" }}>
        <Form.Group controlId="title">
          <Form.Label>Titolo</Form.Label>
          <Form.Control
            type="text"
            placeholder="Inserisci il titolo del corso"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="description">
          <Form.Label>Descrizione</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            placeholder="Inserisci la descrizione del corso"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="price">
          <Form.Label>Prezzo</Form.Label>
          <Form.Control
            type="number"
            placeholder="Inserisci il prezzo del corso"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="courseImage">
          <Form.Label>Immagine del Corso</Form.Label>
          <Form.Control type="file" onChange={(e) => setCourseImage(e.target.files[0])} />
        </Form.Group>

        <Form.Group controlId="courseVideo">
          <Form.Label>Video del corso (URL di YouTube)</Form.Label>
          <Form.Control
            type="text"
            placeholder="Inserisci l'URL del video di YouTube"
            value={courseVideoUrl}
            onChange={(e) => setCourseVideoUrl(e.target.value)}
          />
        </Form.Group>

        <div className="text-center">
          <Button className="login-button border border-none mt-3 fw-semibold" type="submit">
            Crea Corso
          </Button>
        </div>
      </Form>

      {/* Form per la creazione di una nuova lezione */}
      <h1 className="text-center mt-5">Crea una nuova lezione</h1>
      <Form onSubmit={handleLessonSubmit} className="mx-auto lh-lg" style={{ maxWidth: "800px" }}>
        <Form.Group controlId="lessonTitle">
          <Form.Label>Titolo Lezione</Form.Label>
          <Form.Control
            type="text"
            placeholder="Inserisci il titolo della lezione"
            value={lessonTitle}
            onChange={(e) => setLessonTitle(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="lessonContent">
          <Form.Label>Contenuto Lezione</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            placeholder="Inserisci il contenuto della lezione"
            value={lessonContent}
            onChange={(e) => setLessonContent(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="lessonCourseId">
          <Form.Label>Seleziona il Corso</Form.Label>
          <Form.Control as="select" value={lessonCourseId} onChange={(e) => setLessonCourseId(e.target.value)} required>
            <option value="">Seleziona un corso...</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.title}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="lessonLanguage">
          <Form.Label>Lingua Lezione</Form.Label>
          <Form.Control
            type="text"
            placeholder="linguaggio/i utilizzato"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            required
          />
        </Form.Group>

        <div className="text-center">
          <Button className="login-button border border-none mt-3 fw-semibold" type="submit">
            Crea Lezione
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default Teacher;

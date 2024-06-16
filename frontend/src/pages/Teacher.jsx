import React, { useEffect, useState } from "react";
import { Container, Form, Button, Table, Modal } from "react-bootstrap";
import axios from "axios";

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

    const newCourse = {
      title,
      description,
      price,
    };

    axios
      .post("/api/courses", newCourse)
      .then((response) => {
        console.log("Corso creato con successo:", response.data);
        fetchCourses(); // Aggiorna la lista dei corsi dopo la creazione
        setTitle("");
        setDescription("");
        setPrice("");
      })
      .catch((error) => {
        console.error("Errore durante la creazione del corso:", error);
      });
  };

  const deleteCourse = (courseId) => {
    axios
      .delete(`/api/courses/${courseId}`)
      .then((response) => {
        console.log("Corso eliminato con successo:", response.data);
        fetchCourses(); // Aggiorna la lista dei corsi dopo l'eliminazione
      })
      .catch((error) => {
        console.error("Errore durante l'eliminazione del corso:", error);
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
        handleCloseModal(); // Chiudi il modale dopo l'aggiornamento
      })
      .catch((error) => {
        console.error("Errore durante l'aggiornamento del corso:", error);
      });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCourse(null); // Resetta lo stato del corso selezionato dopo la chiusura del modale
    setTitleModal("");
    setDescriptionModal("");
    setPriceModal("");
  };

  return (
    <Container>
      <div className="text-center mt-5">
        <h1>Courses List</h1>
        <Table striped bordered hover responsive="sm" className="mx-auto" style={{ maxWidth: "1000px" }}>
          <thead>
            <tr>
              <th className="text-center">Title</th>
              <th className="text-center">Description</th>
              <th className="text-center">Price</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.id}>
                <td className="align-middle">{course.title}</td>
                <td className="align-middle">{course.description}</td>
                <td className="align-middle">${course.price}</td>
                <td className="align-middle">
                  <div className="d-flex flex-column align-items-center">
                    <Button
                      variant="info"
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
                    <Button variant="danger" size="sm" onClick={() => deleteCourse(course.id)} className="mt-1 w-100">
                      Elimina
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

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
              <Button variant="primary" type="submit">
                Aggiorna Corso
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      <h1 className="text-center mt-5">Crea un nuovo corso</h1>
      <Form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: "800px" }}>
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

        <div className="text-center">
          <Button variant="primary" type="submit">
            Crea Corso
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default Teacher;

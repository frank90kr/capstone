import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Accordion, Row, Container, Col, Form, Button, Alert } from "react-bootstrap";
import { BsStarFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { format } from "date-fns"; // Importa la funzione di formattazione data
import YouTube from "react-youtube"; // Importa il componente YouTube
import "./Lessons.css";

const Lessons = () => {
  const [lessons, setLessons] = useState([]);
  const [course, setCourse] = useState({});
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([]);
  const [showAlert, setShowAlert] = useState(false); // Stato per mostrare l'Alert
  const [alertMessage, setAlertMessage] = useState(""); // Messaggio da mostrare nell'Alert
  const { id } = useParams();

  const userName = useSelector((state) => state.user?.name); // Stato per nome utente
  const userRole = useSelector((state) => state.user?.role); // Stato per ruolo utente

  useEffect(() => {
    // Ottieni i dettagli del corso
    axios
      .get(`/api/course/${id}`)
      .then((res) => {
        console.log(res.data);
        setCourse(res.data);
        setLessons(res.data.lessons);
      })
      .catch((err) => console.error(err));
  }, [id]);

  useEffect(() => {
    // Ottieni le recensioni
    axios
      .get(`/api/courses/${id}/reviews`)
      .then((res) => {
        console.log(res.data);
        setReviews(res.data || []);
      })
      .catch((err) => console.error(err));
  }, [id]);

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleReviewChange = (e) => {
    setReview(e.target.value);
  };

  const handleSubmitReview = () => {
    // invio della recensione al backend
    const reviewData = {
      rating: rating,
      review: review,
      courseId: id,
    };

    // Invio dati
    axios
      .post(`/api/courses/${id}/reviews`, reviewData)
      .then((res) => {
        console.log("Recensione inviata con successo:", res.data);
        setReviews([...reviews, { ...res.data, user: { name: userName } }]); // Aggiorna le recensioni con la nuova recensione
        setRating(0); // Resetta la valutazione
        setReview(""); // Resetta la recensione
        setShowAlert(true); // Mostra l'Alert di successo
        setAlertMessage("Recensione inserita con successo!"); // Imposta il messaggio dell'Alert
      })
      .catch((err) => {
        console.error("Errore durante l'invio della recensione:", err);
      });
  };

  // Funzione per estrarre l'ID del video da un URL di YouTube
  const getYoutubeVideoId = (url) => {
    if (!url) return null;
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const youtubeVideoId = getYoutubeVideoId(course.youtube_video);

  return (
    <Container>
      <Row className="container-img-lesson justify-content-center">
        <img
          className="hero-lessons d-block img-fluid"
          src={"http://localhost:8000/" + course.image}
          alt={course.title}
        />
      </Row>
      <Row className="mt-5">
        <Col md={12}>
          {youtubeVideoId && <YouTube videoId={youtubeVideoId} opts={{ width: "100%", height: "450px" }} />}
        </Col>
      </Row>
      <div className="container mt-4">
        <h1 className="text-center mb-4">Lezioni del Corso</h1>
        <p className="text-center mb-4">Creato da: {course.creator_name}</p> {/* Mostra il nome del creatore */}
        <Row className="justify-content-center">
          <Col xs={12} md={10}>
            <Accordion flush className="mt-5">
              {lessons.map((lesson) => (
                <Accordion.Item key={lesson.id} eventKey={lesson.id}>
                  <Accordion.Header>
                    <div className="d-flex w-100 justify-content-between mx-2">
                      <h5 className="mb-1">{lesson.title}</h5>
                      <small>{lesson.language}</small>
                    </div>
                  </Accordion.Header>
                  <Accordion.Body>
                    <p className="lh-lg">{lesson.content}</p>
                    <small>Corso ID: {lesson.id}</small>
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
            <div className="mt-5">
              <h2 className="mb-3">Lascia un feedback</h2>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Rating</Form.Label>
                  <div className="rating-stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <BsStarFill
                        key={star}
                        className={`star ${rating >= star ? "star-filled" : ""}`}
                        onClick={() => handleRatingChange(star)}
                      />
                    ))}
                  </div>
                  {/* Alert per mostrare il messaggio di successo */}
                  {showAlert && (
                    <Alert variant="success" onClose={() => setShowAlert(false)} dismissible className="mt-4">
                      {alertMessage}
                    </Alert>
                  )}
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Recensione</Form.Label>
                  <Form.Control as="textarea" rows={3} value={review} onChange={handleReviewChange} />
                </Form.Group>
                <Button className="login-button border border-none text-white" onClick={handleSubmitReview}>
                  Invia
                </Button>
              </Form>
              <div className="mt-4">
                <h3>Recensioni</h3>
                {reviews.length > 0 ? (
                  reviews.map((rev, index) => (
                    <div key={index} className="review mt-2">
                      <div className="rating-stars">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <BsStarFill key={star} className={`star ${rev.rating >= star ? "star-filled" : ""}`} />
                        ))}
                      </div>
                      <p className="mt-3">{rev.review}</p>
                      <hr></hr>
                      <div className="d-flex flex-column">
                        <small>
                          da: <span className="fw-semibold">{rev.user.name}</span>
                        </small>
                        <small>
                          Ruolo: <span className="fw-semibold"> {userRole}</span>{" "}
                        </small>
                        <small className="ms-auto">{format(new Date(rev.created_at), "dd/MM/yyyy HH:mm:ss")}</small>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>Nessuna recensione disponibile.</p>
                )}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default Lessons;

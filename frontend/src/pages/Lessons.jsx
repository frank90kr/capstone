import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Accordion, Row, Container, Col } from "react-bootstrap";
// import YouTube from "react-youtube";
import "./Lessons.css";

const Lessons = () => {
  const [lessons, setLessons] = useState([]);
  const [course, setCourse] = useState({});
  const { id } = useParams();

  useEffect(() => {
    // Ottieni i dettagli del corso
    axios
      .get(`/api/course/${id}`)
      .then((res) => {
        setCourse(res.data);
        setLessons(res.data.lessons);
      })
      .catch((err) => console.error(err));
  }, [id]);

  // // Estrai l'ID del video da course.video_url
  // const videoId = course.video_url ? course.video_url.split("v=")[1] : null;

  return (
    <Container>
      <Row className="container-img-lesson justify-content-center">
        <img
          className="hero-lessons d-block img-fluid"
          src={"http://localhost:8000/" + course.image}
          alt={course.title}
        />
      </Row>
      {/* <Row className="mt-4 justify-content-center">
        <Col xs={10} sm={10} lg={8}>
          <div className="video-container mt-3">
            {videoId && (
              <YouTube
                videoId={videoId} // Passa solo l'ID del video
                className="embed-responsive-item"
                containerClassName="embed-responsive embed-responsive-16by9"
                opts={{ playerVars: { autoplay: 0 } }}
              />
            )}
          </div>
        </Col>
      </Row> */}
      <div className="container mt-4">
        <h1 className="text-center mb-4">Lezioni del Corso</h1>
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
                    <small>corso Id{lesson.id}</small>
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default Lessons;

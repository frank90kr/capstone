import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Container, Card, Col, Row, ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import "./PurchasedCourses.css";

const PurchasedCourses = () => {
  const [purchasedCourses, setPurchasedCourses] = useState([]);

  const userName = useSelector((state) => {
    return state.user?.name;
  }); // stato per nome utente
  const userEmail = useSelector((state) => {
    return state.user?.email;
  }); // stato per email utente
  const userRole = useSelector((state) => {
    return state.user?.role;
  }); // stato per ruolo utente

  useEffect(() => {
    axios
      .get("/api/user/purchased-courses")
      .then((res) => {
        setPurchasedCourses(res.data);
      })
      .catch((error) => {
        console.error("Errore nel recupero dei corsi acquistati:", error);
      });
  }, []);

  return (
    <Container>
      <h1 className="text-center title fw-bold dysplay-1">Bentornato {userName}!</h1>
      <h2 className="text-center mt-5 display-6">Corsi Acquistati</h2>

      <Row className="flex-column align-items-center mt-2">
        <Col>
          <p className="display-6">Profilo utente</p>
          <ListGroup.Item>username: {userName}</ListGroup.Item>
          <hr className="w-25" />
          <ListGroup.Item>e-mail: {userEmail}</ListGroup.Item>
          <hr className="w-25" />
          <ListGroup.Item>role: {userRole}</ListGroup.Item>
        </Col>
      </Row>

      <Row className="justify-content-center mt-5">
        {purchasedCourses.length > 0 ? (
          purchasedCourses.map((course) => (
            <Col key={course.id} md={6} lg={4} className="mb-4">
              <Card className="card-course-purchased">
                <Card.Img variant="top" src={course.image} alt={course.title} />
                <Card.Body>
                  <Card.Title>{course.title}</Card.Title>
                  <Card.Text>{course.description}</Card.Text>
                </Card.Body>
                <Card.Footer>
                  <Link to={`/lessons/${course.id}`} className="btn login-button text-white">
                    Vai al corso
                  </Link>
                </Card.Footer>
              </Card>
            </Col>
          ))
        ) : (
          <Col md={8} className="text-center">
            <p className="text-danger fs-5">Non hai ancora acquistato nessun corso.</p>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default PurchasedCourses;

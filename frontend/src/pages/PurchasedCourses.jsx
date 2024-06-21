import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Container, Card, Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import "./PurchasedCourses.css";

const PurchasedCourses = () => {
  const [purchasedCourses, setPurchasedCourses] = useState([]);
  const userRole = useSelector((state) => state.user?.role);

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
    <Container fluid>
      <h2 className="text-center title  mb-4">I Tuoi Corsi Acquistati</h2>

      <Row className="justify-content-center">
        {purchasedCourses.length > 0 ? (
          purchasedCourses.map((course) => (
            <Col key={course.id} md={6} lg={4} className="mb-4">
              <Card className="h-100">
                <Card.Img variant="top" src={course.image} alt={course.title} />
                <Card.Body>
                  <Card.Title>{course.title}</Card.Title>
                  <Card.Text>{course.description}</Card.Text>
                </Card.Body>
                <Card.Footer>
                  <Link to={`/lessons/${course.id}`} className="btn btn-primary">
                    Vai al corso
                  </Link>
                </Card.Footer>
              </Card>
            </Col>
          ))
        ) : (
          <Col md={8} className="text-center">
            <p>Non hai ancora acquistato nessun corso.</p>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default PurchasedCourses;

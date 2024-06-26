import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { Button, Col, Container, Form, Row, Spinner, Alert, Offcanvas } from "react-bootstrap";
import "./PaymentForm.css";

const PaymentForm = () => {
  const [courseId, setCourseId] = useState("");
  const [amount, setAmount] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mostraDettagliCorso, setMostraDettagliCorso] = useState(false);
  const [hasPurchased, setHasPurchased] = useState(false);

  const params = useParams();

  useEffect(() => {
    setCourseId(params.course_id);
    setAmount(params.course_price);
    setTitle(params.course_title);

    const checkPurchase = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/check-purchase",
          { course_id: params.course_id },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setHasPurchased(response.data.hasPurchased);
      } catch (error) {
        console.error("Error checking purchase status:", error);
      }
    };

    checkPurchase();
  }, [params]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (hasPurchased) {
      setError("Hai già acquistato questo corso.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/payments",
        {
          course_id: courseId,
          amount,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setMessage(`Pagamento avvenuto con successo: ${response.data.payment.id}`);
      setMostraDettagliCorso(true);
      setHasPurchased(true);
    } catch (error) {
      setError("Pagamento fallito");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Row className="justify-content-center align-items-center min-vh-100">
        <Col md={4} className="mx-auto">
          <h4>Esegui il pagamento</h4>
          <Form className="" onSubmit={handleSubmit} noValidate>
            <Form.Group className="mt-3 mb-3" controlId="formCourseId">
              <Form.Label>ID Corso:</Form.Label>
              <Form.Control
                size="lg"
                type="text"
                value={courseId}
                onChange={(e) => setCourseId(e.target.value)}
                required
                readOnly
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formCourseTitle">
              <Form.Label>Corso:</Form.Label>
              <Form.Control
                size="lg"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                readOnly
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="formAmount">
              <Form.Label>Importo:</Form.Label>
              <Form.Control
                size="lg"
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                readOnly
              />
            </Form.Group>

            <Button
              className="login-button w-100 fw-bold fs-6 text-white border border-none"
              variant="primary"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner animation="border" size="sm" className="custom-spinner" /> Attendi...
                </>
              ) : (
                "Paga"
              )}
            </Button>

            {error && (
              <Alert className="mt-3" variant="danger">
                {error}
              </Alert>
            )}

            {message && (
              <Alert className="mt-3" variant="success">
                {message}
              </Alert>
            )}

            <div className="d-flex justify-content-center mt-3">
              <hr className="w-75" />
            </div>
          </Form>
        </Col>
      </Row>

      <Offcanvas show={mostraDettagliCorso} onHide={() => setMostraDettagliCorso(false)}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Complimenti, hai acquistato il corso!</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <p>
            <strong>Corso:</strong> {title}
          </p>
          <p>
            <strong>ID Corso:</strong> {courseId}
          </p>
          <p>
            <strong>Importo:</strong> {amount}
          </p>
          <Link to={`/lessons/${params.course_id}`} className="btn btn-success mt-3">
            Vai al corso
          </Link>{" "}
          <Button variant="secondary" className="mt-3" onClick={() => setMostraDettagliCorso(false)}>
            Chiudi
          </Button>
        </Offcanvas.Body>
      </Offcanvas>
    </Container>
  );
};

export default PaymentForm;

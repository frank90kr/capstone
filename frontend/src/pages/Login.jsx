import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { LOGIN } from "../redux/actions";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const updateInputValue = (ev) => {
    setFormData((oldFormData) => ({
      ...oldFormData,
      [ev.target.name]: ev.target.value,
    }));
  };

  const submitLogin = (ev) => {
    ev.preventDefault();

    axios
      .get("/sanctum/csrf-cookie")
      .then(() => axios.post("/login", formData))
      .then(() => axios.get("/api/user"))
      .then((res) => {
        // salvare i dati dello user nel Redux state
        dispatch({ type: LOGIN, payload: res.data });
        // reindirizzare alla pagina home
        navigate("/");
      })
      .catch((error) => {
        console.error("Login failed:", error);
        setError("Le tue credenziali sono errate");
      });
  };

  return (
    <Container className="">
      <Row className="d-flex justify-content-center align-items-center min-vh-100">
        <Col md={4} className="mx-auto">
          <h4>Accedi al tuo account</h4>
          <Form onSubmit={(ev) => submitLogin(ev)} noValidate>
            <Form.Group className="mt-3 mb-3" controlId="formBasicEmail">
              <Form.Control
                size="lg"
                type="email"
                name="email"
                id="email"
                onChange={(ev) => updateInputValue(ev)}
                value={formData.email}
                placeholder="e-mail"
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>

            <Form.Group className="mb-4" controlId="formBasicPassword">
              <Form.Control
                size="lg"
                type="password"
                name="password"
                id="password"
                onChange={(ev) => updateInputValue(ev)}
                value={formData.password}
                placeholder="password"
              />
            </Form.Group>
            <Button className="login-button w-100 fw-bold fs-6 text-white" variant=" mt-3" type="submit">
              Login
            </Button>
            {error && (
              <Alert className="mt-3" variant="danger">
                {error}
              </Alert>
            )}
            <div className="d-flex justify-content-center mt-3">
              <hr className="w-75" />
            </div>
            <p className="text-center">
              Non hai un account?{" "}
              <Link className="text-decoration-none ms-1" to="/register">
                {" "}
                Registrati
              </Link>
            </p>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;

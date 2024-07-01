import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Alert, Spinner, FormControl, InputGroup } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { LOGIN } from "../redux/actions";
import { PiEyeThin } from "react-icons/pi";
import { PiEyeSlashThin } from "react-icons/pi";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Stato per gestire il caricamento

  const updateInputValue = (ev) => {
    setFormData((oldFormData) => ({
      ...oldFormData,
      [ev.target.name]: ev.target.value,
    }));
  };

  const submitLogin = (ev) => {
    ev.preventDefault();
    setLoading(true); // Imposta lo stato di caricamento a true

    axios
      .get("/sanctum/csrf-cookie")
      .then(() => axios.post("/login", formData))
      .then(() => axios.get("/api/user"))
      .then((res) => {
        dispatch({ type: LOGIN, payload: res.data });
        navigate("/"); // Reindirizza alla home dopo il login
      })
      .catch((error) => {
        console.error("Login failed:", error);
        setError("Le tue credenziali sono errate");
      })
      .finally(() => {
        setLoading(false); // Imposta lo stato di caricamento a false alla fine del processo
      });
  };

  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <Container>
      <Row className="justify-content-center align-items-center min-vh-100">
        <Col md={4} className="mx-auto">
          <h4>Accedi al tuo account</h4>
          <Form onSubmit={(ev) => submitLogin(ev)} noValidate>
            <Form.Group className="mt-3 mb-3" controlId="formBasicEmail">
              <Form.Control
                size="md"
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
              <InputGroup>
                <FormControl
                  size="md"
                  type={passwordVisible ? "text" : "password"}
                  name="password"
                  id="password"
                  onChange={(ev) => updateInputValue(ev)}
                  value={formData.password}
                  placeholder="Password"
                />
                <InputGroup.Text onClick={togglePasswordVisibility} style={{ cursor: "pointer" }}>
                  {passwordVisible ? <PiEyeThin /> : <PiEyeSlashThin />}
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
            <p className="text-secondary lead fs-6 ms-1">La password deve contenere almeno 8 caratteri</p>

            <Button
              className="login-button w-100 fw-bold fs-6 text-white"
              variant=" mt-3"
              type="submit"
              disabled={loading}
            >
              {loading ? <Spinner animation="border" size="sm" /> : "Login"}
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

import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { LOGIN } from "../redux/actions";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "user", // 'user' come valore predefinito
    password: "",
    password_confirmation: "",
  });

  const [errors, setErrors] = useState(null);

  const updateInputValue = (ev) => {
    const { name, value } = ev.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const submitLogin = (ev) => {
    ev.preventDefault();
    axios
      .get("/sanctum/csrf-cookie")
      .then(() => {
        const body = new FormData();
        body.append("name", formData.name);
        body.append("email", formData.email);
        body.append("role", formData.role);
        body.append("password", formData.password);
        body.append("password_confirmation", formData.password_confirmation);

        return axios.post("/register", body);
      })
      .then(() => axios.get("/api/user"))
      .then((res) => {
        // Salvare i dati dell'utente nello stato Redux
        dispatch({
          type: LOGIN,
          payload: res.data,
        });
        //reindirizza alla home
        navigate("/");
      })
      .catch((err) => {
        console.log(err.response.data.errors);
        setErrors(err.response.data.errors);
      });
  };

  return (
    <Container className="">
      <Row className="d-flex justify-content-center align-items-center min-vh-100 mt-5">
        <Col md={4} className="mx-auto">
          <h4>Registrati</h4>
          <Form className="mb-5" onSubmit={(ev) => submitLogin(ev)} noValidate>
            <Form.Group className="mt-3 mb-3" controlId="formBasicUsername">
              <Form.Control
                size="lg"
                type="text"
                name="name"
                id="name"
                onChange={(ev) => updateInputValue(ev)}
                value={formData.name}
                placeholder="nome"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                size="lg"
                type="email"
                name="email"
                id="email"
                onChange={(ev) => updateInputValue(ev)}
                value={formData.email}
                placeholder="e-mail"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Ruolo</Form.Label>
              <div>
                <Form.Check
                  inline
                  label="User"
                  type="radio"
                  id="user"
                  name="role"
                  value="user"
                  onChange={(ev) => updateInputValue(ev)}
                  checked={formData.role === "user"}
                />
                <Form.Check
                  inline
                  label="Teacher"
                  type="radio"
                  id="teacher"
                  name="role"
                  value="teacher"
                  onChange={(ev) => updateInputValue(ev)}
                  checked={formData.role === "teacher"}
                />
              </div>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                type="password"
                name="password"
                id="password"
                onChange={(ev) => updateInputValue(ev)}
                value={formData.password}
                placeholder="Password"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPasswordConfirm">
              <Form.Control
                type="password"
                name="password_confirmation"
                id="password_confirmation"
                onChange={(ev) => updateInputValue(ev)}
                value={formData.password_confirmation}
                placeholder="Conferma la password"
              />
            </Form.Group>

            <Button className="login-button w-100 fw-bold fs-6 text-white" variant=" mt-3" type="submit">
              Registrati
            </Button>
            <p className="lead fs-6 mt-3 text-center">
              Effettuando la registrazione, accetti i nostri Termini di utilizzo e la nostra Informativa sulla privacy.
            </p>
            <div className="d-flex justify-content-center">
              <hr className="w-75" />
            </div>
            <p className="text-center">
              Hai già un account?{" "}
              <Link className="text-decoration-none ms-1" to="/login">
                {" "}
                Login
              </Link>
            </p>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;

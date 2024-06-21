import React from "react";
import { Container, Nav, Navbar, Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./TopNav.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"; // Importa useDispatch e useSelector da react-redux
import axios from "axios";
import { LOGOUT } from "../redux/actions";
import { MdAdminPanelSettings } from "react-icons/md";
import { FaUserGraduate } from "react-icons/fa";

const TopNav = () => {
  const dispatch = useDispatch(); // Ottieni la funzione dispatch per inviare azioni a Redux
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const logout = () => {
    axios
      .post("/logout")
      .then(() => {
        dispatch({ type: LOGOUT }); // Invia l'azione di logout a Redux
        navigate("/login");
      })
      .catch((error) => {
        console.error("Logout fallito:", error);
      });
  };

  return (
    <>
      <Navbar expand="lg" className="navbar navbar-expand-lg fixed-top">
        <Container>
          <Navbar.Brand className="me-auto">
            <Link className="navbar-brand" to="/">
              Navbar
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarNav" />
          <Navbar.Collapse id="navbarNav">
            <Nav className="justify-content-end flex-grow-1 gap-1 navbar-nav">
              <Nav.Link as={Link} to="/courses-list" className="link-nav mx-lg-2">
                Corsi
              </Nav.Link>

              <Nav.Link className="link-nav mx-lg-2" href="/quiz">
                Quiz
              </Nav.Link>
              <Nav.Link className="link-nav mx-lg-2" href="#action2">
                About
              </Nav.Link>
              <Nav.Link className="link-nav mx-lg-2" href="#action3">
                Services
              </Nav.Link>
              <Nav.Link className="link-nav mx-lg-2" href="#action4">
                Contact
              </Nav.Link>
            </Nav>

            <Nav className="justify-content-end flex-grow-1 gap-1 navbar-nav">
              {user && user.role === "teacher" ? (
                <div className="d-flex align-items-center">
                  <MdAdminPanelSettings className="me-2" />
                  <Dropdown>
                    <Dropdown.Toggle className="user-login text-decoration-none" variant="link" id="dropdown-basic">
                      {user.name}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item as={Link} to="/teacher">
                        Gestione Corsi
                      </Dropdown.Item>
                      <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              ) : user ? (
                <div className="d-flex align-items-center">
                  <FaUserGraduate className="me-2" />
                  <Dropdown>
                    <Dropdown.Toggle className="user-login text-decoration-none" variant="link" id="dropdown-basic">
                      {user.name}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item as={Link} to="/purchase-courses">
                        I Miei Corsi
                      </Dropdown.Item>
                      <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              ) : (
                <>
                  <Nav.Link className="login-button text-white px-4 mt-1" href="/login">
                    Login
                  </Nav.Link>
                  <Nav.Link className="px-4" href="/register">
                    Registrati
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default TopNav;

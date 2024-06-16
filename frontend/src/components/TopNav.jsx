import React, { useState } from "react";
import { Container, Nav, Navbar, Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./TopNav.css"; // Se necessario per stili personalizzati
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LOGOUT } from "../redux/actions";
import axios from "axios";

const TopNav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [showCorsiMenu, setShowCorsiMenu] = useState(false);

  const logout = () => {
    axios
      .post("/logout")
      .then(() => {
        dispatch({ type: LOGOUT });
        navigate("/login");
      })
      .catch((error) => {
        console.error("Logout failed:", error);
      });
  };

  return (
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
            <Dropdown
              show={showCorsiMenu}
              onMouseEnter={() => setShowCorsiMenu(true)}
              onMouseLeave={() => setShowCorsiMenu(false)}
              className="dropdown-corsi"
            >
              <Nav.Link as={Link} to="/courses-list" className="link-nav mx-lg-2">
                Corsi
              </Nav.Link>

              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/lessons/1">
                  Corso 1
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/lessons/2">
                  Corso 2
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/lessons/3">
                  Corso 3
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/lessons/4">
                  Corso 4
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

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
            {user ? (
              <Dropdown>
                <Dropdown.Toggle className="user-login text-decoration-none" variant="link" id="dropdown-basic">
                  {user.name}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/teacher">
                    Profilo
                  </Dropdown.Item>
                  <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <>
                <Nav.Link className="login-button text-white px-4" href="/login">
                  Login
                </Nav.Link>
                <Nav.Link className=" px-4" href="/register">
                  Registrati
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default TopNav;

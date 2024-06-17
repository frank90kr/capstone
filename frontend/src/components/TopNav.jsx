import React, { useState, useEffect } from "react";
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
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Funzione per ottenere i dati dei corsi disponibili
    const fetchCourses = async () => {
      try {
        const response = await axios.get("/api/courses"); // Assumi che ci sia un'API che fornisce i dati dei corsi
        setCourses(response.data); // Imposta i corsi nello stato
      } catch (error) {
        console.error("Errore nel recupero dei corsi:", error);
      }
    };

    fetchCourses(); // Chiama la funzione di fetch dei corsi all'avvio del componente
  }, []);

  const logout = () => {
    axios
      .post("/logout")
      .then(() => {
        dispatch({ type: LOGOUT });
        navigate("/login");
      })
      .catch((error) => {
        console.error("Logout fallito:", error);
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
                {courses.map((course) => (
                  <Dropdown.Item key={course.id} as={Link} to={`/lessons/${course.id}`}>
                    {course.title}
                  </Dropdown.Item>
                ))}
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
            {user && user.role === "teacher" ? (
              <Dropdown>
                <Dropdown.Toggle className="user-login text-decoration-none" variant="link" id="dropdown-basic">
                  {user.name}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/teacher">
                    Modifica
                  </Dropdown.Item>
                  <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : user ? (
              <>
                <Dropdown>
                  <Dropdown.Toggle className="user-login text-decoration-none" variant="link" id="dropdown-basic">
                    {user.name}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </>
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

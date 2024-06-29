import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Container fluid>
      <Row className="footer py-5 mt-5">
        <Col xs={12} md={4}>
          <small className="d-block mb-3">© 2024</small>
        </Col>
        <Col xs={6} md={2}>
          <h5>Menu</h5>
          <ul className="list-unstyled text-small">
            <li>
              <Link to="#" className="footer-link">
                Corsi
              </Link>
            </li>
            <li>
              <Link to="#" className="footer-link">
                Quiz
              </Link>
            </li>
            <li>
              <Link to="#" className="footer-link">
                About
              </Link>
            </li>
            <li>
              <Link to="#" className="footer-link">
                Contatti
              </Link>
            </li>
          </ul>
        </Col>
        <Col xs={6} md={2}>
          <h5>Link utili</h5>
          <ul className="list-unstyled text-small">
            <li>
              <Link to="#" className="footer-link">
                Chi siamo
              </Link>
            </li>
            <li>
              <Link to="#" className="footer-link">
                FAQ
              </Link>
            </li>
            <li>
              <Link to="#" className="footer-link">
                Termini di servizio
              </Link>
            </li>
            <li>
              <Link to="#" className="footer-link">
                Privacy
              </Link>
            </li>
          </ul>
        </Col>
        <Col xs={6} md={2}>
          <h5>Partner</h5>
          <ul className="list-unstyled text-small">
            <li>
              <Link to="#" className="footer-link">
                Google
              </Link>
            </li>
            <li>
              <Link to="#" className="footer-link">
                Udemy
              </Link>
            </li>
            <li>
              <Link to="#" className="footer-link">
                CodeCademy
              </Link>
            </li>
            <li>
              <Link to="#" className="footer-link">
                Meta
              </Link>
            </li>
          </ul>
        </Col>
      </Row>
    </Container>
  );
};
export default Footer;

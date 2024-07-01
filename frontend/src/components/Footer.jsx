import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <Container fluid>
      <Row className="footer py-5 mt-5">
        <Col xs={12} md={4}>
          <p className="fw-bold fs-5">Dev NeXt</p>
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
        <Col xs={12}>
          <hr className="hr-footer bg-white opacity-100 mt-3" />
          <small className="d-block ">© 2024</small>
        </Col>
      </Row>
    </Container>
  );
};
export default Footer;

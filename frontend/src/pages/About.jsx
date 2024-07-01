import { Col, Container, Row } from "react-bootstrap";

const About = () => {
  return (
    <Container>
      <Row>
        <Col xs={12}>
          <h1 className="quiz-title text-center dysplay-1">About</h1>
        </Col>
        <Col xs={12} className="py-4">
          <h2 className=" dysplay-2">Chi Siamo</h2>
          <p className="py-1">
            <span className="text-success">DevNeXt</span> rappresenta l'innovazione nell'e-learning per gli appassionati
            di programmazione di tutte le esperienze. Fondata con la missione di rendere l'apprendimento della
            programmazione accessibile e gratificante per tutti, ci impegniamo a fornire corsi di alta qualità che
            combinano teoria e pratica in un ambiente stimolante e interattivo.
          </p>
          <p>
            Offriamo una vasta gamma di corsi progettati per soddisfare le esigenze di studenti principianti e avanzati.
            I nostri corsi coprono una varietà di linguaggi di programmazione, framework e concetti fondamentali,
            preparando gli studenti per eccellere nel loro percorso professionale nel mondo della tecnologia.
          </p>
        </Col>
        <Col xs={12} className="py-4">
          <h2 className="dysplay-2">La Nostra Visione</h2>
          <p>
            Vogliamo creare una comunità globale di studenti appassionati di programmazione, supportata da docenti
            esperti e risorse educative all'avanguardia. Vogliamo essere il partner di fiducia per tutti coloro che
            desiderano acquisire competenze tecnologiche essenziali e avanzare nella propria carriera nel campo della
            programmazione.
          </p>
        </Col>
        <Col xs={12} className="py-4">
          <h2 className="dysplay-2">Contatti</h2>
          <p>Email: devnext@info.com</p>
          <p>Telefono: +39 123456789</p>
          <p>Orari: 10:00/17:00 da Lunedì a Venerdì</p>
        </Col>
      </Row>
    </Container>
  );
};

export default About;

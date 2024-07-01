import "bootstrap/dist/css/bootstrap.min.css";
import Lottie from "lottie-react";
import animationData from "../assets/Animation - hero-test.json";
import "./Home.css";
import { Button, Card, Carousel, Col, Container, Modal, Nav, Row } from "react-bootstrap";
import { CgFileDocument } from "react-icons/cg";
import { PiVideoLight } from "react-icons/pi";
import { MdComputer } from "react-icons/md";
import section2AnimationData from "../assets/Animation - section2.json";

import sectionQuiz2ndAnimationData from "../assets/2nd quizSection.json";
import sectionTeacher from "../assets/teacher-home.json";
// import { GiTeacher } from "react-icons/gi";
import { FaLaptopHouse } from "react-icons/fa";
// import { MdQuiz } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaQuoteLeft } from "react-icons/fa6";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { BiSolidRightArrow } from "react-icons/bi";
import { BiSolidLeftArrow } from "react-icons/bi";
import { MdAdsClick } from "react-icons/md";

import Tilt from "react-parallax-tilt";

const Home = () => {
  const [courses, setCourses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [userHasPurchased, setUserHasPurchased] = useState(false);
  const navigate = useNavigate();
  const userRole = useSelector((state) => state.user?.role);

  useEffect(() => {
    axios
      .get("/api/courses")
      .then((res) => {
        setCourses(res.data);
      })
      .catch((err) => console.error("Error fetching courses:", err));

    axios
      .get("/api/user/authenticated")
      .then((response) => {
        setAuthenticated(response.data.authenticated);
      })
      .catch((error) => {
        console.error("Error checking authentication:", error);
      });
  }, []);

  const handleAccessCourse = () => {
    if (authenticated) {
      navigate(`/lessons/${selectedCourse.id}`);
      handleCloseModal();
    } else {
      setShowModal(true);
    }
  };

  const handleOpenModal = (course) => {
    setSelectedCourse(course);
    checkCoursePurchase(course.id); // Check purchase status when opening the modal
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCourse(null);
  };

  const handlePurchaseCourse = () => {
    if (userHasPurchased) {
      alert("Hai già acquistato questo corso."); // Notify user if they have already purchased the course
    } else {
      navigate(`/payment/${selectedCourse.id}/${selectedCourse.title}/${selectedCourse.price}`);
    }
    handleCloseModal();
  };

  const checkCoursePurchase = async (courseId) => {
    try {
      const response = await axios.post(
        "/api/check-purchase",
        { course_id: courseId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setUserHasPurchased(response.data.hasPurchased);
    } catch (error) {
      console.error("Error checking purchase status:", error);
    }
  };

  const [activeIndex, setActiveIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setActiveIndex(selectedIndex);
  };

  const handlePrev = () => {
    // setActiveIndex((prevIndex) => (prevIndex === 0 ? courses.length - 1 : prevIndex - 4));
    setActiveIndex((prevIndex) => {
      console.log(prevIndex - 1);
      return prevIndex - 1;
    });
  };

  const handleNext = () => {
    // setActiveIndex((prevIndex) => (prevIndex === courses.length - 1 ? 0 : prevIndex + 4));
    setActiveIndex((prevIndex) => {
      console.log(prevIndex + 1);
      return prevIndex + 1;
    });
  };

  const handleMouseEnter = (event) => {
    event.currentTarget.querySelector(".hover-text").classList.add("aos-animate");
  };

  const handleMouseLeave = (event) => {
    event.currentTarget.querySelector(".hover-text").classList.remove("aos-animate");
  };

  return (
    <div className="body">
      <Container>
        <Row className="hero-body d-sm-flex align-items-baseline mt-5 mt-md-3">
          <Col>
            <div className="hero-text me-3">
              <div className="typewriter">
                <h1 className="title-hero fw-bold">Diventa un Developer</h1>
              </div>
              {/* <h1 className="title-margin">Become a developer</h1> */}
              <p className="p-hero lead">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur officiis
              </p>
              <Nav.Link className="login-button btn-hero text-white text-center" href="/courses-list">
                Scopri i nostri corsi
              </Nav.Link>
              <div className="partner py-3 d-flex justify-content-start">
                <img src="/home_img/Google-Logo.wine.svg" className="sponsor-logo" alt="Google Logo" />
                <img src="/home_img/udemy.svg" className="udemy" alt="Udemy Logo" />
                <img src="/home_img/codecademy-svgrepo-com.svg" className="codecademy" alt="Codecademy Logo" />
                <img src="/home_img/meta-logo-12362.svg" className="meta" alt="Logo" />
              </div>
            </div>
          </Col>
          <Col>
            <div className="div-hero-animation">
              <Tilt
                className="tilt-container"
                tiltMaxAngleX={25}
                tiltMaxAngleY={25}
                perspective={1000}
                scale={1.1}
                transitionSpeed={400}
                gyroscope={true}
              >
                <Lottie
                  className="hero-animation img-fluid px-3 py-2 ms-lg-5"
                  animationData={animationData}
                  loop={true}
                  autoplay={true}
                  rendererSettings={{
                    preserveAspectRatio: "xMidYMid slice",
                  }}
                />
              </Tilt>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Under Hero */}
      <Container fluid className="under-hero" data-aos="fade-up" data-aos-duration="1000">
        <Row className="container-under-hero d-flex justify-content-center align-items-center">
          <Col xs={12} md={4} className="my-3">
            <div className="div-under-hero d-flex align-items-center justify-content-center">
              <div className="div-icon-under-hero d-flex justify-content-center align-items-center">
                <CgFileDocument className="text-white fs-1" />
              </div>
              <div className="ms-4 text-center">
                <h3>Lorem ipsum</h3>
                <p className="lead">Lorem ipsum dolor sit amet.</p>
              </div>
            </div>
          </Col>
          <Col xs={12} md={4} className="my-3">
            <div className="div-under-hero d-flex align-items-center justify-content-center">
              <div className="div-icon-under-hero d-flex justify-content-center align-items-center">
                <PiVideoLight className="text-white fs-1" />
              </div>
              <div className="ms-4 text-center">
                <h3>Lorem ipsum</h3>
                <p className="lead">Lorem ipsum dolor sit amet.</p>
              </div>
            </div>
          </Col>
          <Col xs={12} md={4} className="my-3">
            <div className="div-under-hero d-flex align-items-center justify-content-center">
              <div className="div-icon-under-hero d-flex justify-content-center align-items-center">
                <MdComputer className="text-white fs-1" />
              </div>
              <div className="ms-4 text-center">
                <h3>Lorem ipsum</h3>
                <p className="lead">Lorem ipsum dolor sit amet.</p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Section 2 */}
      <Container fluid className="section2 mt-5" data-aos="fade-right" data-aos-duration="2500">
        <Row className="text-center mb-4">
          <Col xs={12}>
            <h2 className="mt-5">What Kind of Courses of Learning</h2>
            <p className="lead">Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
          </Col>
        </Row>
        <Row className="justify-content-center mb-3 animation-row">
          <Col xs={12} className="d-flex justify-content-center">
            <Lottie
              className="animation-section2"
              animationData={section2AnimationData}
              loop={true}
              data-aos="zoom-in"
              data-aos-duration="5000"
              autoplay={true}
              rendererSettings={{
                preserveAspectRatio: "xMidYMid slice",
              }}
            />
          </Col>
        </Row>

        <Row
          className="text-dark justify-content-center mx-auto mb-4 flex-wrap icon-row"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <Col xs={4} className="d-flex flex-column align-items-center icon1">
            <FaLaptopHouse className="fs-2" />
            {/* Aggiungi size per aumentare le dimensioni dell'icona se necessario */}
            <h4 className="">Courses Lorem ipsum dolor sit amet. </h4>
          </Col>
          <Col xs={4} className="d-flex flex-column align-items-center justify-content-center">
            <FaLaptopHouse className=" fs-2" />
            <h4> Courses Lorem ipsum dolor sit amet.</h4>
          </Col>
          <Col xs={4} className="d-flex flex-column align-items-center justify-content-center icon3">
            <FaLaptopHouse className="fs-2" />
            <h4>Courses Lorem ipsum dolor sit amet.</h4>
          </Col>
        </Row>
      </Container>
      {/* Section3 Card's Course */}
      <Container className="">
        <h2 className="text-center py-4" data-aos="fade-up" data-aos-duration="5000">
          I nostri corsi
        </h2>

        <div className="carousel-arrows-wrapper d-flex justify-content-center mt-3">
          {activeIndex > 0 && (
            <div className="arrow-container" onClick={handlePrev}>
              <BiSolidLeftArrow className="custom-arrow-cards prev-arrow-cards" />
            </div>
          )}
          {activeIndex !== Math.ceil(courses.length / 4) - 1 && (
            <div className="arrow-container" onClick={handleNext}>
              <BiSolidRightArrow className="custom-arrow-cards next-arrow-cards" />
            </div>
          )}
        </div>

        <Row className="justify-content-center flex-nowrap mt-5 mx-auto py-1 px-3">
          <Col>
            <Carousel
              activeIndex={activeIndex}
              onSelect={handleSelect}
              interval={null}
              indicators={false}
              controls={false}
              className="mt-3"
              wrap={false}
            >
              {Array.from(Array(Math.ceil(courses.length / 4)).keys()).map((course, index) => (
                <Carousel.Item key={index}>
                  <Row className="justify-content-around">
                    {courses.slice(activeIndex * 4, (activeIndex + 1) * 4).map((course) => (
                      <Col key={course.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                        <Card
                          className="card border border-2 border-light course-card"
                          onClick={() => handleOpenModal(course)}
                          data-aos="flip-left"
                          data-aos-duration="4000"
                          onMouseEnter={handleMouseEnter}
                          onMouseLeave={handleMouseLeave}
                        >
                          <Card.Img className="course-image rounded-top" variant="top" src={course.image} />
                          <Card.Body>
                            <Card.Title className="text-center">{course.title}</Card.Title>
                            <Card.Text>{course.description}</Card.Text>
                          </Card.Body>
                          <Card.Footer>
                            <div className="hover-text text-center">
                              Vai al corso
                              <MdAdsClick className="" size={28} />
                            </div>
                            <p className="text-center mb-4">Creato da: {course.creator_name}</p>
                            <p>Prezzo: {course.price}</p>
                          </Card.Footer>
                        </Card>
                      </Col>
                    ))}
                    <hr className="w-75" />
                  </Row>
                </Carousel.Item>
              ))}
            </Carousel>
          </Col>
        </Row>

        <div className="carousel-arrows-wrapper d-flex justify-content-center mt-1">
          {activeIndex > 0 && (
            <div className="arrow-container" onClick={handlePrev}>
              <BiSolidLeftArrow className="custom-arrow-cards down prev-arrow-cards" />
            </div>
          )}
          {activeIndex !== Math.ceil(courses.length / 4) - 1 && (
            <div className="arrow-container" onClick={handleNext}>
              <BiSolidRightArrow className="custom-arrow-cards down next-arrow-cards" />
            </div>
          )}
        </div>

        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Corso: {selectedCourse?.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Card.Img src={selectedCourse?.image} alt={selectedCourse?.title} className="img-fluid mb-3" />
            <p>{selectedCourse?.description}</p>
          </Modal.Body>
          <Modal.Footer>
            {authenticated ? (
              userRole === "teacher" || selectedCourse?.price === "0.00" ? (
                <Link to={`/lessons/${selectedCourse?.id}`}>
                  <Button className="login-button border border-none" onClick={handleCloseModal}>
                    Vai al corso
                  </Button>
                </Link>
              ) : userHasPurchased ? (
                <Button className="login-button border border-none" onClick={handleAccessCourse}>
                  Vai al corso
                </Button>
              ) : (
                <Button className="login-button border border-none" onClick={handlePurchaseCourse}>
                  Acquista
                </Button>
              )
            ) : (
              <Link to="/login">
                <Button className="login-button border border-none" onClick={handleCloseModal}>
                  Effettua l'accesso per visualizzare il corso
                </Button>
              </Link>
            )}
            <Button className="login-button close border border-none" onClick={handleCloseModal}>
              Chiudi
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>

      {/* Section 4 Quiz */}
      <Container fluid className=" quiz-section mt-2 py-4" data-aos="fade-up" data-aos-duration="2000" loop={true}>
        <Row className="align-content-center justify-content-center container-quiz-home text-white">
          <Col sm={12} md={9} lg={6} xl={6} xxl={6} className="quiz-col">
            <h2>Divertiti con i nostri quiz!</h2>
            <p className="mb-5 lead">Lorem ipsum dolor sit amet.lorem10 Lorem ipsum dolor sit, amet consectetur</p>
            <Nav.Link className="login-button quiz-home-btn w-50 text-white text-center" href="/scopri-se-fa-per-te">
              l'informatica fa per te?
            </Nav.Link>

            <p className="mt-2 ms-4">Oppure</p>
            <Nav.Link className="login-button quiz-home-btn w-50 text-white text-center" href="/quiz">
              Scegli il quiz
            </Nav.Link>
          </Col>
          <Col sm={1} md={2} lg={6} xl={6} xxl={4} className="quiz-col mt-4">
            <Tilt
              className="tilt-container"
              tiltMaxAngleX={25}
              tiltMaxAngleY={25}
              perspective={1000}
              scale={false}
              transitionSpeed={400}
              gyroscope={true}
            >
              <Lottie
                className="animation2-quiz mb-4"
                animationData={sectionQuiz2ndAnimationData}
                loop={true}
                data-aos="zoom-in"
                data-aos-duration="2000"
                autoplay={true}
                rendererSettings={{
                  preserveAspectRatio: "xMidYMid slice",
                }}
              />
            </Tilt>
          </Col>
        </Row>
      </Container>
      {/* Section 5 Teacher */}
      <Container fluid className="section5 mt-5 py-4" data-aos="fade-up" data-aos-duration="2000">
        <Row className="align-items-start justify-content-center">
          <Col lg={8} xl={8} xxl={6}>
            <Tilt
              className="tilt-container"
              tiltMaxAngleX={25}
              tiltMaxAngleY={25}
              perspective={1000}
              scale={false}
              transitionSpeed={400}
              gyroscope={true}
            >
              <Lottie
                className="animation-section5 mx-auto"
                animationData={sectionTeacher}
                loop={true}
                data-aos="fade-in"
                data-aos-duration="2000"
                autoplay={true}
                rendererSettings={{
                  preserveAspectRatio: "xMidYMid slice",
                }}
              />
            </Tilt>
          </Col>
          <Col lg={4} xl={4} xxl={6}>
            <h2 className="mt-5">Teacher</h2>
            <p className=" lead">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. <br /> Nostrum eveniet maiores ab numquam
              facilis minus Lorem ipsum dolor, sit amet consectetur adipisicing elit. Obcaecati, a?
            </p>
          </Col>
        </Row>
      </Container>
      {/* Testimonials */}
      <Container fluid className="section6 mt-5 py-4" data-aos="fade-up" data-aos-duration="2000">
        <Row className="justify-content-center">
          <h2 className="text-center mt-1 py-4">Testimonials</h2>
          <Col md={10}>
            <Carousel
              fade
              interval={null}
              indicators={false}
              prevIcon={<IoIosArrowDropleftCircle className="custom-arrow prev-arrow" />}
              nextIcon={<IoIosArrowDroprightCircle className="custom-arrow next-arrow" />}
            >
              <Carousel.Item className="text-center mt-4">
                <img src="/home_img/google-Ceo.jpg" alt="Sundar Pichai" className="google-ceo" />
                <h5 className="mt-3 fw-semibold">Sundar Pichai</h5>
                <h6 className="mt-3 fw-semibold text-secondary">Google CEO</h6>
                <FaQuoteLeft className="quote-icon mt-2" />
                <p className=" custom-paragraph">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quo saepe ipsum sequi officia quos nihil
                  tempora asperiores libero maxime incidunt? Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Reiciendis, necessitatibus.
                </p>
              </Carousel.Item>
              <Carousel.Item className="text-center mt-4">
                <img src="/home_img/udemy-Admin.jpg" alt="Greg Brown" className="udemy-admin google-ceo" />
                <h5 className="mt-3 fw-semibold">Greg Brown</h5>
                <h6 className="mt-3 fw-semibold text-secondary">Udemy's Chief Executive</h6>
                <FaQuoteLeft className="quote-icon mt-2" />
                <p className=" custom-paragraph">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quo saepe ipsum sequi officia quos nihil
                  tempora asperiores libero maxime incidunt? Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Reiciendis, necessitatibus.
                </p>
              </Carousel.Item>
              <Carousel.Item className="text-center mt-4">
                <img src="/home_img/meta-zuckerberg.jpg" alt="Greg Brown" className="udemy-admin google-ceo" />
                <h5 className="mt-3 fw-semibold">Mark Zuckerberg</h5>
                <h6 className="mt-3 fw-semibold text-secondary">Founder and CEO at Meta</h6>
                <FaQuoteLeft className="quote-icon mt-2" />
                <p className=" custom-paragraph">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quo saepe ipsum sequi officia quos nihil
                  tempora asperiores libero maxime incidunt? Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Reiciendis, necessitatibus.
                </p>
              </Carousel.Item>
              <Carousel.Item className="text-center mt-4">
                <img src="/home_img/laravel-founder.webp" alt="Greg Brown" className="udemy-admin google-ceo" />
                <h5 className="mt-3 fw-semibold">Taylor Otwell</h5>
                <h6 className="mt-3 fw-semibold text-secondary">Teacher and Laravel founder</h6>
                <FaQuoteLeft className="quote-icon mt-2" />
                <p className=" custom-paragraph">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quo saepe ipsum sequi officia quos nihil
                  tempora asperiores libero maxime incidunt? Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Reiciendis, necessitatibus.
                </p>
              </Carousel.Item>
              <Carousel.Item className="text-center mt-4">
                <img src="/home_img/women-student.webp" alt="Greg Brown" className="udemy-admin google-ceo" />
                <h5 className="mt-3 fw-semibold">Cara Collins</h5>
                <h6 className="mt-3 fw-semibold text-secondary">Student</h6>
                <FaQuoteLeft className="quote-icon mt-2" />
                <p className=" custom-paragraph">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quo saepe ipsum sequi officia quos nihil
                  tempora asperiores libero maxime incidunt? Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Reiciendis, necessitatibus.
                </p>
              </Carousel.Item>
              <Carousel.Item className="text-center mt-4">
                <img src="/home_img/the-rock.jpg" alt="Greg Brown" className="udemy-admin google-ceo" />
                <h5 className="mt-3 fw-semibold">Dwayne Johnson "The Rock"</h5>
                <h6 className="mt-3 fw-semibold text-secondary">Student/Actor/WWE Wrestler</h6>
                <FaQuoteLeft className="quote-icon mt-2" />
                <p className=" custom-paragraph">
                  Recentemente ho riscoperto la mia passione per l'informatica. Grazie alla vostra piattaforma ho
                  trovato il modo perfetto per coltivare questa passione, anche tra un set e l'altro. È incredibile come
                  la tecnologia e la formazione possano essere accessibili ovunque e in qualsiasi momento. Grazie per
                  aver reso possibile il mio viaggio verso il mondo digitale!
                </p>
              </Carousel.Item>
            </Carousel>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;

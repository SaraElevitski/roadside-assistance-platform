import { type FC } from "react";
import "./Home.scss";
import { Row, Col, Carousel } from "react-bootstrap";

interface HomeProps {}

const Home: FC<HomeProps> = () => {
  return (
    <div className="Home p-4">
      <div className="text-center mb-4">
        <h2>שלום לאתר שלנו</h2>
      </div>

      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <Carousel data-bs-theme="dark">
            <Carousel.Item>
              <img
                className="d-block w-100"
                 src="/help4.jpg"
                alt="help4.jpg"
              />
              <Carousel.Caption>
                <h5>First slide label</h5>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="/help2.jpeg"
                alt="help2.jpeg"
              />
              <Carousel.Caption>
                <h5>Second slide label</h5>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="/help3.jpg"
                alt="help3.jpg"
              />
              <Carousel.Caption>
                <h5>Second slide label</h5>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
               src="/help1.jpg"
                alt="help1.jpg"
              />
              <Carousel.Caption>
                <h5>Theard slide label</h5>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="/help5.jpg"
                alt="help5.jpg"
              />
              <Carousel.Caption>
                <h5>Theard slide label</h5>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </Col>
      </Row>
    </div>
  );
};

export default Home;

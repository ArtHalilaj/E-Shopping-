import React from 'react';
import { Card, Row, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Categories = () => {
  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Supermarket Categories</h2>
      <Row className="g-4">
        <Col sm={12} md={6} lg={3}>
          <Card className="h-100">
            <Card.Img variant="top" src="https://via.placeholder.com/150" alt="Food" />
            <Card.Body>
              <Card.Title>
                <Link to="/categories/food" className="text-decoration-none">
                  Food
                </Link>
              </Card.Title>
              <Card.Text>
                Explore a variety of fresh groceries and packaged foods.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col sm={12} md={6} lg={3}>
          <Card className="h-100">
            <Card.Img variant="top" src="https://via.placeholder.com/150" alt="Deodorants" />
            <Card.Body>
              <Card.Title>
                <Link to="/categories/deodorants" className="text-decoration-none">
                  Deodorants
                </Link>
              </Card.Title>
              <Card.Text>
                Choose from our range of quality deodorants and body care products.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col sm={12} md={6} lg={3}>
          <Card className="h-100">
            <Card.Img variant="top" src="https://via.placeholder.com/150" alt="Beverages" />
            <Card.Body>
              <Card.Title>
                <Link to="/categories/beverages" className="text-decoration-none">
                  Beverages
                </Link>
              </Card.Title>
              <Card.Text>
                Find a wide selection of drinks and beverages to quench your thirst.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col sm={12} md={6} lg={3}>
          <Card className="h-100">
            <Card.Img variant="top" src="https://via.placeholder.com/150" alt="Household Supplies" />
            <Card.Body>
              <Card.Title>
                <Link to="/categories/household-supplies" className="text-decoration-none">
                  Household Supplies
                </Link>
              </Card.Title>
              <Card.Text>
                Stock up on essential household supplies and cleaning products.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Categories;

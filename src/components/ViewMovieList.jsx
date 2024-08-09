import "bootstrap/dist/css/bootstrap.min.css";
import { useContext } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import MovieContext from "../context/MovieContext";
import ViewMovie from "./ViewMovie";

export default function ViewMovieList() {
  const { movies } = useContext(MovieContext);

  return movies.length <= 0 ? (
    <p>Loading...</p>
  ) : (
    <Container className="container">
      <h2 className="page-title text-center mt-4 text-light">Movies</h2>
      <Row className="mt-4">
        {movies.map((movie) => (
          <Col key={movie._id} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <Card className="card h-100">
              <Card.Body className="cardBody">
                <Card.Title className="custom-card-title">
                  {movie.title}
                </Card.Title>
                <Card.Text className="custom-card-description">
                  {movie.description}
                </Card.Text>
                <Card.Text className="custom-card">
                  {movie.genre} - {movie.year}
                </Card.Text>
                <Card.Text className="custom-card">
                  Director: {movie.director}
                </Card.Text>
              </Card.Body>
              <Card.Footer className="text-center">
                <ViewMovie movie={movie} />
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

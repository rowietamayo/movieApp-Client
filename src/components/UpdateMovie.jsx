import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import Swal from "sweetalert2";
import MovieContext from "../context/MovieContext";

export default function UpdateMovie({ movie }) {
  const { fetchMovies } = useContext(MovieContext);
  const [title, setTitle] = useState(movie.title);
  const [director, setDirector] = useState(movie.director);
  const [year, setYear] = useState(movie.year);
  const [description, setDescription] = useState(movie.description);
  const [genre, setGenre] = useState(movie.genre);
  const [showEdit, setShowEdit] = useState(false);

  const openEdit = () => {
    setShowEdit(true);
  };

  const closeEdit = () => {
    setShowEdit(false);
  };

  const updateMovie = (e) => {
    e.preventDefault();
    fetch(
      `https://movieapp-api-lms1.onrender.com/movies/updateMovie/${movie._id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          title: title,
          director: director,
          year: year,
          description: description,
          genre: genre,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (
          data.error !== "Movie not found" ||
          data.error !== "Error in updating a movie."
        ) {
          Swal.fire({
            title: "Success!",
            icon: "success",
            text: "Movie Successfully updated",
            customClass: {
              confirmButton: "sweet-warning",
            },
          });
        } else {
          Swal.fire({
            title: "Error!",
            icon: "error",
            text: "Please try again",
            customClass: {
              confirmButton: "sweet-warning",
            },
          });
          console.log(data.error);
        }
        setTitle("");
        setDirector("");
        setYear("");
        setGenre("");
        setDescription();
        fetchMovies();
        closeEdit();
      });
  };

  useEffect(() => {
    if (showEdit && movie) {
      setTitle(movie.title);
      setDirector(movie.director);
      setYear(movie.year);
      setGenre(movie.genre);
      setDescription(movie.description);
    }
  }, [showEdit]);

  return (
    <>
      <Button
        className="btnUpdate me-2"
        variant="primary"
        size="sm"
        onClick={openEdit}
      >
        Update
      </Button>

      <Modal id="update-modal" show={showEdit} onHide={closeEdit}>
        <Form onSubmit={updateMovie}>
          <Modal.Header closeButton>
            <Modal.Title>Update Movie</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="movieTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="movieDirector">
              <Form.Label>Director</Form.Label>
              <Form.Control
                type="text"
                required
                value={director}
                onChange={(e) => setDirector(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="movieYear">
              <Form.Label>Year</Form.Label>
              <Form.Control
                type="number"
                required
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="movieDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="movieGenre">
              <Form.Label>Genre</Form.Label>
              <Form.Control
                type="text"
                required
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeEdit}>
              Close
            </Button>
            <Button variant="success" type="submit">
              Submit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

UpdateMovie.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    genre: PropTypes.string,
    director: PropTypes.string,
    year: PropTypes.string,
    comments: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string,
        userId: PropTypes.string,
        comments: PropTypes.string,
      })
    ),
  }),
};

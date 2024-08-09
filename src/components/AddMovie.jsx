import { useContext, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import Swal from "sweetalert2";
import MovieContext from "../context/MovieContext";

export default function AddMovie() {
  const { fetchMovies } = useContext(MovieContext);
  const [title, setTitle] = useState("");
  const [director, setDirector] = useState("");
  const [year, setYear] = useState("");
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState("");
  const [showEdit, setShowEdit] = useState(false);

  const openEdit = () => {
    setShowEdit(true);
  };

  const closeEdit = () => {
    setShowEdit(false);
  };

  const addMovie = (e) => {
    e.preventDefault();
    fetch(`https://movieapp-api-lms1.onrender.com/movies/addMovie`, {
      method: "POST",
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
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error !== "Failed to save the movie") {
          Swal.fire({
            title: "Success!",
            icon: "success",
            text: "Movie Successfully Added",
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

  return (
    <>
      <Button
        className="btnUpdate"
        variant="primary"
        size="sm"
        onClick={openEdit}
      >
        Add Movie
      </Button>

      <Modal id="create-modal" show={showEdit} onHide={closeEdit}>
        <Form onSubmit={addMovie}>
          <Modal.Header closeButton>
            <Modal.Title>Add Movie</Modal.Title>
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

import { useContext } from "react";
import { Table } from "react-bootstrap";
import AddMovie from "../components/AddMovie";
import DeleteMovie from "../components/DeleteMovie";
import UpdateMovie from "../components/UpdateMovie";
import ViewMovie from "../components/ViewMovie";
import MovieContext from "../context/MovieContext";

export default function AdminView() {
  const { movies } = useContext(MovieContext);

  return (
    <>
      <h2 className="text-center my-4 text-light">Admin Dashboard</h2>
      <div className="d-flex justify-content-center align-items-center mb-4">
        <AddMovie />
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr className="text-center table-dark">
            <th>Title</th>
            <th>Description</th>
            <th>Genre</th>
            <th>Year</th>
            <th>Director</th>
            <th colSpan="2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {movies.map((movie) => (
            <tr key={movie._id}>
              <td>{movie.title}</td>
              <td>{movie.description}</td>
              <td>{movie.genre}</td>
              <td>{movie.year}</td>
              <td>{movie.director}</td>
              <td className="text-center">
                <UpdateMovie movie={movie} />
                <DeleteMovie movieId={movie._id} />
                <ViewMovie movie={movie} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

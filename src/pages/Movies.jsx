import { useContext, useEffect } from "react";
import AdminView from "../components/AdminView";
import ViewMovieList from "../components/ViewMovieList";
import MovieContext from "../context/MovieContext";
import UserContext from "../context/UserContext";

export default function MoviesCatalog() {
  const { isAdmin } = useContext(UserContext);
  const { fetchMovies } = useContext(MovieContext);

  useEffect(() => {
    fetchMovies();
  }, []);

  return isAdmin ? <AdminView /> : <ViewMovieList />;
}

import { useContext } from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";

export default function Home() {
  const { isLoggedIn } = useContext(UserContext);

  return (
    <Row>
      <Col xs={7} className="mx-auto my-4 text-center text-white">
        <h1>Welcome to Movie Collections</h1>
        <p>
          Dive into a world of captivating storytelling and unforgettable
          characters from the comfort of your own home. Browse through our
          curated selections, discover hidden gems, and join a community of
          fellow movie enthusiasts. Grab your popcorn and get ready to embark on
          an epic movie-watching journey—because your next favorite film is just
          a click away!
        </p>
        {isLoggedIn ? (
          <Link className="btn btn-primary" to={"/movies"}>
            See Movie Collections
          </Link>
        ) : (
          <Link className="btn btn-primary" to={"/login"}>
            Login to start
          </Link>
        )}
      </Col>
    </Row>
  );
}

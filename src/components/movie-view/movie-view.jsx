import React, { useState } from "react";
import { Button, Row, Image, Card, Container } from "react-bootstrap";

import { Link, useParams } from "react-router-dom";

import "./movie-view.scss";

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();

  const movie = movies.find((m) => m._id === movieId);

  console.log(movieId);

  const storedUser = JSON.parse(localStorage.getItem("username"));
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const token = localStorage.getItem("token");

  const handleFavorite = () => {
    fetch(
      "https://myfavflixapi.herokuapp.com/users/" +
        user.Username +
        "/movies/" +
        movie._id,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        alert("Added to favorites!");
        return response.json();
      })
      .then((data) => updateUser(data))
      .catch((err) => {
        alert("Something went wrong");
      });
  };

  const handleRemoveFavorite = () => {
    fetch(
      "https://myfavflixapi.herokuapp.com/users/" +
        user.Username +
        "/movies/" +
        movie._id,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    ).then((response) => {
      if (response.ok) {
        alert("Removed from favorites");
        const newUser = {
          ...user,
          FavoriteMovies: user.FavoriteMovies.filter(
            (movie) => movie._id != movie._id
          ),
        };
        updateUser(newUser);
      } else {
        alert("Something went wrong");
      }
    });
  };

  const updateUser = (user) => {
    localStorage.setItem("username", JSON.stringify(user));
    setUser(user);
  };

  return (
    <Container className="cardset; content">
      <Row>
        <Card bg="dark" text="light">
          <Card.Header>
            <div className="title text-center">
              <span> {movie.Title} </span>
            </div>
          </Card.Header>
          <Card.Body>
            <div>
              <div>
                <Image
                  className="movie-img"
                  height="350px"
                  width="270px"
                  crossOrigin="anonymous"
                  src={movie.ImageURL}
                />
              </div>
              <div>
                <span className="labeltitle">Genre: </span>
                <span className="description">{movie.Genre.Name}</span>
              </div>
              <div>
                <span className="labeltitle">Director: </span>
                <span className="description">{movie.Director.Name}</span>
              </div>
              <div>
                <span className="labeltitle">Description: </span>
                <span className="description">{movie.Description}</span>
              </div>
            </div>
          </Card.Body>
          <Card.Footer>
            <Link to="/">
              <Button className="btn-login" variant="light">
                {" "}
                Back{" "}
              </Button>
            </Link>
            {storedUser.FavoriteMovies.indexOf(movie._id) >= 0 ? (
              <Button
                className="fav-btn"
                variant="danger"
                onClick={() => handleRemoveFavorite(movie._id, "add")}
              >
                Remove from Favorites
              </Button>
            ) : (
              <Button
                className="button-add-favorite fav-btn"
                variant="light"
                onClick={() => handleFavorite(movie._id, "add")}
              >
                + Add to Favorites
              </Button>
            )}
          </Card.Footer>
        </Card>
      </Row>
    </Container>
  );

  // export const MovieView = ({ movies }) => {
  //   const { movieId } = useParams();

  //   const movie = movies.find((m) => m._id === movieId);

  //   const token = localStorage.getItem("token");
  //   const storedUser = JSON.parse(localStorage.getItem("username"));
  //   // const [token, setToken] = useState(storedToken ? storedToken : null);
  //   // const [user, setUser] = useState(storedUser ? storedUser : null);

  //   const handleFavorite = () => {
  //     fetch(
  //       "https://myfavflixapi.herokuapp.com/users/" +
  //         user.Username +
  //         "/movies/" +
  //         movie._id,
  //       {
  //         method: "POST",
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     )
  //       .then((response) => {
  //         alert("Added to favorites!");
  //         return response.json();
  //       })
  //       .then((data) => updateUser(data))
  //       .catch((err) => {
  //         alert("Something went wrong");
  //       });
  //   };

  //   const handleRemoveFavorite = () => {
  //     fetch(
  //       "https://myfavflixapi.herokuapp.com/users/" +
  //         user.Username +
  //         "/movies/" +
  //         movie._id,
  //       {
  //         method: "DELETE",
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     ).then((response) => {
  //       if (response.ok) {
  //         alert("Removed from favorites");
  //         const newUser = {
  //           ...user,
  //           FavoriteMovies: user.FavoriteMovies.filter(
  //             (movie) => movie._id != movie._id
  //           ),
  //         };
  //         updateUser(newUser);
  //       } else {
  //         alert("Something went wrong");
  //       }
  //     });
  //   };

  //   const updateUser = (user) => {
  //     localStorage.setItem("username", JSON.stringify(user));
  //     setUser(user);
  //   };

  //   return (
  //     <Row className="movie-view">
  //       <Col md={6} className="movie-poster">
  //         <Image
  //           crossOrigin="anonymous"
  //           className="movie-img"
  //           height="350px"
  //           width="270px"
  //           src={movies.ImageURL}
  //         />
  //       </Col>
  //       <Col md={6}>
  //         <div className="movie-title">
  //           <span className="value">{movies.Title}</span>
  //         </div>
  //         <div className="movie-description">
  //           <span className="label">Description: </span>
  //           <span className="value">{movies.Description}</span>
  //         </div>
  //         <Link to={`/`}>
  //           <Button className="back-button button-primary">Back</Button>
  //         </Link>

  //         {storedUser.FavoriteMovies.indexOf(movies._id) >= 0 ? (
  //           <Button
  //             variant="danger"
  //             onClick={() => handleRemoveFavorite(movie._id, "add")}
  //           >
  //             Remove from Favorites
  //           </Button>
  //         ) : (
  //           <Button
  //             className="button-add-favorite"
  //             onClick={() => handleFavorite(movie._id, "add")}
  //           >
  //             + Add to Favorites
  //           </Button>
  //         )}
  //       </Col>
  //     </Row>
  //   );
  // };

  // import React from "react";
  // import PropTypes from "prop-types";

  // import { Button, Col, Container, Row, Image } from "react-bootstrap";

  // import "./movie-view.scss";

  // export class MovieView extends React.Component {
  //   keypressCallback(event) {
  //     console.log(event.key);
  //   }

  //   componentDidMount() {
  //     document.addEventListener("keypress", this.keypressCallback);
  //   }
  //   componentWillUnmount() {
  //     document.removeEventListener("keypress", this.keypressCallback);
  //   }
  //   render() {
  //     const { movie, onBackClick } = this.props;

  //     return (
  //       <Container className="movie-view">
  //         <Row className="movie-title mb-4 mt-4" xs={12} sm={12} md={7}>
  //           <Col className="value">{movie.Title}</Col>
  //         </Row>
  //         <Row className="mb-3">
  //           <Col className="movie-poster  mb-4" md={5} lg={4}>
  //             <Image
  //               crossOrigin="anonymous"
  //               className="movie-img"
  //               height="350px"
  //               width="270px"
  //               src={movie.ImageURL}
  //             />
  //           </Col>
  //         </Row>
  //         <Row className="movie-genre" xs={12} sm={12} md={7}>
  //           <Col className="label" xs={5} sm={4} md={3} lg={2}>
  //             Genre:{" "}
  //           </Col>
  //           <Col className="value" xs="auto" sm="auto" md="auto" lg="auto">
  //             {movie.Genre.Name}
  //           </Col>
  //         </Row>
  //         <Row className="movie-description" xs={12} sm={12} md={7}>
  //           <Col className="label" xs={5} sm={4} md={3} lg={2}>
  //             Description:{" "}
  //           </Col>
  //           <Col className="value" xs={7} sm={8} md={9} lg={10}>
  //             {movie.Description}
  //           </Col>
  //         </Row>
  //         <Row className="movie-director">
  //           <Col className="label" xs={5} sm={4} md={3} lg={2}>
  //             Director:{" "}
  //           </Col>
  //           <Col className="value" xs={7} sm={8} md={9} lg="auto">
  //             {movie.Director.Name}
  //           </Col>
  //         </Row>
  //         <Button
  //           className="back-button my-4 px-4 py-2"
  //           variant="secondary"
  //           onClick={() => {
  //             onBackClick(null);
  //           }}
  //         >
  //           Back
  //         </Button>
  //       </Container>
  //     );
  //   }
  // }

  // MovieView.propTypes = {
  //   movie: PropTypes.shape({
  //     Title: PropTypes.string.isRequired,
  //     Description: PropTypes.string.isRequired,
  //     ImageURL: PropTypes.string.isRequired,
  //     Genre: PropTypes.shape({
  //       Name: PropTypes.string.isRequired,
  //       Description: PropTypes.string.isRequired,
  //     }).isRequired,
  //     Director: PropTypes.shape({
  //       Name: PropTypes.string.isRequired,
  //       Bio: PropTypes.string.isRequired,
  //       Birth: PropTypes.string.isRequired,
  //     }).isRequired,
  //   }).isRequired,
  //   onBackClick: PropTypes.func.isRequired,
};

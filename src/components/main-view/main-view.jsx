import React from "react";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { RegistrationView } from "../registration-view/registration-view";
import { LoginView } from "../login-view/login-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";

export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
      registered: true,
    };
  }

  componentDidMount() {
    axios
      .get("https://myfavflixapi.herokuapp.com/movies")
      .then((response) => {
        this.setState({
          movies: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  setSelectedMovie(movie) {
    this.setState({
      selectedMovie: movie,
    });
  }

  onLoggedIn(user) {
    this.setState({
      user,
    });
  }

  toRegister(registered) {
    this.setState({
      registered,
    });
  }

  render() {
    const { movies, selectedMovie, user, registered } = this.state;

    if (!registered)
      return (
        <RegistrationView
          toRegister={(registered) => this.toRegister(registered)}
        />
      );

    /* If there's no user, the LoginView will render. If the user is logged in, the user data is passed to the LoginView */
    if (!user)
      return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;

    if (movies.length === 0) return <div className="main-view" />;

    return (
      <BrowserRouter>
        <NavigationBar user={user}></NavigationBar>
        <Row className="main-view justify-content-md-center">
          <Routes>
            <Route
              path="/register"
              element={
                <>
                  {user ? (
                    <Navigate to="/" />
                  ) : (
                    <Col md={5}>
                      <RegistrationView />
                    </Col>
                  )}
                </>
              }
            />
            <Route
              path="/login"
              element={
                <>
                  {user ? (
                    <Navigate to="/" />
                  ) : (
                    <Col md={5}>
                      <LoginView onLoggedIn={(user) => setUser(user)} />
                    </Col>
                  )}
                </>
              }
            />
            <Route
              path="/movies/:movieId"
              element={
                <>
                  {movies.length === 0 ? (
                    <Row className="main-view"></Row>
                  ) : (
                    <Col md={8}>
                      <MovieView movies={movies} />
                    </Col>
                  )}
                </>
              }
            />
          </Routes>
        </Row>
      </BrowserRouter>
    );
  }
}
// {/* {selectedMovie ? (
//   <Col md={8}>
//     <MovieView
//       movie={selectedMovie}
//       onBackClick={(newSelectedMovie) => {
//         this.setSelectedMovie(newSelectedMovie);
//       }}
//     />
//   </Col> */}
// ) : (
//   movies.map((movie) => (
//     <Col className=" mx=0.5" xs={12} sm={6} md={4} lg={3}>
//       <MovieCard
//         key={movie._id}
//         movie={movie}
//         onMovieClick={(newSelectedMovie) => {
//           this.setSelectedMovie(newSelectedMovie);
//         }}
//       />
//     </Col>
//   ))
// )}

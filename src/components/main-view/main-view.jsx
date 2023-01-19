import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useResolvedPath,
} from "react-router-dom";

import { useState, useEffect } from "react";
import { LoginView } from "../login-view/login-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { RegistrationView } from "../registration-view/registration-view";
import { ProfileView } from "../profile-view/profile-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";

export const MainView = () => {
  const storedUser = localStorage.getItem("username")
    ? JSON.parse(localStorage.getItem("username"))
    : null;
  const storedToken = localStorage.getItem("token");
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token] = useState(storedToken ? storedToken : null);

  useEffect(() => {
    if (!token) return;

    fetch("https://myfavflixapi.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((movies) => {
        // const moviesFromApi = movies.map((movie) => {
        //   return {
        //     _id: movie.id,
        //     Description: movie.Description,
        //     ImageURL: movie.ImageURL,
        //     Title: movie.Title,
        //     Genre: {
        //       Name: movie.Genre.Name,
        //       Description: movie.Genre.Description,
        //     },
        //     Director: {
        //       Name: movie.Director.Name,
        //     },
        //   };
        // });
        console.log("movies from api:", movies);
        setMovies(movies);
      });
  }, [token]);

  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        onLoggedOut={() => {
          setUser(null);
        }}
      />
      <Row></Row>
      <Row className="justify-content-md-center">
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
                    <LoginView
                      onLoggedIn={(user) => {
                        setUser(user);
                      }}
                    />
                    {/* <LoginView
                      onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                      }}
                    /> */}
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <Col md={8}>
                    <MovieView movies={movies} />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <>
                    {movies.map((movie) => (
                      <Col className="mb-5" key={movie._id} sm={5} md={3}>
                        <MovieCard movie={movie} />
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : user.length === 0 ? (
                  <Col>No such user found!</Col>
                ) : (
                  <Col>
                    <ProfileView user={user} movies={movies} />
                  </Col>
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};

export default MainView;

// import React from "react";
// import axios from "axios";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// import { RegistrationView } from "../registration-view/registration-view";
// import { LoginView } from "../login-view/login-view";
// import { MovieCard } from "../movie-card/movie-card";
// import { MovieView } from "../movie-view/movie-view";
// import { NavigationBar } from "../navigation-bar/navigation-bar";

// export class MainView extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       movies: [],
//       selectedMovie: null,
//       user: null,
//       registered: true,
//     };
//   }

//   componentDidMount() {
//     axios
//       .get("https://myfavflixapi.herokuapp.com/movies")
//       .then((response) => {
//         this.setState({
//           movies: response.data,
//         });
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }

//   setSelectedMovie(movie) {
//     this.setState({
//       selectedMovie: movie,
//     });
//   }

//   onLoggedIn(user) {
//     this.setState({
//       user,
//     });
//   }

//   toRegister(registered) {
//     this.setState({
//       registered,
//     });
//   }

//   render() {
//     const { movies, selectedMovie, user, registered } = this.state;

//     if (!registered)
//       return (
//         <RegistrationView
//           toRegister={(registered) => this.toRegister(registered)}
//         />
//       );

//     /* If there's no user, the LoginView will render. If the user is logged in, the user data is passed to the LoginView */
//     if (!user)
//       return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;

//     if (movies.length === 0) return <div className="main-view" />;

//     return (
//       <BrowserRouter>
//         <NavigationBar user={user}></NavigationBar>
//         <Row className="main-view justify-content-md-center">
//           <Routes>
//             <Route
//               path="/register"
//               element={
//                 <>
//                   {user ? (
//                     <Navigate to="/" />
//                   ) : (
//                     <Col md={5}>
//                       <RegistrationView />
//                     </Col>
//                   )}
//                 </>
//               }
//             />
//             <Route
//               path="/login"
//               element={
//                 <>
//                   {user ? (
//                     <Navigate to="/" />
//                   ) : (
//                     <Col md={5}>
//                       <LoginView onLoggedIn={(user) => setUser(user)} />
//                     </Col>
//                   )}
//                 </>
//               }
//             />
//             <Route
//               path="/movies/:movieId"
//               element={
//                 <>
//                   {movies.length === 0 ? (
//                     <Row className="main-view"></Row>
//                   ) : (
//                     <Col md={8}>
//                       <MovieView movies={movies} />
//                     </Col>
//                   )}
//                 </>
//               }
//             />
//           </Routes>
//         </Row>
//       </BrowserRouter>
//     );
//   }
// }
// // {/* {selectedMovie ? (
// //   <Col md={8}>
// //     <MovieView
// //       movie={selectedMovie}
// //       onBackClick={(newSelectedMovie) => {
// //         this.setSelectedMovie(newSelectedMovie);
// //       }}
// //     />
// //   </Col> */}
// // ) : (
// //   movies.map((movie) => (
// //     <Col className=" mx=0.5" xs={12} sm={6} md={4} lg={3}>
// //       <MovieCard
// //         key={movie._id}
// //         movie={movie}
// //         onMovieClick={(newSelectedMovie) => {
// //           this.setSelectedMovie(newSelectedMovie);
// //         }}
// //       />
// //     </Col>
// //   ))
// // )}

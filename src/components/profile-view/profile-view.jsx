import React, { useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";

export const ProfileView = ({ movies }) => {
  const storedToken = localStorage.getItem("token");
  const [token, setToken] = useState(storedToken ? storedToken : null);

  const storedUser = JSON.parse(localStorage.getItem("username"));
  const [user, setUser] = useState(storedUser ? storedUser : null);

  const [username, setUsername] = useState(user.Username);
  // const [password, setPassword] = useState();
  const [email, setEmail] = useState(user.Email);

  let favoriteMovies =
    movies &&
    movies.filter(
      (m) => user.FavoriteMovies && user.FavoriteMovies.indexOf(m._id) >= 0
    );

  const updateUser = (username) => {
    fetch("https://myfavflixapi.herokuapp.com/users/" + username, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((user) => {
        if (user) {
          setUser(user);
          localStorage.setItem("username", JSON.stringify(user));
        }
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Email: email,
    };

    fetch("https://myfavflixapi.herokuapp.com/users/" + user.Username, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.ok) {
        alert("Changes saved. Please login again with your new credentials");
        updateUser(user.Username);
      } else {
        alert("Something went wrong");
      }
    });
  };

  const handleDeregister = () => {
    fetch("https://myfavflixapi.herokuapp.com/users/" + user.Username, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.ok) {
        alert("Account successfully deleted");
        // window.location.reload();
      } else {
        alert("Something went wrong");
      }
    });
  };

  return (
    <Row>
      <Col>
        <div className="profile-info">
          <div className="user-info">
            <span className="label">Username: </span>
            <span className="value">{user.Username}</span>
          </div>
          <div className="user-info">
            <span className="label">Email: </span>
            <span className="value">{user.Email}</span>
          </div>
          <div className="user-info">
            <span className="label">Birthday: </span>
            <span className="value">{user.Birthday}</span>
          </div>
        </div>
      </Col>
      <Col>
        <Form onSubmit={handleSubmit}>
          <h2>Update info</h2>
          <Form.Group>
            <Form.Label>Username: </Form.Label>
            <Form.Control
              type="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email: </Form.Label>
            <Form.Control
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Button type="submit" className="button-primary">
            Save Changes
          </Button>
        </Form>
        <Button
          onClick={() => handleDeregister(user._id)}
          className="button-delete"
          type="submit"
          variant="danger"
        >
          Delete Account
        </Button>
      </Col>
      <Row>
        {favoriteMovies.length > 0 &&
          favoriteMovies.map((movie) => (
            <Col className="mb-5" key={movie.id} sm={5} md={3}>
              <MovieCard movie={movie} />
            </Col>
          ))}
      </Row>
    </Row>
  );
};

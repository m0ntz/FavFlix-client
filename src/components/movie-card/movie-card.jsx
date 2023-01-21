import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./movie-card.scss";

export const MovieCard = ({ movie }) => {
  return (
    <Card className="h-100" id="movie-card">
      <Card.Img
        crossOrigin="anonymous"
        variant="top"
        className="card-image"
        src={movie.ImageURL}
      />

      <Card.Body className="card-text-body">
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text className="card-description">
          {movie.Description.slice(0, 130)}...
        </Card.Text>
        <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
          <Button className="view-btn" variant="dark">
            View
          </Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImageURL: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

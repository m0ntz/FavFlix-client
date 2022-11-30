import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import "./movie-card.scss";

export class MovieCard extends React.Component {
  render() {
    const { movie, onMovieClick } = this.props;

    return (
      <Card>
        <Card.Img
          className="card-image"
          variant="top"
          crossOrigin="anonymous"
          src={movie.ImageURL}
        />
        <Card.Body className="card-text-body">
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text className="card-description">
            {movie.Description.slice(0, 160)}
            ...
          </Card.Text>
          <Button
            className="view-btn"
            onClick={() => onMovieClick(movie)}
            variant="dark"
          >
            View
          </Button>
        </Card.Body>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImageURL: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }),
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};

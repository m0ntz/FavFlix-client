import React from "react";
import PropTypes from "prop-types";

import { Button, Col, Container, Row, Image } from "react-bootstrap";

import "./movie-view.scss";

export class MovieView extends React.Component {
  keypressCallback(event) {
    console.log(event.key);
  }

  componentDidMount() {
    document.addEventListener("keypress", this.keypressCallback);
  }
  componentWillUnmount() {
    document.removeEventListener("keypress", this.keypressCallback);
  }
  render() {
    const { movie, onBackClick } = this.props;

    return (
      <Container className="movie-view">
        <Row className="movie-title mb-4 mt-4" xs={12} sm={12} md={7}>
          <Col className="value">{movie.Title}</Col>
        </Row>
        <Row className="mb-3">
          <Col className="movie-poster  mb-4" md={5} lg={4}>
            <Image
              crossOrigin="anonymous"
              className="movie-img"
              height="350px"
              width="270px"
              src={movie.ImageURL}
            />
          </Col>
        </Row>
        <Row className="movie-genre" xs={12} sm={12} md={7}>
          <Col className="label" xs={5} sm={4} md={3} lg={2}>
            Genre:{" "}
          </Col>
          <Col className="value" xs="auto" sm="auto" md="auto" lg="auto">
            {movie.Genre.Name}
          </Col>
        </Row>
        <Row className="movie-description" xs={12} sm={12} md={7}>
          <Col className="label" xs={5} sm={4} md={3} lg={2}>
            Description:{" "}
          </Col>
          <Col className="value" xs={7} sm={8} md={9} lg={10}>
            {movie.Description}
          </Col>
        </Row>
        <Row className="movie-director">
          <Col className="label" xs={5} sm={4} md={3} lg={2}>
            Director:{" "}
          </Col>
          <Col className="value" xs={7} sm={8} md={9} lg="auto">
            {movie.Director.Name}
          </Col>
        </Row>
        <Button
          className="back-button my-4 px-4 py-2"
          variant="secondary"
          onClick={() => {
            onBackClick(null);
          }}
        >
          Back
        </Button>
      </Container>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImageURL: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
    }).isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};

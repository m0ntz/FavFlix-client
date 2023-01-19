import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie }) => {
  return (
    <Card className="h-100">
      <Card.Img crossOrigin="anonymous" variant="top" src={movie.ImageURL} />

      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Description}</Card.Text>
        <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
          <Button className="button-primary">Open</Button>
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

// import React from "react";
// import PropTypes from "prop-types";
// import Button from "react-bootstrap/Button";
// import Card from "react-bootstrap/Card";

// import "./movie-card.scss";

// export class MovieCard extends React.Component {
//   render() {
//     const { movie, onMovieClick } = this.props;

//     return (
//       <Card id="movie-card">
//         <Card.Img
//           className="card-image"
//           variant="top"
//           crossOrigin="anonymous"
//           src={movie.ImageURL}
//         />
//         <Card.Body className="card-text-body">
//           <Card.Title>{movie.Title}</Card.Title>
//           <Card.Text className="card-description">
//             {movie.Description.slice(0, 130)}
//             ...
//           </Card.Text>
//           <Button
//             className="view-btn"
//             onClick={() => onMovieClick(movie)}
//             variant="dark"
//           >
//             View
//           </Button>
//         </Card.Body>
//       </Card>
//     );
//   }
// }

// MovieCard.propTypes = {
//   movie: PropTypes.shape({
//     Title: PropTypes.string.isRequired,
//     Description: PropTypes.string.isRequired,
//     ImageURL: PropTypes.string.isRequired,
//     Genre: PropTypes.shape({
//       Name: PropTypes.string.isRequired,
//     }),
//   }).isRequired,
//   onMovieClick: PropTypes.func.isRequired,
// };

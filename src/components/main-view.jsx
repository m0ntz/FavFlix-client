import React from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [
        {
          _id: 1,
          Title: "Harry Potter and the Chamber of Secrets",
          Description:
            "A house-elf warns Harry against returning to Hogwarts, but he decides to ignore it. When students and creatures at the school begin to get petrified, Harry finds himself surrounded in mystery.",
          Genre: {
            Name: "Fantasy",
            Description:
              "SFantasy films are films that belong to the fantasy genre with fantastic themes, usually magic, supernatural events, mythology, folklore, or exotic fantasy worlds. ",
          },
          Director: {
            Name: "Chris Columbus",
            Bio: "Chris Joseph Columbus is an American filmmaker. Born in Spangler, Pennsylvania, Columbus studied film at Tisch School of the Arts where he developed an interest in filmmaking.",
            Birth: 1958,
          },
          ImageURL:
            "https://m.media-amazon.com/images/I/71e0pu5UN9L._SY445_.jpg",
        },
        {
          _id: 2,
          Title: "Lord of the Rings: The Fellowship of the Ring",
          Description:
            "A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.",
          Genre: {
            Name: "Adventure",
            Description:
              "An adventure film is a form of adventure fiction, and is a genre of film. Subgenres of adventure films include swashbuckler films, pirate films, and survival films. Adventure films may also be combined with other film genres such as action, animation, comedy, drama, fantasy, science fiction, family, horror, or war.",
          },
          Director: {
            Name: "Peter Jackson",
            Bio: "Sir Peter Robert Jackson ONZ KNZM is a New Zealand film director, screenwriter and producer. He is best known as the director, writer and producer of the Lord of the Rings trilogy and the Hobbit trilogy, both of which are adapted from the novels of the same name by J. R. R. Tolkien.",
            Birth: "1961",
          },
          ImageURL: "https://m.media-amazon.com/images/I/81EwmP-mI7L._RI_.jpg",
        },
        {
          _id: 3,
          Title: "Pride and Prejudice",
          Description:
            "Sparks fly when spirited Elizabeth Bennet meets single, rich, and proud Mr. Darcy. But Mr. Darcy reluctantly finds himself falling in love with a woman beneath his class. Can each overcome their own pride and prejudice?",
          Genre: {
            Name: "Drama",
            Description:
              "The drama genre features stories with high stakes and many conflicts. They're plot-driven and demand that every character and scene move the story forward. ",
          },
          Director: {
            Name: "Joe Wright",
            Bio: "Joe Wright is an English film director. He is best known for Pride & Prejudice (2005), Atonement (2007), Anna Karenina (2012), and Darkest Hour (2017).",
            Birth: "1972",
          },
          ImageURL: "https://m.media-amazon.com/images/I/91E9-FyfvGL.jpg",
        },
      ],
      selectedMovie: null,
    };
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie,
    });
  }

  render() {
    const { movies, selectedMovie } = this.state;

    if (movies.length === 0)
      return <div className="main-view">The list is empty!</div>;

    return (
      <div className="main-view">
        {selectedMovie ? (
          <MovieView
            movie={selectedMovie}
            onBackClick={(newSelectedMovie) => {
              this.setSelectedMovie(newSelectedMovie);
            }}
          />
        ) : (
          movies.map((movie) => (
            <MovieCard
              key={movie._id}
              movie={movie}
              onMovieClick={(movie) => {
                this.setSelectedMovie(movie);
              }}
            />
          ))
        )}
      </div>
    );
  }
}

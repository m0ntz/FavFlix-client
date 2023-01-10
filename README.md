# FavFlix (Client)

[![Netlify Status](https://api.netlify.com/api/v1/badges/0a7497b8-46b0-45b0-9012-cb7aa54fb845/deploy-status)](https://app.netlify.com/sites/favflix-app/deploys)


👉Live Version [here](https://favflix-app.netlify.app/)

## Description
This is the client-side for the FavFlix application based on its existing server-side code (REST API and database). It is a React built responsive application with routing, rich interactions, several interface views, and a polished user experience. This project aims to facilitate user requests and rendering the response from the server-side via a number of different interface views

## Tech Stack
### MERN
- MongoDB
- Express
- React
- Node.js


## Setup

To install parcel
https://en.parceljs.org/getting_started.html

npm

```
npm install -g parcel-bundler
```

Clone

```
gh repo clone m0ntz/FavFlix-client
cd Favflix-client
npm start
```

Run

```
parcel src/index.html
```

To test project server running at http://localhost:1234

## Essential Views and Features:

Main view

- Returns a list of ALL movies to the user (each listed item with an image, title, and description)
- Sorting and filtering
- Ability to select a movie for more details

Single movie view

- Returns data (description, genre, director, image) about a single movie to the user
- Allows users to add a movie to their list of favorites

Login view

- Allows users to log in with a username and password
- Registration view
- Allows new users to register (username, password, email, birthday)

Genre view

- Returns data about a genre, with a name and description
- Displays example movies

Director view

- Returns data about a director (name, bio, birth year, death year)
- Displays example movies

Profile view

- Allows users to update their user info (username, password, email, date of birth)
- Allows existing users to deregister
- Displays favorite movies
- Allows users to remove a movie from their list of favorites

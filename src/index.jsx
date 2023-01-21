import React from "react";
import { Container } from "react-bootstrap";
import ReactDOM from "react-dom";
import { MainView } from "./components/main-view/main-view";

import "./index.scss";

class FavFlixApplication extends React.Component {
  render() {
    return (
      <Container>
        <MainView />
      </Container>
    );
  }
}

const container = document.getElementsByClassName("app-container")[0];

ReactDOM.render(React.createElement(FavFlixApplication), container);

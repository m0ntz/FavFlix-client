import React from "react";
import { Container } from "react-bootstrap";
import ReactDOM from "react-dom";
import { MainView } from "./components/main-view/main-view";
import { Navbar, Nav } from "react-bootstrap";
import logo from "./logo.png";

class FavFlixApplication extends React.Component {
  render() {
    return (
      <Container>
        {/* <Navbar
          bg="dark"
          variant="dark"
          sticky="top"
          expand="lg"
          className="navbar"
        >
          <Navbar.Brand href="/">
            <img src={logo} className="logo" width="40px" height="40px" />{" "}
            FavFlix
          </Navbar.Brand>

          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav>
              <Nav.Link href="/">Home</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar> */}
        <MainView />
      </Container>
    );
  }
}

const container = document.getElementsByClassName("app-container")[0];

ReactDOM.render(React.createElement(FavFlixApplication), container);

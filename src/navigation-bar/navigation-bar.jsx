import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export const NavigationBar = ({ user, onLoggedOut }) => {
  return (
    <Container>
      <Navbar
        bg="dark"
        variant="dark"
        sticky="top"
        expand="lg"
        className="navbar"
      >
        <Navbar.Brand href="/">
          <img src={logo} className="logo" width="40px" height="40px" /> FavFlix
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            <Nav.Link href="/">Home</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <MainView />
    </Container>
    // <Navbar bg="light" expand="lg">
    //   <Container>
    //     <Navbar.Brand as={Link} to="/">
    //       Books App
    //     </Navbar.Brand>
    //     <Navbar.Toggle aria-controls="basic-navbar-nav" />
    //     <Navbar.Collapse id="basic-navbar-nav">
    //       <Nav className="me-auto">{/* Add Links here */}</Nav>
    //     </Navbar.Collapse>
    //   </Container>
    // </Navbar>
  );
};

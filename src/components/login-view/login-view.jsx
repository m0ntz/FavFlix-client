import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
    };

    fetch("https://myfavflixapi.herokuapp.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Login response: ", data);
        if (data.user) {
          localStorage.setItem("username", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          onLoggedIn(data.user, data.token);
        } else {
          alert("No such user");
        }
      })
      .catch((e) => {
        alert("Something went wrong");
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h1>Login</h1>
      <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          // minLength="6"
        />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          // minLength="6"
        />
      </Form.Group>
      <Button variant="primary" type="submit" className="button-primary">
        Submit
      </Button>
    </Form>
  );
};

// import React, { useState } from "react";
// import PropTypes from "prop-types";
// import Container from "react-bootstrap/Container";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
// import CardGroup from "react-bootstrap/CardGroup";
// import Card from "react-bootstrap/Card";
// import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";

// export function LoginView(props) {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(username, password);
//     props.onLoggedIn(username);
//   };

//   return (
//     <Container>
//       <Row>
//         <Col>
//           <CardGroup>
//             <Card>
//               <Card.Title>Welcome to FavFlix</Card.Title>
//               <Card.Body>
//                 <Form>
//                   <Form.Group controlId="formUsername">
//                     <Form.Label>Username:</Form.Label>
//                     <Form.Control
//                       type="text"
//                       onChange={(e) => setUsername(e.target.value)}
//                     />
//                   </Form.Group>

//                   <Form.Group controlId="formPassword">
//                     <Form.Label>Password:</Form.Label>
//                     <Form.Control
//                       type="password"
//                       onChange={(e) => setPassword(e.target.value)}
//                     />
//                   </Form.Group>
//                   <Button
//                     variant="dark"
//                     type="submit"
//                     className="my-3"
//                     onClick={handleSubmit}
//                   >
//                     Login
//                   </Button>
//                 </Form>
//               </Card.Body>
//             </Card>
//           </CardGroup>
//         </Col>
//       </Row>
//     </Container>
//   );
// }

// LoginView.propTypes = {
//   onLoggedIn: PropTypes.func.isRequired,
// };

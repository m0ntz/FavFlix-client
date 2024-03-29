import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export const RegistrationView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(username, password, email, birthday);

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday,
    };

    fetch("https://myfavflixapi.herokuapp.com/users", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.ok) {
        alert("Signup successful");
        window.location.reload();
      } else {
        alert("Signup failed");
      }
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h1>Create Account</h1>
      <Form.Group>
        <Form.Label>Username: </Form.Label>
        <Form.Control
          type="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Password: </Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Email: </Form.Label>
        <Form.Control
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Birthday: </Form.Label>
        <Form.Control
          type="birthday"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          // required
        />
      </Form.Group>
      <Button type="submit" className="button-primary" variant="dark">
        Register
      </Button>
    </Form>
  );
};

// import React, { useState } from "react";
// import axios from "axios";
// import PropTypes from "prop-types";
// import {
//   Form,
//   Button,
//   Container,
//   Card,
//   CardGroup,
//   Col,
//   Row,
// } from "react-bootstrap";

// export function RegistrationView(props) {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [email, setEmail] = useState("");
//   const [birthday, setBirthday] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(username, password, email, birthday);
//     props.toRegister(username);
//   };

//   return (
//     <Container>
//       <Row>
//         <Col>
//           <CardGroup>
//             <Card>
//               <Card.Body>
//                 <Card.Title>Please Register</Card.Title>
//                 <Form>
//                   <Form.Group>
//                     <Form.Label>Username:</Form.Label>
//                     <Form.Control
//                       type="text"
//                       value={username}
//                       onChange={(e) => setUsername(e.target.value)}
//                       required
//                       placeholder="Enter username"
//                     />
//                   </Form.Group>

//                   <Form.Group>
//                     <Form.Label>Password:</Form.Label>
//                     <Form.Control
//                       type="password"
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       required
//                       minLength={8}
//                       placeholder="Password must be at least 8 characters"
//                     />
//                   </Form.Group>

//                   <Form.Group>
//                     <Form.Label>Email:</Form.Label>
//                     <Form.Control
//                       type="email"
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                       required
//                       placeholder="Enter email"
//                     />
//                   </Form.Group>

//                   <Form.Group>
//                     <Form.Label>Birthday:</Form.Label>
//                     <Form.Control
//                       type="birthday"
//                       value={birthday}
//                       onChange={(e) => setBirthday(e.target.value)}
//                     />
//                   </Form.Group>

//                   <Form.Group>
//                     <Button
//                       variant="dark"
//                       type="submit"
//                       className="my-3"
//                       onClick={handleSubmit}
//                     >
//                       Register
//                     </Button>
//                   </Form.Group>
//                 </Form>
//               </Card.Body>
//             </Card>
//           </CardGroup>
//         </Col>
//       </Row>
//     </Container>
//   );
// }

// RegistrationView.propTypes = {
//   onRegistration: PropTypes.func.isRequired,
// };

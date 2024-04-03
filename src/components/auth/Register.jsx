import React from "react";
import { useState } from "react";
import { Form } from "react-bootstrap";

function Register({ setToken }) {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleFormSubmit(e) {
    e.preventDefault();
    const response = await fetch(
      "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname: firstname,
          lastname: lastname,
          email: email,
          password: password,
        }),
      }
    );
    const data = await response.json();
    console.log(data);
    setToken(data.token);
    setMessage(data.message);
  }

  return (
    <div className="registration">
      <form onSubmit={handleFormSubmit}>
        <Form.Group className=" mb-3">
          <Form.Label>FirstName</Form.Label>
          <Form.Control
            type="name"
            name="name"
            placeholder="First Name"
            onChange={(e) => setFirstname(e.target.value)}
          />
        </Form.Group>
        <Form.Group className=" mb-3">
          <Form.Label>Lastname</Form.Label>
          <Form.Control
            type="lastname"
            name="lastname"
            placeholder="Lastname"
            onChange={(e) => setLastname(e.target.value)}
          />
        </Form.Group>
        <Form.Group className=" mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className=" mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <button type="submit" className="btn btn-secondary ">
          Register
        </button>
        <p>{message}</p>
      </form>
    </div>
  );
}

export default Register;

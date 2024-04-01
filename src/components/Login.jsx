/* eslint-disable react/prop-types */
/* TODO - add your code to create a functional React component that renders a login form */
import { useState } from "react";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Login({ setToken, setIsLoggedIn, isLoggedIn }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();

    async function handleLogin(e) {
        e.preventDefault();
        console.log(email);
        const response = await fetch('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/login',
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                  })
            })
        const data = await response.json();
        console.log(data)
        setToken(data.token);
        setIsLoggedIn(true);
        navigate("/account")
    }     

  return (
    <div className="login">
      <div>
        <h2>Login</h2>
        <form onSubmit={(e) => handleLogin(e)}>
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
              type="Password"
              name="password"
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <button type="submit" className="btn btn-secondary ">
            {isLoggedIn ? 'Already Logged In' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;


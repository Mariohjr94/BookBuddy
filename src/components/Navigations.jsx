import { Link } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";
import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";

const NavBar = ({ token, setToken }) => {
  const [expanded, setExpanded] = useState([]);
  const navigate = useNavigate();

  const handleNavBarClick = () => {
    setExpanded(true);
  };

  const handleLogout = () => {
    setToken("");
    navigate("/");
  };

  return (
    <Navbar expand="lg" className="bg-light fixed-top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          BookBudddy
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Item>
              <Nav.Link as={Link} to="/" className="nav-link">
                Home
              </Nav.Link>
            </Nav.Item>
            {token ? (
              <>
                <Nav.Item>
                  <Nav.Link as={Link} to="/account" className="nav-link">
                    My Account
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link onClick={handleLogout} className="nav-link">
                    Logout
                  </Nav.Link>
                </Nav.Item>
              </>
            ) : (
              <>
                <Nav.Item>
                  <Nav.Link as={Link} to="/register" className="nav-link">
                    Register
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link as={Link} to="/login" className="nav-link">
                    Login
                  </Nav.Link>
                </Nav.Item>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;

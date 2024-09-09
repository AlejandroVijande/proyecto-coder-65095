import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import { Navbar } from "react-bootstrap";
import { CartWidget } from "../CartWidget/CartWidget";
// import "./NavBar.css"
import { Link } from "react-router-dom";

function NavBar() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  return (
    <Navbar className="navbar" bg="dark" variant="dark" >
      <Container>
        <Navbar.Brand as={Link} to="/">
          Music World 🎸
        </Navbar.Brand>
        <Nav className="me-auto">
          {categories.map((cat) => (
            <Nav.Link as={Link} to={`/category/${cat}`} key={cat}>
              {cat}
            </Nav.Link>
          ))}
        </Nav>
        <CartWidget />
      </Container>
    </Navbar>
  );
}

export default NavBar;

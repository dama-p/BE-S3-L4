import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function MyNavbar() {
  return (
    <>
      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Wp-react</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link>
              {" "}
              <Link to="/">Home</Link>
            </Nav.Link>
            <Nav.Link>
              {" "}
              <Link to="/form">Add a new post!</Link>
            </Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default MyNavbar;

import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function MyNavbar() {
  return (
    <>
      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">Wp-react</Navbar.Brand>
          <Nav className="gap-3 ms-auto">
           
              <Link to="/" className="text-white fw-bold" style={{textDecoration: "none"}}>Home</Link>
            
              <Link to="/form" className="text-white fw-bold" style={{textDecoration: "none"}}>Add a new post!</Link>
            
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default MyNavbar;

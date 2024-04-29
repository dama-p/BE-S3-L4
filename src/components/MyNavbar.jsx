import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";

function MyNavbar() {
  return (
    <Nav activeKey="/home" onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}>
      <Nav.Item>
        <Link to="/">Home</Link>
      </Nav.Item>
      <Nav.Item>
        <Link to="/">Home</Link>
      </Nav.Item>
      <Nav.Item>
        <Link to="/">Home</Link>
      </Nav.Item>
      <Nav.Item>
        <Link to="/">Home</Link>
      </Nav.Item>
    </Nav>
  );
}

export default MyNavbar;

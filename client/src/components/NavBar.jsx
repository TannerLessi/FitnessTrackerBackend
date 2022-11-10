import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../api/auth";
import Nav from "react-bootstrap/Nav";
import useAuth from "../hooks/useAuth";
function Navbar() {
  const navigate = useNavigate();
  //   const { user } = useAuth;

  return <Nav>{/* <Nav.Item>Welcome,{user.username}</Nav.Item> */}</Nav>;
}

export default Navbar;

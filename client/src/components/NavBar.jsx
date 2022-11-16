import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../api/auth";
import Nav from "react-bootstrap/Nav";
import useAuth from "../hooks/useAuth";

import Button from "react-bootstrap/Button";

function Navbar() {
  const navigate = useNavigate();
  const { user, setLoggedIn } = useAuth();
  console.log("User: ", user);

  return (
    <Nav>
      <Nav.Item>Welcome, {user.username}</Nav.Item>

      <Nav.Item>
        <Nav.Link href="/">Routines</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/activities">Activities</Nav.Link>
      </Nav.Item>

      {user.username === "Guest" ? (
        <>
          <Nav.Item>
            <Nav.Link href="/login"> Login</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/register">Register</Nav.Link>
          </Nav.Item>
        </>
      ) : null}

      {user.username !== "Guest" ? (
        <>
          <Nav.Item>
            <Nav.Link href="/routines/my_routines">My Routines</Nav.Link>

            <Button
              onClick={() => {
                logoutUser();
                navigate("/");
                setLoggedIn(false);
              }}
            >
              Logout
            </Button>
          </Nav.Item>
        </>
      ) : null}
    </Nav>
  );
}

export default Navbar;

import { useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import useAuth from "../hooks/useAuth";

import { registerUser, loginUser } from "../api/auth";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function AuthCompenent() {
  const { method } = useParams();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setLoggedIn } = useAuth();

  return (
    <div>
      <Form
        onSubmit={async (e) => {
          e.preventDefault();
          setError("");
          let result;
          if (method === "register") {
            result = await registerUser(username, password);
          } else {
            result = await loginUser(username, password);
          }
          console.log("RESULT", result);
          if (result.user) {
            setPassword("");
            setUsername("");
            setLoggedIn(true);
            navigate("/");
          } else {
            setError(result.message);
          }
        }}
      >
        {error && <h5>{error}</h5>}
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="username"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="password"
        />
        <Button variant="primary" type="submit">
          {method === "register" ? "Register" : "Login"}
        </Button>
      </Form>
    </div>
  );
}
//comment

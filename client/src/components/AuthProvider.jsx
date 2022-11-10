import { useState, useEffect } from "react";
import AuthContext from "../contexts/authContext";

import { fetchMe } from "../api/auth";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    async function getMe() {
      const result = await fetchMe();

      if (result?.loggedIn === false) {
        setUser({ username: "Guest" });
        console.log("result", result);
      } else {
        setUser(result);
        setLoggedIn(true);
      }
    }
    getMe();
  }, [loggedIn]);

  return (
    <AuthContext.Provider value={{ user, setUser, loggedIn, setLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}

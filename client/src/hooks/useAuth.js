import { useContext } from "react";
import authContext from "../contexts/authContext";

const useAuth = () => {
  const { user, setUser, loggedIn, setLoggedIn } = useContext(authContext);

  return { user, setUser, loggedIn, setLoggedIn };
};

export default useAuth;

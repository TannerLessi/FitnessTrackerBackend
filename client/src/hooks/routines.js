import { useContext } from "react";
import rountineContext from "../contexts/routinesContext";

const useRoutines = () => {
  const { routines, setRoutines } = useContext(rountineContext);

  return {
    routines,
    setRoutines,
  };
};

export default useRoutines;

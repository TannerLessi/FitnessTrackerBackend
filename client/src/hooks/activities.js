import { useContext } from "react";
import activityContext from "../contexts/activitiesContext";

const useActivities = () => {
  const { activities, setActivities } = useContext(activityContext);

  return {
    activities,
    setActivities,
  };
};

export default useActivities;

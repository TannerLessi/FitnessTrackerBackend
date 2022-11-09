import { useState, useEffect } from "react";
import activityContext from "../contexts/activitiesContext";

export default function activities({ children }) {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    async function getActivities() {
      try {
        const activities = await fetch("api/activities");
        const { allActivities } = await activities.json();

        setRoutines(allActivities);
      } catch (error) {
        console.log(error);
      }
    }
    getActivities();
  }, []);

  return (
    <activityContext.Provider value={{ activities, setActivities }}>
      {children}
    </activityContext.Provider>
  );
}

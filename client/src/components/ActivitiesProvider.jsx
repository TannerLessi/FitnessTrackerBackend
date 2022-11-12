import { useState, useEffect } from "react";
import { fetchActivities } from "../api/activities";
import activityContext from "../contexts/activitiesContext";

export default function ActivitiesProvider({ children }) {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    async function getActivities() {
      try {
        const allActivities = await fetchActivities();
        setActivities(allActivities);
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

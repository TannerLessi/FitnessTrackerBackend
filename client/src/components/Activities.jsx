import { useEffect } from "react";

import { fetchActivities } from "../api/activities";

import useActivities from "../hooks/useActivities";

import { useNavigate } from "react-router-dom";

function ActivitiesComponent() {
  const { activities, setActivities } = useActivities();
  const navigate = useNavigate();
  useEffect(() => {
    const getActivities = async () => {
      const data = await fetchActivities();
      setActivities(data);
    };
    getActivities();
  }, []);
  console.log("activity", activities);

  return (
    <div>
      {activities?.map((activity) => {
        console.log(activity);
        return (
          <div>
            <div>
              <div>name: {activity.name}</div>
              <div>description: {activity.description}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
export default ActivitiesComponent;

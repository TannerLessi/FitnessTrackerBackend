import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { fetchActivities } from "../api/activities";
import useActivities from "../hooks/useActivities";
import CreateNewActivity from "./CreateActivites";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import styles from "../styles/Activities.module.css";

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
    <div className={styles.container}>
      <CreateNewActivity />
      {activities?.map((activity) => {
        console.log(activity);
        return (
          <div key={activity.id} className={styles.container}>
            <Card style={{ width: "250px" }}>
              <Card.Title>Activity Name: {activity.name}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                description: {activity.description}
              </Card.Subtitle>
              <Button
                onClick={() => {
                  navigate(`/activities/${activity.id}`);
                }}
              >
                See Details
              </Button>
            </Card>
          </div>
        );
      })}
    </div>
  );
}
export default ActivitiesComponent;

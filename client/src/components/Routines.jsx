import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useRoutines from "../hooks/useRoutines";

import { fetchRoutines } from "../api/routines";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import styles from "../styles/Routines.module.css";

function RoutinesComponent() {
  const { routines, setRoutines } = useRoutines();
  const navigate = useNavigate();

  useEffect(() => {
    const getRoutines = async () => {
      const data = await fetchRoutines();
      setRoutines(data);
      console.log(data);
    };
    getRoutines();
  }, []);
  console.log("routine", routines);

  return (
    <div className={styles.container}>
      {routines.map((routine) => {
        return (
          <Card style={{ width: "400px" }}>
            <div>
              <Card.Title>Routine Name: {routine.name}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                Creator: {routine.creatorName}
              </Card.Subtitle>

              {routine?.activities?.map((activity) => {
                return (
                  <div>
                    <Card.Title>Activity Name: {activity.name}</Card.Title>
                    <p>Description: {activity.description}</p>
                    <h8>Count: {activity.count} , </h8>
                    <h8> Duration: {activity.duration}</h8>
                  </div>
                );
              })}
              <div>
                <Button
                  varient="primary"
                  onClick={() => {
                    navigate(`/routines/${routine.id}`);
                  }}
                >
                  See Details
                </Button>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}

export default RoutinesComponent;

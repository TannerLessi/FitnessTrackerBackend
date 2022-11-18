import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useActivities from "../hooks/useActivities";
import useRoutines from "../hooks/useRoutines";
import ActivitiesComponent from "./Activities";
import { fetchAddRA } from "../api/routine_activities";

import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Form from "react-bootstrap/Form";
function ActivitiesDropdownMenu({ routineId }) {
  const { activities } = useActivities();
  const [count, setCount] = useState();
  const [duration, setDuration] = useState();

  return (
    <form>
      <DropdownButton id="dropdown-basic-button" title="Dropdown button">
        {activities.map((activity) => {
          console.log(activity);
          return (
            <Dropdown.Item
              onClick={async () => {
                const result = await fetchAddRA(
                  routineId,
                  activity.id,
                  activity.count,
                  activity.duration
                );
              }}
            >
              {activity.name} {activity.count} {activity.duration}
            </Dropdown.Item>
          );
        })}
        <input
          type="text"
          value={count}
          onChange={(e) => {
            setCount(+e.target.value);
          }}
        />
      </DropdownButton>
    </form>
  );
}

export default ActivitiesDropdownMenu;

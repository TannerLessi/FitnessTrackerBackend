import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useActivities from "../hooks/useActivities";
import useRoutines from "../hooks/useRoutines";
import ActivitiesComponent from "./Activities";
import { fetchAddRA, editRA } from "../api/routine_activities";

import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Form from "react-bootstrap/Form";

function ActivitiesDropdownMenu({ routineId }) {
  const { activities } = useActivities();
  const [count, setCount] = useState("");
  const [duration, setDuration] = useState("");

  return (
    <form>
      <DropdownButton id="dropdown-basic-button" title="Select an Activity">
        {activities.map((activity) => {
          console.log(activity);
          return (
            <Dropdown.Item
              onClick={async () => {
                const result = await fetchAddRA(
                  routineId,
                  activity.id,
                  count,
                  duration
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
          placeholder="Count"
          onChange={(e) => {
            setCount(+e.target.value);
          }}
        />
        <input
          type="text"
          value={duration}
          placeholder="Duration"
          onChange={(e) => {
            setDuration(+e.target.value);
          }}
        />
      </DropdownButton>
    </form>
  );
}

export default ActivitiesDropdownMenu;

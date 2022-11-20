import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchActivityById, updateActivity } from "../api/activities";
import useAuth from "../hooks/useAuth";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";

function SingleActivity() {
  const { activityId } = useParams();
  const navigate = useNavigate();
  const [singleActivity, setSingleActivity] = useState([]);
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [showEdit, setShowEdit] = useState(false);

  useEffect(() => {
    async function getActivityById() {
      const activity = await fetchActivityById(activityId);
      setSingleActivity(activity);
      console.log(singleActivity);
      console.log("ID: ", activityId);
      setName(singleActivity.name);
      setDescription(singleActivity.description);
    }
    getActivityById();
  }, []);

  function displayEdit() {
    setShowEdit(true);
  }

  async function updateActivityById() {
    const result = await updateActivity(singleActivity.id, name, description);
    setShowEdit(false);
  }
  return (
    <Card style={{ width: "25rem" }}>
      <div>
        <p>Activity Name: {singleActivity.name}</p>
        <p>Description: {singleActivity.description} </p>
      </div>

      {user?.id === singleActivity?.creator_id && (
        <>
          <Button onClick={displayEdit}>Edit</Button>
          {showEdit === true ? (
            <Form
              onSubmit={async (e) => {
                e.preventDefault();
                const result = await updateActivity(
                  singleActivity.id,
                  name,
                  description
                );
                navigate("/activities");
              }}
            >
              <div>
                <label></label>
                <input
                  value={name}
                  type="text"
                  placeholder="Activity Name"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
                <label></label>
                <input
                  value={description}
                  type="text"
                  placeholder="Description"
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
                <button onClick={updateActivityById} type="submit">
                  Submit{" "}
                </button>
              </div>
            </Form>
          ) : null}
        </>
      )}
    </Card>
  );
}

export default SingleActivity;

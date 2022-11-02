const activities = [
  {
    name: "Incline Dumbbell Hammer Curl",
    description:
      "Lie down face up on an incline bench and lift thee barbells slowly upward toward chest",
  },
  {
    name: "bench press",
    description: "Lift a safe amount, but push yourself!",
  },
  {
    name: "Push Ups",
    description: "Pretty sure you know what to do!",
  },
  {
    name: "squats",
    description: "Heavy lifting.",
  },
  {
    name: "treadmill",
    description: "running",
  },
  {
    name: "stairs",
    description: "climb those stairs",
  },
  {
    name: "elliptical",
    description: "using the elliptical machine",
  },
  {
    name: "standing barbell curl",
    description: "Lift that barbell!",
  },
];

const routines = [
  {
    creator_id: 1,
    is_public: true,
    name: "Chest Day",
    goal: "To beef up the Chest and Triceps!",
  },
  {
    creator_id: 2,
    is_public: true,
    name: "Cardio Day",
    goal: "Running, stairs. Stuff that gets your heart pumping!",
  },
  {
    creator_id: 3,
    is_public: true,
    name: "Cardio Day test ",
    goal: "Running, stairs. Stuff that gets your heart pumping!",
  },
  {
    creator_id: 4,
    is_public: true,
    name: "Cardio Day test 2",
    goal: "Running, stairs. Stuff that gets your heart pumping!",
  },
];

const users = [
  {
    username: "albert",
    password: "bertie99",
  },
  {
    username: "sandra",
    password: "2sandy4me",
  },
  {
    username: "glamgal",
    password: "soglam",
  },
  {
    username: "albertTEST",
    password: "bertie99123",
  },
];

const routine_activities = [
  {
    routine_id: 2,
    activity_id: 3,
    duration: 30,
    count: 5,
  },
  {
    routine_id: 2,
    activity_id: 4,
    duration: 15,
    count: 10,
  },
  {
    routine_id: 4,
    activity_id: 6,
    duration: 45,
    count: 15,
  },
  {
    routine_id: 4,
    activity_id: 7,
    duration: 25,
    count: 10,
  },
];

module.exports = {
  activities,
  routines,
  routine_activities,
  users,
};

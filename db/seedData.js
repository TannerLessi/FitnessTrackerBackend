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
    creatorId: 1,
    isPublic: true,
    name: "Chest Day",
    goal: "To beef up the Chest and Triceps!",
  },
  {
    creatorId: 2,
    isPublic: true,
    name: "Cardio Day",
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
];

const routine_activities = [
  { routine_id: 2, activities_id: 3 },
  { routine_id: 2, activities_id: 4 },
  { routine_id: 4, activities_id: 6 },
  { routine_id: 4, activities_id: 7 },
];

module.exports = {
  activities,
  routines,
  routine_activities,
  users,
};

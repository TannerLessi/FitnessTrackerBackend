const activities = [
  {
    id: 2,
    name: "Incline Dumbbell Hammer Curl",
    description:
      "Lie down face up on an incline bench and lift thee barbells slowly upward toward chest",
  },
  {
    id: 3,
    name: "bench press",
    description: "Lift a safe amount, but push yourself!",
  },
  {
    id: 4,
    name: "Push Ups",
    description: "Pretty sure you know what to do!",
  },
  {
    id: 5,
    name: "squats",
    description: "Heavy lifting.",
  },
  {
    id: 6,
    name: "treadmill",
    description: "running",
  },
  {
    id: 7,
    name: "stairs",
    description: "climb those stairs",
  },
  {
    id: 8,
    name: "elliptical",
    description: "using the elliptical machine",
  },
  {
    id: 1,
    name: "standing barbell curl",
    description: "Lift that barbell!",
  },
];

const routines = [
  {
    id: 2,
    creatorId: 1,
    isPublic: true,
    name: "Chest Day",
    goal: "To beef up the Chest and Triceps!",
    creatorName: "albert",
    activities: [
      {
        id: 3,
        name: "bench press",
        description: "Lift a safe amount, but push yourself!",
        duration: 8,
        count: 10,
        routineActivityId: 6,
        routineId: 2,
      },
      {
        id: 4,
        name: "Push Ups",
        description: "Pretty sure you know what to do!",
        duration: 7,
        count: 10,
        routineActivityId: 7,
        routineId: 2,
      },
    ],
  },
  {
    id: 4,
    creatorId: 2,
    isPublic: true,
    name: "Cardio Day",
    goal: "Running, stairs. Stuff that gets your heart pumping!",
    creatorName: "sandra",
    activities: [
      {
        id: 6,
        name: "treadmill",
        description: "running",
        duration: 10,
        count: 10,
      },
      {
        id: 7,
        name: "stairs",
        description: "climb those stairs",
        duration: 15,
        count: 10,
      },
    ],
  },
];

const routine_activities = [
  { routine_id: 2, activities_id: 3 },
  { routine_id: 2, activities_id: 4 },
];

module.exports = {
  activities,
  routines,
  routine_activities,
};

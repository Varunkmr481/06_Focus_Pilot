function getHeaderTitle(path) {
  switch (path) {
    case "/home":
      return "Dashboard";
    case "/sessiontable":
      return "Session Table";
    case "/focusmode":
      return "Focus Mode";
    case "/planner":
      return "Planner";
    case "/milestones":
      return "Milestones";
    case "/leaderboard":
      return "Leaderboard";
    case "/support":
      return "Customer Care";
    case "/profile":
      return "Profile";
    case "/settings":
      return "Settings";
    case "/ds":
      return "New Dashboard";
    default:
      return "Dashboard";
  }
}

export default getHeaderTitle;

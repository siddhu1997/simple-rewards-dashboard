import { useContext } from "react";
import Header from "../Components/Header";
import RewardTabs from "../Components/RewardTabs";
import { DarkThemeContext } from "../Contexts/DarkThemeContext";
import { getThemeClasses } from "../utils/Helpers";

/**
 * Parent component
 */
const Dashboard = () => {
  const { darkMode } = useContext(DarkThemeContext);

  return (
    <div className={getThemeClasses(darkMode, "h-screen w-full")}>
      <Header />
      <RewardTabs />
    </div>
  );
};

export default Dashboard;

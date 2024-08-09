import Header from "../Components/Header";
import RewardTabs from "../Components/RewardTabs";

/**
 * Parent component
 */
const Dashboard = () => {
  return (
    <div className="w-full">
      <Header />
      <RewardTabs />
    </div>
  );
};

export default Dashboard;

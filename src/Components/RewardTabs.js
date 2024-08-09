import { useState } from "react";
import UserMonthlyRewards from "./RewardTables/UserMonthlyRewards";
import TotalRewards from "./RewardTables/TotalRewards";
import Transactions from "./RewardTables/Transactions";

const Index = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  return (
    <div className="w-full my-10">
      <div className="flex border-b border-gray-200">
        <button
          className={`flex-1 text-lg font-bold py-2 text-center ${
            activeTab === 0
              ? "border-b-2 border-black-500 text-black-500"
              : "text-gray-500"
          }`}
          onClick={() => handleTabClick(0)}
        >
          User Monthly Rewards
        </button>
        <button
          className={`flex-1 py-2 text-lg font-bold text-center ${
            activeTab === 1
              ? "border-b-2 border-black-500 text-black-500"
              : "text-gray-500"
          }`}
          onClick={() => handleTabClick(1)}
        >
          Total Rewards
        </button>
        <button
          className={`flex-1 py-2 text-lg font-bold text-center ${
            activeTab === 2
              ? "border-b-2 border-black-500 text-black-500"
              : "text-gray-500"
          }`}
          onClick={() => handleTabClick(2)}
        >
          Transactions
        </button>
      </div>
      <div className="p-4">
        {activeTab === 0 && <UserMonthlyRewards />}
        {activeTab === 1 && <TotalRewards />}
        {activeTab === 2 && <Transactions />}
      </div>
    </div>
  );
};

export default Index;

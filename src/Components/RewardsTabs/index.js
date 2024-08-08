import { useState } from "react";
import UserMonthlyRewards from "../RewardTables/UserMonthlyRewards";
import TotalRewards from "../RewardTables/TotalRewards";
import Transactions from "../RewardTables/Transactions";

const Index = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="w-full">
      <div className="flex border-b border-gray-200">
        <button
          className={`flex-1 py-2 text-center ${
            activeTab === 0
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab(0)}
        >
          User Monthly Rewards
        </button>
        <button
          className={`flex-1 py-2 text-center ${
            activeTab === 1
              ? "border-b-2 border-black-500 text-black-500"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab(1)}
        >
          Total Rewards
        </button>
        <button
          className={`flex-1 py-2 text-center ${
            activeTab === 2
              ? "border-b-2 border-black-500 text-blue-500"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab(2)}
        >
          Transactions
        </button>
      </div>
      <div className="p-4">
        {activeTab === 0 && (
          <div>
            <UserMonthlyRewards />
          </div>
        )}
        {activeTab === 1 && (
          <div>
            <TotalRewards />
          </div>
        )}
        {activeTab === 2 && (
          <div>
            <Transactions />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;

import { useState } from "react";
import { CONSTANTS } from "../utils/Config";
import getRewardTable from "./HOC/RewardTable";
import UserMonthlyRewards from "./UserMonthlyRewards";
import Table from "../Components/Table";
import {
  getUserMonthlyRewardsAPI,
  getTransactionsAPI,
  getTotalRewardsAPI,
} from "../Services";
import {
  userMonthlyRewardsFormatter,
  transactionsFormatter,
  totalRewardsFormatter,
} from "../utils/Helpers";

const WrappedUserMonthlyRewards = getRewardTable(UserMonthlyRewards, {
  columns: CONSTANTS.USER_MONTHLY_REWARDS_COLUMNS,
  fetchData: getUserMonthlyRewardsAPI,
  serializer: userMonthlyRewardsFormatter,
});

const WrappedTransactions = getRewardTable(Table, {
  columns: CONSTANTS.TRANSACTIONS_COLUMNS,
  fetchData: getTransactionsAPI,
  serializer: transactionsFormatter,
});

const WrappedTotalRewards = getRewardTable(Table, {
  columns: CONSTANTS.TOTAL_REWARDS_COLUMNS,
  fetchData: getTotalRewardsAPI,
  serializer: totalRewardsFormatter,
});

const RewardTabs = () => {
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
        {activeTab === 0 && <WrappedUserMonthlyRewards />}
        {activeTab === 1 && <WrappedTotalRewards />}
        {activeTab === 2 && <WrappedTransactions />}
      </div>
    </div>
  );
};

export default RewardTabs;

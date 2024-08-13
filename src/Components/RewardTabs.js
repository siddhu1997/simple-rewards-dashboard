import { useEffect, useState } from "react";
import { CONSTANTS } from "../utils/Config";
import getRewardTable from "./HOC/RewardTable";
import withDatePicker from "./HOC/WithDatePicker";
import UserMonthlyRewards from "./UserMonthlyRewards";
import Table from "../Components/Table";
import { getTransactionsAPI } from "../Services";
import {
  userMonthlyRewardsFormatter,
  transactionsFormatter,
  totalRewardsFormatter,
} from "../utils/Helpers";

const WrappedUserMonthlyRewards = withDatePicker(
  getRewardTable(UserMonthlyRewards, {
    columns: CONSTANTS.USER_MONTHLY_REWARDS_COLUMNS,
    serializer: userMonthlyRewardsFormatter,
  }),
);

const WrappedTransactions = getRewardTable(Table, {
  columns: CONSTANTS.TRANSACTIONS_COLUMNS,
  serializer: transactionsFormatter,
});

const WrappedTotalRewards = getRewardTable(Table, {
  columns: CONSTANTS.TOTAL_REWARDS_COLUMNS,
  serializer: totalRewardsFormatter,
});

const RewardTabs = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  useEffect(() => {
    setIsLoading(true);
    const getData = async () => {
      const apiData = await getTransactionsAPI();
      setData(apiData);
      setIsLoading(false);
    };
    getData();
  }, []);

  /**
   * We currently have 3 tabs where we show data in tabular format. They are:
   * 1. User Monthly Rewards  - Where we show data segregatted into months and each month has its own table.
   * 2. Total Rewards - Data of total rewards accumulated my each customer.
   * 3. Transactions -  This tab contains data od all transactions till date.
   */
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
        {activeTab === 0 && (
          <WrappedUserMonthlyRewards data={data} isLoading={isLoading} />
        )}
        {activeTab === 1 && (
          <WrappedTotalRewards data={data} isLoading={isLoading} />
        )}
        {activeTab === 2 && (
          <WrappedTransactions data={data} isLoading={isLoading} />
        )}
      </div>
    </div>
  );
};

export default RewardTabs;

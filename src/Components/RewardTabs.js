import { useContext, useEffect, useState } from "react";
import { CONSTANTS } from "../utils/Config";
import getRewardTable from "./HOC/RewardTable";
import withDatePicker from "./HOC/WithDatePicker";
import UserMonthlyRewards from "./UserMonthlyRewards";
import Table from "../Components/Table";
import { DarkThemeContext } from "../Contexts/DarkThemeContext";
import { getTransactionsAPI } from "../Services";
import {
  userMonthlyRewardsFormatter,
  transactionsFormatter,
  totalRewardsFormatter,
  getThemeClasses,
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
  const [startDate, setStartDate] = useState(CONSTANTS.REWARDS_START_DATE);
  const [data, setData] = useState([]);

  const { darkMode } = useContext(DarkThemeContext);

  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  const getActiveTabClass = (isActiveTab) => {
    return `flex-1 text-lg font-bold py-2 text-center mx-2 rounded-lg ${
      isActiveTab
        ? getThemeClasses(darkMode, getThemeClasses(darkMode, "border-b-2"))
        : getThemeClasses(darkMode, "")
    }`;
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
    <div className={getThemeClasses(darkMode, "w-full my-10")}>
      <div className={getThemeClasses(darkMode, "flex")}>
        <button
          className={getActiveTabClass(activeTab === 0)}
          onClick={() => handleTabClick(0)}
        >
          User Monthly Rewards
        </button>
        <button
          className={getActiveTabClass(activeTab === 1)}
          onClick={() => handleTabClick(1)}
        >
          Total Rewards
        </button>
        <button
          className={getActiveTabClass(activeTab === 2)}
          onClick={() => handleTabClick(2)}
        >
          Transactions
        </button>
      </div>
      <div className="p-4">
        {activeTab === 0 && (
          <WrappedUserMonthlyRewards
            data={data}
            isLoading={isLoading}
            startDate={startDate}
            setStartDate={setStartDate}
          />
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

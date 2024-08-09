import { useState, useEffect } from "react";
import Table from "../Table";
import Shimmer from "../Shimmer";
import getUserMonthlyRewardsAPI from "../../Services/GetUserMonthlyRewardsAPI";
import { userMonthlyRewardsFormatter } from "../../utils/Helpers";

const Index = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const apiData = await getUserMonthlyRewardsAPI();
      setData(userMonthlyRewardsFormatter(apiData));
    };
    // This batching is intentional to show Shimmer UI
    setIsLoading((_v) => {
      getData();
      return false;
    });
  }, []);

  const columns = [
    { name: "Customer ID", value: "customerId" },
    { name: "Name", value: "name" },
    { name: "Month", value: "month" },
    { name: "Year", value: "year" },
    { name: "Rewards", value: "rewards" },
  ];

  if (isLoading) {
    return <Shimmer columns={columns.length} />;
  }

  if (!isLoading && !data?.length) {
    return <h1>No data available!</h1>;
  }

  return (
    <div className="w-full flex flex-col justify-center">
      {Object.keys(data).map((month) => {
        return (
          <div key={month}>
            <div className="px-10 flex justify-start font-extrabold">
              <label>{month}</label>
            </div>
            <Table columns={columns} data={data[month]} />
          </div>
        );
      })}
    </div>
  );
};

export default Index;

import { useState, useEffect } from "react";
import Table from "../Table";
import Shimmer from "../Shimmer";
import YearSelector from "./YearSelector";
import { calculateRewards } from "../../utils";
import { fetchMockData } from "../../utils/data";

const userMonthlyRewardsFormatter = (data = []) => {
  return data.map(({ customerId, name, timestamp, price }) => {
    const date = new Date(timestamp);
    return {
      customerId,
      name,
      month: date.toLocaleString("en-US", { month: "long" }),
      year: date.getFullYear(),
      rewards: calculateRewards(price),
    };
  });
};

const Index = () => {
  const [data, setData] = useState(null);
  const [year, setYear] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  // Improvement: Can convert to custom hook if API endpoint is same.
  useEffect(() => {
    const getData = async () => {
      const apiData = await fetchMockData({ year });
      setData(apiData);
    };
    // This batching is intentional to show Shimmer UI
    setIsLoading((_v) => {
      getData();
      return false;
    });
  }, [year]);

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

  const yearOptions = ["all", "2022", "2023", "2024"];
  const formattedData = userMonthlyRewardsFormatter(data);

  return (
    <div className="w-full flex flex-col justify-center">
      <div className="w-full flex justify-end px-10">
        <YearSelector
          handleChange={setYear}
          options={yearOptions}
          current={year}
        />
      </div>
      <Table columns={columns} data={formattedData} />
    </div>
  );
};

export default Index;

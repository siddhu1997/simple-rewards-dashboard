import { useState, useEffect } from "react";
import Table from "../Table";
import Shimmer from "../Shimmer";
import { calculateRewards } from "../../utils";
import { fetchMockData } from "../../utils/data";

const totalRewardsFormatter = (data = []) => {
  return data.map(({ name, price }) => {
    return {
      name,
      rewards: calculateRewards(price),
    };
  });
};

const Index = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Improvement: Can convert to custom hook if API endpoint is same.
  useEffect(() => {
    const getData = async () => {
      const apiData = await fetchMockData({});
      setData(apiData);
    };
    // This batching is intentional to show Shimmer UI
    setIsLoading((_v) => {
      getData();
      return false;
    });
  }, []);

  const columns = [
    { name: "Customer Name", value: "name" },
    { name: "Rewards", value: "rewards" },
  ];

  if (isLoading) {
    return <Shimmer columns={columns.length} />;
  }

  const formattedData = totalRewardsFormatter(data);

  return <Table columns={columns} data={formattedData} />;
};

export default Index;

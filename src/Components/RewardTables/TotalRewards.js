import { useState, useEffect } from "react";
import Table from "../Table";
import Shimmer from "../Shimmer";
import { totalRewardsFormatter } from "../../utils/Helpers";
import getTotalRewardsAPI from "../../Services/GetTotalRewardsAPI";

const Index = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const apiData = await getTotalRewardsAPI();
      setData(totalRewardsFormatter(apiData));
    };
    // This batching is intentional to show Shimmer UI
    setIsLoading((_v) => {
      getData();
      return false;
    });
  }, []);

  const columns = [
    { name: "Customer ID", value: "customerId" },
    { name: "Customer Name", value: "name" },
    { name: "Rewards", value: "rewards" },
  ];

  if (isLoading) {
    return <Shimmer columns={columns.length} />;
  }

  if (!isLoading && !data?.length) {
    return <h1>No data available!</h1>;
  }

  return <Table columns={columns} data={data} />;
};

export default Index;

import { useState, useEffect } from "react";
import Shimmer from "../Shimmer";

/**
 * Higer Order Component for different Reward Tables.
 *
 * All 3 tables in our consideration does same set of actions in sequence - Show Shimmer, fetch, serialize and show data.
 */
const getRewardTable =
  (TargetTable, { fetchData, serializer, columns }) =>
  () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      setIsLoading(true);
      const getData = async () => {
        const apiData = await fetchData();
        setData(serializer(apiData));
        setIsLoading(false);
      };
      getData();
    }, []);

    if (isLoading) {
      return <Shimmer columns={columns.length} />;
    }

    if (!isLoading && !data) {
      return (
        <div className="w-full flex items-center justify-center my-10 text-2xl">
          <h1>No data available!</h1>
        </div>
      );
    }

    return (
      <div className="w-full flex flex-col justify-center">
        <TargetTable columns={columns} data={data} />
      </div>
    );
  };

export default getRewardTable;

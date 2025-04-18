import { useMemo } from "react";
import PropTypes from "prop-types";
import Shimmer from "../Shimmer";

/**
 * Higer Order Component for different Reward Tables.
 *
 * All 3 tables in our consideration does same set of actions in sequence - Show Shimmer, fetch, serialize and show data.
 */
const getRewardTable =
  (TargetTable, { serializer, columns }) =>
  ({ startDate, data, isLoading }) => {
    const memoizedData = useMemo(
      () => serializer(data, startDate),
      [startDate, data],
    );

    if (isLoading) {
      return <Shimmer columns={columns.length} />;
    }

    if (
      !isLoading &&
      (!memoizedData ||
        (Array.isArray(memoizedData) && !memoizedData.length) ||
        !Object.keys(memoizedData).length)
    ) {
      return (
        <div className="w-full flex items-center justify-center my-10 text-2xl">
          <h1>No data available!</h1>
        </div>
      );
    }

    return (
      <div className="w-full flex flex-col justify-center">
        <TargetTable columns={columns} data={memoizedData} />
      </div>
    );
  };

getRewardTable.propTypes = {
  serializer: PropTypes.func.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.string,
    }),
  ).isRequired,
  startDate: PropTypes.string,
  data: PropTypes.array,
  isLoading: PropTypes.bool,
};

export default getRewardTable;

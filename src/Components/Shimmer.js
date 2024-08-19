import PropTypes from "prop-types";

/**
 * This is pulsating skeletal loading table configurable by rows and columns.
 * Good UX as users will have a feint idea on what to epect or how data will look like in UI.
 */
const Shimmer = ({ rows = 5, columns = 3 }) => {
  return (
    <div className="flex items-center justify-center my-10 overflow-x-auto">
      <table className="w-10/12 bg-white">
        <thead>
          <tr>
            {Array.from({ length: columns }).map((_, index) => (
              <th
                key={index}
                className="py-2 px-4 bg-gray-200 border-b border-gray-300 text-left"
              >
                <div className="w-24 h-4 bg-gray-300 rounded animate-pulse"></div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <tr key={rowIndex}>
              {Array.from({ length: columns }).map((_, colIndex) => (
                <td
                  key={colIndex}
                  className="py-2 px-4 border-b border-gray-300"
                >
                  <div className="w-full h-4 bg-gray-300 rounded animate-pulse"></div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

Shimmer.propTypes = {
  rows: PropTypes.number,
  columns: PropTypes.number,
};

export default Shimmer;

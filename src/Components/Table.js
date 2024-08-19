import { useContext, useState } from "react";
import PropTypes from "prop-types";
import { DarkThemeContext } from "../Contexts/DarkThemeContext";
import { CONSTANTS } from "../utils/Config";
import { getThemeClasses } from "../utils/Helpers";

const { ROWS_PER_PAGE } = CONSTANTS;

const Table = ({ columns, data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { darkMode } = useContext(DarkThemeContext);

  // Calculate total pages
  const totalPages = Math.ceil(data.length / ROWS_PER_PAGE);

  // Calculate the rows to display
  const indexOfLastRow = currentPage * ROWS_PER_PAGE;
  const indexOfFirstRow = indexOfLastRow - ROWS_PER_PAGE;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);

  // Handlers for pagination
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  /**
   * Columns for each table must be defined in utils/Config.js.
   * They must be array of objects with "name" and "value" as two properties.
   * "name" will be the column name & "value" will be property name by which the formated data will be accessed.
   */
  return (
    <div className={getThemeClasses(darkMode, "w-full m-auto p-10")}>
      <div className="overflow-x-auto">
        <table className={getThemeClasses(darkMode, "min-w-full")}>
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className={getThemeClasses(
                    darkMode,
                    "py-2 px-4 border-b text-left capitalize",
                    true,
                  )}
                >
                  {column.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentRows.map((row, index) => (
              <tr key={index}>
                {columns.map((column, colIndex) => (
                  <td
                    key={colIndex}
                    className="py-2 px-4 border-b border-gray-300"
                  >
                    {row[column.value]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Show pagination buttons if no of rows exceeds ROWS_PER_PAGE */}
      {data.length > ROWS_PER_PAGE && (
        <div className="flex justify-between items-center p-4">
          <button
            className={getThemeClasses(
              darkMode,
              "px-4 py-2 rounded disabled:opacity-50",
            )}
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="px-4 py-2 bg-gray-200 text-gray-600 rounded disabled:opacity-50"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

Table.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.string,
    }),
  ),
  data: PropTypes.array,
};

export default Table;

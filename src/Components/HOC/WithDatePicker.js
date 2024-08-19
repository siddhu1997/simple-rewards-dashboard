import PropTypes from "prop-types";
import { useContext } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.module.css";
import { FaCircleInfo } from "react-icons/fa6";
import { DarkThemeContext } from "../../Contexts/DarkThemeContext";
import { getThemeClasses } from "../../utils/Helpers";

const ToolTip = ({ darkMode }) => {
  return (
    <div className="ml-2 relative group flex justify-center items-center">
      <FaCircleInfo />
      <div
        className={getThemeClasses(
          darkMode,
          "absolute bottom-full left-1/2 transform -translate-x-1/2 -translate-y-1 text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-48",
          true,
        )}
      >
        You can change the date by clicking on the date.
      </div>
    </div>
  );
};

const withDatePicker =
  (TargetComponent) =>
  ({ startDate, setStartDate, ...props }) => {
    const { darkMode } = useContext(DarkThemeContext);

    return (
      <div
        className={getThemeClasses(
          darkMode,
          "flex flex-col justify-end content-end items-center",
        )}
      >
        <div className="flex justify-end items-center">
          <label className="font-semibold">
            Showing 3 month records from:{" "}
          </label>
          <div className="flex items-center m-2">
            <DatePicker
              className={getThemeClasses(
                darkMode,
                "font-extrabold border border-solid rounded-lg px-2 w-32",
              )}
              selected={startDate}
              dateFormat="YYYY-MM-dd"
              onChange={(date) => setStartDate(date)}
              withPortal
            />
            <ToolTip darkMode={darkMode} />
          </div>
        </div>
        <TargetComponent startDate={startDate} {...props} />
      </div>
    );
  };

withDatePicker.propTypes = {
  startDate: PropTypes.string,
  setStartDate: PropTypes.func,
};

export default withDatePicker;

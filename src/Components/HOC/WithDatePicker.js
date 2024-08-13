import DatePicker from "react-datepicker";
import { FaCircleInfo } from "react-icons/fa6";
import "react-datepicker/dist/react-datepicker.module.css";

const ToolTip = () => {
  return (
    <div className="ml-2 relative group flex justify-center items-center">
      <FaCircleInfo />
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 -translate-y-1 bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-48">
        You can change the date by selecting a different date.
      </div>
    </div>
  );
};

const withDatePicker =
  (TargetComponent) =>
  ({ startDate, setStartDate, ...props }) => {
    return (
      <div className="flex flex-col justify-end content-end items-center">
        <div className="flex justify-end items-center">
          <label className="font-semibold">
            Showing 3 month records from:{" "}
          </label>
          <div className="flex items-center m-2">
            <DatePicker
              className="font-extrabold border border-solid rounded-lg px-2 w-32"
              selected={startDate}
              dateFormat="YYYY-MM-dd"
              onChange={(date) => setStartDate(date)}
              withPortal
            />
            <ToolTip />
          </div>
        </div>
        <TargetComponent startDate={startDate} {...props} />
      </div>
    );
  };

export default withDatePicker;

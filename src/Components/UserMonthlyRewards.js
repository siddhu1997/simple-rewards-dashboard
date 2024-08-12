import Table from "./Table";

/**
 * This table get its own component rather than generic "Table" component as all tables will be dynamic.
 * This component will render mumtiple tables based on data. For reference see: <root>/public/images/UserMonthlyRewards.png
 */
const UserMonthlyRewards = ({ columns, data }) => {
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

export default UserMonthlyRewards;

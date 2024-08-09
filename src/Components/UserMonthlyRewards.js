import Table from "./Table";

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

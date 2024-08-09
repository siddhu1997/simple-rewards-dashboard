const Index = ({ options, handleChange }) => {
  return (
    <div className="mb-4">
      <label htmlFor="year" className="mr-2 font-semibold capitalize">
        Select Year
      </label>
      <select
        id="year"
        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black-500"
        onChange={(e) => handleChange(e.target.value)}
      >
        {options.map((year, index) => (
          <option key={index} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Index;

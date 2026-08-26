type Props = {
  selectedMonth: string;
  selectedYear: string;
  setSelectedMonth: React.Dispatch<React.SetStateAction<string>>;
  setSelectedYear: React.Dispatch<React.SetStateAction<string>>;
  years: string[];
};

function PeriodSelector({ selectedMonth, selectedYear, setSelectedMonth, setSelectedYear, years, }: Props) {

  const months = [
    { name: "January", value: "01" },
    { name: "February", value: "02" },
    { name: "March", value: "03" },
    { name: "April", value: "04" },
    { name: "May", value: "05" },
    { name: "June", value: "06" },
    { name: "July", value: "07" },
    { name: "August", value: "08" },
    { name: "September", value: "09" },
    { name: "October", value: "10" },
    { name: "November", value: "11" },
    { name: "December", value: "12" },
  ];

  const border_style = "border border-gray-300 rounded-sm pl-1 pr-1 bg-white dark:bg-gray-700"

  return (
    <div className="flex flex-col justify-center items-center gap-4">

      <span className="font-bold text-indigo-700 dark:text-indigo-400">Select a period:</span>
      <div className="flex gap-2">

        <div className="flex items-center gap-2">
          <label htmlFor="month">Month</label>
          <select
            id="month"
            className={border_style}
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            {months.map((month) => (
              <option key={month.value} value={month.value}>
                {month.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="year">Year</label>
          <select
            id="year"
            className={border_style}
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            {years.length > 0 ? (
              years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))
            ) : (
              <option value={selectedYear}>
                {selectedYear}
              </option>
            )}
          </select>
        </div>
      </div>

    </div>
  );
}

export default PeriodSelector;
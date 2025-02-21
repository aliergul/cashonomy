import React from "react";
import { useGetIncomesQuery } from "../../store/recordsQuery";

const Incomes: React.FC = () => {
  const { data = { result: [], total: 0 } } = useGetIncomesQuery({
    type: "income",
    start: 0,
    count: 10,
  });

  return (
    <div className="text-black dark:text-white">
      <div className="flex flex-col">
        {data.result.map((record, index) => {
          return <span key={index}>{record.title}</span>;
        })}
      </div>
    </div>
  );
};

export default Incomes;

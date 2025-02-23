import React from "react";
import { useGetTagsQuery } from "../../store/tagsQuery";

const Tags: React.FC = () => {
  const { data = { result: [], total: 0 } } = useGetTagsQuery({
    start: 0,
    count: 10,
  });
  console.log("data", data);

  return (
    <div className="text-black dark:text-white">
      <div className="flex flex-col">
        {data.result.map((tag, index) => {
          return <span key={index}>{tag.title}</span>;
        })}
      </div>
    </div>
  );
};

export default Tags;

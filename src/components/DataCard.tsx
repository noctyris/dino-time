import React from "react";

export default function DataCard({
  icon,
  data,
}: {
  icon: React.ReactElement;
  data: string;
}) {
  return (
    <div className="flex bg-gray-500/75 rounded-2xl w-75 items-center py-2 px-5 mx-auto">
      {icon}
      <span className="flex-1 text-center">{data}</span>
    </div>
  );
}

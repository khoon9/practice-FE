import React, { useEffect, useRef } from "react";

const BaseStat = ({ valueStat, nameStat, type }) => {
  const bg = `bg-${type}`;

  const ref = useRef(null);
  useEffect(() => {
    const setValueStat = ref.current;
    const calc = valueStat * (100 / 255);
    setValueStat.style.width = calc + "%";
  }, []);
  return (
    <tr className="w-full text-white">
      <td className="sm:px-5 text-[1rem]">{nameStat}</td>
      <td className="px-2 sm:px-3">{valueStat}</td>
      <td>
        <div
          className={`flex items-start h2 min-w-[10rem] bg-gray-600 overflow-hidden`}
        >
          <div ref={ref} className={`h-3 ${bg}`}></div>
        </div>
      </td>
      <td className="px-2 sm:px-5">255</td>
    </tr>
  );
};

export default BaseStat;

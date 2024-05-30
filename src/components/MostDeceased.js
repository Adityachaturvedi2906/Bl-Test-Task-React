import React, { useState, useEffect } from "react";
import { COVID_API } from "../utils/constants";

const MostDeceased = () => {
  const [topDeceasedStates, setTopDeceasedStates] = useState([]);
  const formatNumberWithCommas = (number) => {
    return new Intl.NumberFormat('en-US').format(number);
  };
  const transformData = (data) => {
    const transformedData = Object.keys(data)
      .map((state) => ({
        state,
        deceased: data[state].total.deceased || 0,
      }))
      .sort((a, b) => b.deceased - a.deceased) // Sort by deceased cases in descending order
      .slice(0, 10); // Get the top 10 states
    return transformedData;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(COVID_API);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const json = await response.json();
        const dataArray = transformData(json);
        setTopDeceasedStates(dataArray);
      } catch (error) {
        console.error("Error fetching data:", error);
        setTopDeceasedStates([]);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="my-8">
      {topDeceasedStates.length > 0 ? (
        <>
          {topDeceasedStates.map((stateData, index) => (
            <ul className="flex justify-between pb-1">
              <li key={index} className="text-xl font-bold">{formatNumberWithCommas(stateData.deceased)}</li>
              <li className="ms-4 text-gray-300 font-bold">{stateData.state}</li>
            </ul>
          ))}
        </>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default MostDeceased;

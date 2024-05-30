import React, { useEffect, useState } from "react";
import DatamapsIndia from "react-datamaps-india";
import { stateNameMap } from "../utils/constants";
import { COVID_API } from "../utils/constants";

const Geochart = () => {
  const [regionData, setRegionData] = useState({});
  const [covidData, setCovidData] = useState([]);

  const transformData = (data) => {
    const transformedData = Object.keys(data).map((state) => ({
      state,
      deceased: data[state].total.deceased || 0,
    }));
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
        setCovidData(dataArray);
      } catch (error) {
        console.error("Error fetching data:", error);
        setCovidData([]);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const transformedData = covidData.reduce((acc, { state, deceased }) => {
      const stateName = stateNameMap[state];
      if (stateName) {
        acc[stateName] = { value: deceased };
      }
      return acc;
    }, {});
    setRegionData(transformedData);
  }, [covidData]);

  return (
    <div style={{ height: "400px", width: "430px", position: "relative" }} className="bg-[#f4f7fa] rounded-xl">
      <DatamapsIndia
        style={{ position: "relative", left: "25%" }}
        regionData={regionData}
        mapLayout={{
          legendTitle: "Number of Deceased",
          startColor: "#e60007",
          endColor: "#ffb3b3",
          noDataColor: "#f5f5f5",
          borderColor: "#8d8d8d",
          hoverColor: "blue",
        }}
        hoverComponent={({ value }) => {
          return (
            <div>
              <div>
                {value.name} {value.value}
              </div>
            </div>
          );
        }}
      />
    </div>
  );
};

export default Geochart;

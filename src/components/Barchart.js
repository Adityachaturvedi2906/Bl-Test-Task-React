import React, { useEffect, useState } from "react";
import { ResponsiveBar } from "@nivo/bar";
import { COVID_API } from "../utils/constants";

const MyResponsiveBar = ({ data }) => (
  <ResponsiveBar
    data={data}
    keys={["deceased", "recovered"]}
    indexBy="state"
    margin={{ top: 50, right: 40, bottom: 50, left: 60 }}
    padding={0.2}
    innerPadding={10}
    groupMode="grouped"
    valueScale={{ type: "linear" }}
    indexScale={{ type: "band", round: true }}
    colors={({ id }) => (id === "deceased" ? "red" : "green")}
    colorBy="id"
    defs={[
      {
        id: "deceasedPattern",
        type: "patternLines",
        background: "inherit",
        color: "red",
        size: 4,
        padding: 1,
        stagger: true,
      },
      {
        id: "recoveredPattern",
        type: "patternLines",
        background: "inherit",
        color: "green",
        rotation: -45,
        lineWidth: 4,
        spacing: 10,
      },
    ]}
    borderRadius={15}
    borderColor={{
      from: "color",
      modifiers: [["darker", 1.6]],
    }}
    axisTop={null}
    axisRight={null}
    axisBottom={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "State",
      legendPosition: "middle",
      legendOffset: 32,
    }}
    axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "",
        legendPosition: "middle",
        legendOffset: -40,
      }}
      enableLabel={false}
    labelSkipWidth={5}
    labelSkipHeight={12}
    labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
    legends={[
      {
        dataFrom: "keys",
        anchor: "top",
        direction: "row",
        justify: false,
        translateX: 500,
        translateY: -41,
        itemsSpacing: 4,
        itemWidth: 100,
        itemHeight: 26,
        itemDirection: "left-to-right",
        itemOpacity: 0.85,
        symbolSize: 20,
        effects: [
          {
            on: "hover",
            style: {
              itemOpacity: 1,
            },
          },
        ],
      },
    ]}
    role="application"
    ariaLabel="Nivo bar chart demo"
    barAriaLabel={(e) =>
      `${e.id}: ${e.formattedValue} in state: ${e.indexValue}`
    }
  />
);

const BarChart = () => {
  const [covidData, setCovidData] = useState([]);

  const transformData = (data) => {
    const transformedData = Object.keys(data)
      .map((state) => ({
        state,
        deceased: data[state].total.deceased || 0,
        recovered: data[state].total.recovered || 0,
      }))
      .sort((a, b) => b.recovered + a.recovered) // Sort by deceased cases in descending order
      .slice(8, 20); // Slice to include only the top 8 states with the highest deceased cases
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

//   console.log(covidData);
  return (
    <div className="w-[90vw] mx-7 p-4 px-6 bg-white rounded-xl shadow-sm">
      <h2 className="text-lg font-bold text-blue-950">Covid-19 Statistics</h2>
      <div style={{ height: "300px" }}>
        {covidData.length > 0 && <MyResponsiveBar data={covidData} />}
      </div>
    </div>
  );
};

export default BarChart;

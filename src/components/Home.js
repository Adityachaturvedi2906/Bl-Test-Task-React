import React from "react";
import Barchart from "./Barchart";
import Piechart from "./Piechart";
import Geochart from "./Geochart";
import FirstLinearChart from "./FirstLinearChart";
import SecondLinearChart from "./SecondLinearChart";
import ThirdLinearChart from "./ThirdLinearChart";
import Symptoms from "./Symptoms";
import MostDeceased from "./MostDeceased";

const Home = () => {
  return (
    <div>
      <div className="flex ms-7">
        <div className=" px-6 my-4 mx-1 me-5 shadow-md bg-white rounded-2xl mt-3">
          <FirstLinearChart />
        </div>
        <div className=" px-6 my-4 mx-1 me-5 shadow-md bg-white rounded-2xl mt-3">
          <SecondLinearChart />
        </div>
        <div className=" px-6 my-4 mx-1 me-5 shadow-md bg-white rounded-2xl mt-3">
          <ThirdLinearChart />
        </div>
        <div className=" px-4 my-4 mx-1 me-10 shadow-md bg-[#8435EF] rounded-2xl mt-3">
          <Symptoms />
        </div>
      </div>
      <Barchart />
      <div className=" px-6 py-4 my-4 mx-8 me-12 shadow-md bg-white rounded-2xl mt-3">
        <h2 className="text-black text-2xl font-semibold">World Map</h2>
        <div className="flex mt-2 justify-around">
        <MostDeceased />
          <Piechart />
          <Geochart />
        </div>
      </div>
    </div>
  );
};

export default Home;

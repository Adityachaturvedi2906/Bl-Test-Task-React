import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Box } from '@mui/material';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from 'chart.js';
import { COVID_API } from '../utils/constants';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

const SecondLinearChart = () => {
  const [totalDeceased, setTotalDeceased] = useState(0);

  useEffect(() => {
    const transformData = (data) => {
      return Object.values(data).reduce((total, stateData) => {
        return total + (stateData.total.deceased || 0);
      }, 0);
    };

    const fetchData = async () => {
      try {
        const response = await fetch(COVID_API);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const json = await response.json();
        const total = transformData(json);
        console.log(total);
        setTotalDeceased(total);
      } catch (error) {
        console.error("Error fetching data:", error);
        setTotalDeceased(0);
      }
    };

    fetchData();
  }, []);

  const data = {
    labels: ['', 'Deceased', '', ''],
    datasets: [
      {
        label: '',
        data: [ 0, totalDeceased, 0, 0, 0],
        fill: false,
        backgroundColor: 'rgba(46,250,250)',
        borderColor: 'rgba(242,53,53)',
        borderWidth: 4,
        tension: 0.4,
        pointBackgroundColor: 'rgba(242,53,53)',
        pointBorderColor: 'rgba(255,255,255)',
        pointBorderWidth: 2,
        pointRadius: [0, 5, 0],
        pointHoverRadius: 5,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
    elements: {
      point: {
        radius: [0, 5, 0],
      },
    },
  };

  return (
    <div>
      <Box sx={{ padding: '50px', width: '100%', height: '200px' }}>
        <Line data={data} options={options} />
        <div className='mt-1'>
        <h2 className='text-2xl font-bold text-[#f23535]'>{totalDeceased}</h2>
        <h2 className="font-semibold text-xl leading-3">Deceased</h2>
        </div>
      </Box>
    </div>
  );
};

export default SecondLinearChart;

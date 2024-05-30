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

const FirstLinearChart = () => {
  const [totalConfirmed, setTotalConfirmed] = useState(0);

  useEffect(() => {
    const transformData = (data) => {
      return Object.values(data).reduce((total, stateData) => {
        return total + (stateData.total.confirmed || 0);
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
        setTotalConfirmed(total);
      } catch (error) {
        console.error("Error fetching data:", error);
        setTotalConfirmed(0);
      }
    };

    fetchData();
  }, []);

  const data = {
    labels: ['', 'Cases', ''],
    datasets: [
      {
        label: '',
        data: [0, totalConfirmed, 0],
        fill: false,
        backgroundColor: 'rgba(46,250,250)',
        borderColor: 'rgba(72,211,243)',
        borderWidth: 4,
        tension: 0.4,
        pointBackgroundColor: 'rgba(72,211,243)',
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
        <h2 className='text-2xl font-bold text-[#48D3F3]'>{totalConfirmed}</h2>
        <h2 className="font-semibold text-xl leading-3">Total Cases</h2>
        </div>
      </Box>
    </div>
  );
};

export default FirstLinearChart;

import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Legend, Label } from 'recharts';
import { COVID_API } from '../utils/constants';

const Piechart = () => {
    const [totalDeceased, setTotalDeceased] = useState(0);
    const [totalRecovered, setTotalRecovered] = useState(0);
    const [totalConfirmed, setTotalConfirmed] = useState(0);
    const formatNumberWithCommas = (number) => {
        return new Intl.NumberFormat('en-US').format(number);
      };
    const COLORS = ['Red', '#009900'];
    const CustomLabel = ({ totalConfirmed }) => {
        return (
            <text x={200} y={210} textAnchor="middle" dominantBaseline="central">
            <tspan x={200} dy="-1.2em" className='text-xl font-bold'>{formatNumberWithCommas(totalConfirmed)}</tspan>
            <tspan x={200} dy="1.4em" className='mt-2 text-xs font-bold'>Total Confirmed</tspan>
          </text>          
        );
      };
    const transformData = (data) => {
        let totalDeceased = 0;
        let totalRecovered = 0;

        Object.keys(data).forEach((state) => {
            totalDeceased += data[state].total.deceased || 0;
            totalRecovered += data[state].total.recovered || 0;
        });

        setTotalDeceased(totalDeceased);
        setTotalRecovered(totalRecovered);
        setTotalConfirmed(totalDeceased + totalRecovered);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(COVID_API);
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                const json = await response.json();
                transformData(json);
            } catch (error) {
                console.error("Error fetching data:", error);
                setTotalDeceased(0);
                setTotalRecovered(0);
                setTotalConfirmed(0);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <PieChart width={400} height={400}>
                <Pie
                    data={[
                        { name: 'Deceased', value: totalDeceased },
                        { name: 'Recovered', value: totalRecovered },
                    ]}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    innerRadius={80}
                    fill="#8884d8"
                    label
                >
                    {
                        [{ name: 'Deceased' }, { name: 'Recovered' }].map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                    }
                    <Label content={<CustomLabel totalConfirmed={totalConfirmed} />} position="center" />


                </Pie>
                <Legend />
            </PieChart>
        </div>
    );
};

export default Piechart;

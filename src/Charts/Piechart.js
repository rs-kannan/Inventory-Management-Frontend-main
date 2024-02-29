import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

const data = {
  labels,
  datasets: [
    {
      label: 'Users',
      data: [1,3,4,0,0,1,1],
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Orders',
      data: [0,0,0,1,1,1,0],
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

export function Piechart() {
  return <Bar options={options} data={data} />;
}

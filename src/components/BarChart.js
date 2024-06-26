// src/components/BarChart.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Register the necessary components and scales with Chart.js
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const BarChart = ({ metrics, title, metric }) => {
    const chartData = {
        labels: metrics.map(m => m.label),
        datasets: [
            {
                label: title,
                data: metrics.map(m => m[metric]),
                backgroundColor: metrics.map(() => `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.2)`),
                borderColor: metrics.map(() => `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`),
                borderWidth: 1,
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: title,
                },
            },
        },
    };

    return (
        <>
            <h1>{title}</h1>
            <Bar data={chartData} options={options} />
        </>
    );
};

export default BarChart;

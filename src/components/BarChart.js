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

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const BarChart = ({ metrics, title, metric }) => {
    if (!metrics || metrics.length === 0) {
        return (
            <div className="loading-container">
                <p>No data available</p>
            </div>
        );
    }

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
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: title,
                },
            },
        },
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                mode: 'index',
                intersect: false,
            },
        },
    };

    return (
        <div style={{ height: '400px' }}>
            <h1>{title}</h1>
            <Bar data={chartData} options={options} />
        </div>
    );
};

export default BarChart;

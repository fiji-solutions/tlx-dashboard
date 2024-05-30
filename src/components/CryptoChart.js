// src/components/CryptoChart.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    TimeScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import 'chartjs-adapter-date-fns';

// Register the necessary components and scales with Chart.js
ChartJS.register(
    TimeScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const CryptoChart = ({ datasets, title, metric }) => {
    const chartData = {
        labels: datasets[0]?.data.map(entry => new Date(entry.timestamp)) || [],
        datasets: datasets.map(dataset => ({
            label: dataset.label,
            data: dataset.data.map(entry => entry[metric]),
            fill: false,
            backgroundColor: dataset.backgroundColor,
            borderColor: dataset.borderColor,
        })),
    };

    const options = {
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'day',
                    tooltipFormat: 'MM/dd/yyyy',
                },
                title: {
                    display: true,
                    text: 'Date',
                },
            },
            y: {
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
            <Line data={chartData} options={options} />
        </>
    );
};

export default CryptoChart;

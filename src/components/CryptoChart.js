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
    // Collect all unique timestamps from all datasets
    const allTimestamps = datasets.reduce((acc, dataset) => {
        dataset.data.forEach(entry => {
            const timestamp = new Date(entry.timestamp).toISOString();
            if (!acc.includes(timestamp)) {
                acc.push(timestamp);
            }
        });
        return acc;
    }, []).sort((a, b) => new Date(a) - new Date(b));

    // Align each dataset with the unified labels (timestamps)
    const alignedDatasets = datasets.map(dataset => {
        const dataMap = new Map(dataset.data.map(entry => [new Date(entry.timestamp).toISOString(), entry[metric]]));
        const data = allTimestamps.map(timestamp => dataMap.get(timestamp) || null);
        return {
            label: dataset.label,
            data: data,
            fill: false,
            backgroundColor: dataset.backgroundColor,
            borderColor: dataset.borderColor,
        };
    });

    const chartData = {
        labels: allTimestamps,
        datasets: alignedDatasets,
    };

    const options = {
        scales: {
            x: {
                type: 'time',
                time: {
                    tooltipFormat: 'MM/dd/yyyy HH:mm:ss',
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

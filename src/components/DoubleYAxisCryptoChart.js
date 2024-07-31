// src/components/DoubleYAxisCryptoChart.js
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

const DoubleYAxisCryptoChart = ({ dataset1, dataset2, title1, title2, metric, showDatesOnly = false }) => {
    // Collect all unique timestamps from both datasets
    const allTimestamps = [...new Set([
        ...dataset1.data.map(entry => new Date(entry.timestamp).toISOString()),
        ...dataset2.data.map(entry => new Date(entry.timestamp).toISOString())
    ])].sort((a, b) => new Date(a) - new Date(b));

    // Align each dataset with the unified labels (timestamps)
    const alignedDataset1 = {
        label: dataset1.label,
        data: allTimestamps.map(timestamp => {
            const entry = dataset1.data.find(entry => new Date(entry.timestamp).toISOString() === timestamp);
            return entry ? parseFloat(entry[metric]) : null;
        }),
        fill: false,
        backgroundColor: dataset1.backgroundColor,
        borderColor: dataset1.borderColor,
        yAxisID: 'y-axis-1',
    };

    const alignedDataset2 = {
        label: dataset2.label,
        data: allTimestamps.map(timestamp => {
            const entry = dataset2.data.find(entry => new Date(entry.timestamp).toISOString() === timestamp);
            return entry ? parseFloat(entry[metric]) : null;
        }),
        fill: false,
        backgroundColor: dataset2.backgroundColor,
        borderColor: dataset2.borderColor,
        yAxisID: 'y-axis-2',
    };

    const chartData = {
        labels: allTimestamps,
        datasets: [alignedDataset1, alignedDataset2],
    };

    // Determine the time range
    const startTime = new Date(allTimestamps[0]);
    const endTime = new Date(allTimestamps[allTimestamps.length - 1]);
    const timeDifference = endTime - startTime;

    let unit = 'minute';
    let stepSize = 1;

    if (timeDifference > 365 * 24 * 60 * 60 * 1000) { // More than a year
        unit = 'month';
        stepSize = 1;
    } else if (timeDifference > 30 * 24 * 60 * 60 * 1000) { // More than a month
        unit = 'day';
        stepSize = 1;
    } else if (timeDifference > 7 * 24 * 60 * 60 * 1000) { // More than a week
        unit = 'day';
        stepSize = 1;
    } else if (timeDifference > 24 * 60 * 60 * 1000) { // More than a day
        unit = 'hour';
        stepSize = 1;
    } else if (timeDifference > 60 * 60 * 1000) { // More than an hour
        unit = 'minute';
        stepSize = 15;
    }

    const options = {
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: showDatesOnly ? 'day' : unit,
                    stepSize: showDatesOnly ? 1 : stepSize,
                    tooltipFormat: showDatesOnly ? 'MM/dd/yyyy' : 'MM/dd/yyyy HH:mm:ss',
                },
                title: {
                    display: true,
                    text: 'Date',
                },
            },
            'y-axis-1': {
                type: 'linear',
                position: 'left',
                title: {
                    display: true,
                    text: title1,
                },
                ticks: {
                    beginAtZero: true,
                },
            },
            'y-axis-2': {
                type: 'linear',
                position: 'right',
                title: {
                    display: true,
                    text: title2,
                },
                grid: {
                    drawOnChartArea: false,
                },
                ticks: {
                    beginAtZero: true,
                },
            },
        },
    };

    return (
        <>
            <h1>{title1} and {title2}</h1>
            <Line data={chartData} options={options} />
        </>
    );
};

export default DoubleYAxisCryptoChart;

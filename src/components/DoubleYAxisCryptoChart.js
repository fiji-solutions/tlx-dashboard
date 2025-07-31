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
    // Enhanced validation for datasets
    if (!dataset1 || !dataset2 ||
        !dataset1.data || !dataset2.data ||
        !Array.isArray(dataset1.data) || !Array.isArray(dataset2.data) ||
        dataset1.data.length === 0 || dataset2.data.length === 0) {
        return (
            <div className="loading-container">
                <p>No data available</p>
            </div>
        );
    }

    // Safely extract timestamps with validation
    const timestamps1 = dataset1.data
        .filter(entry => entry && entry.timestamp)
        .map(entry => {
            const date = new Date(entry.timestamp);
            return !isNaN(date.getTime()) ? date.toISOString() : null;
        })
        .filter(timestamp => timestamp !== null);

    const timestamps2 = dataset2.data
        .filter(entry => entry && entry.timestamp)
        .map(entry => {
            const date = new Date(entry.timestamp);
            return !isNaN(date.getTime()) ? date.toISOString() : null;
        })
        .filter(timestamp => timestamp !== null);

    const allTimestamps = [...new Set([...timestamps1, ...timestamps2])]
        .sort((a, b) => new Date(a) - new Date(b));

    if (allTimestamps.length === 0) {
        return (
            <div className="loading-container">
                <p>No valid timestamps found</p>
            </div>
        );
    }

    const alignedDataset1 = {
        label: dataset1.label,
        data: allTimestamps.map(timestamp => {
            const entry = dataset1.data.find(entry => {
                if (!entry || !entry.timestamp) return false;
                const date = new Date(entry.timestamp);
                return !isNaN(date.getTime()) && date.toISOString() === timestamp;
            });
            return entry && entry[metric] !== undefined ? parseFloat(entry[metric]) || null : null;
        }),
        fill: false,
        backgroundColor: dataset1.backgroundColor || '#1976d2',
        borderColor: dataset1.borderColor || '#1976d2',
        yAxisID: 'y-axis-1',
    };

    const alignedDataset2 = {
        label: dataset2.label,
        data: allTimestamps.map(timestamp => {
            const entry = dataset2.data.find(entry => {
                if (!entry || !entry.timestamp) return false;
                const date = new Date(entry.timestamp);
                return !isNaN(date.getTime()) && date.toISOString() === timestamp;
            });
            return entry && entry[metric] !== undefined ? parseFloat(entry[metric]) || null : null;
        }),
        fill: false,
        backgroundColor: dataset2.backgroundColor || '#9c27b0',
        borderColor: dataset2.borderColor || '#9c27b0',
        yAxisID: 'y-axis-2',
    };

    const chartData = {
        labels: allTimestamps,
        datasets: [alignedDataset1, alignedDataset2],
    };

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
        responsive: true,
        maintainAspectRatio: false,
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
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                mode: 'index',
                intersect: false,
            },
        },
        interaction: {
            mode: 'nearest',
            axis: 'x',
            intersect: false,
        },
    };

    return (
        <div style={{ height: '400px' }}>
            <h1>{title1} and {title2}</h1>
            <Line data={chartData} options={options} />
        </div>
    );
};

export default DoubleYAxisCryptoChart;

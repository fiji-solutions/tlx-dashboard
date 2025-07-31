import React from 'react';
import { Line } from 'react-chartjs-2';
import { Box, useTheme, alpha } from '@mui/material';
import {
    Chart as ChartJS,
    TimeScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';
import 'chartjs-adapter-date-fns';

ChartJS.register(
    TimeScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const CryptoChart = ({ datasets, title, metric, showDatesOnly = false, plugins = [] }) => {
    const theme = useTheme();

    // Enhanced validation for datasets
    if (!datasets || datasets.length === 0 || !Array.isArray(datasets)) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight={400}
                sx={{
                    background: alpha(theme.palette.grey[100], 0.5),
                    borderRadius: 2
                }}
            >
                <Box textAlign="center" color="text.secondary">
                    No data available
                </Box>
            </Box>
        );
    }

    // Validate that datasets have data and the data is properly formatted
    const validDatasets = datasets.filter(dataset =>
        dataset &&
        dataset.data &&
        Array.isArray(dataset.data) &&
        dataset.data.length > 0
    );

    if (validDatasets.length === 0) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight={400}
                sx={{
                    background: alpha(theme.palette.grey[100], 0.5),
                    borderRadius: 2
                }}
            >
                <Box textAlign="center" color="text.secondary">
                    No valid data available
                </Box>
            </Box>
        );
    }

    const allTimestamps = validDatasets.reduce((acc, dataset) => {
        dataset.data.forEach(entry => {
            // Validate timestamp before processing
            if (entry && entry.timestamp) {
                const date = new Date(entry.timestamp);
                if (!isNaN(date.getTime())) {
                    const timestamp = date.toISOString();
                    if (!acc.includes(timestamp)) {
                        acc.push(timestamp);
                    }
                }
            }
        });
        return acc;
    }, []).sort((a, b) => new Date(a) - new Date(b));

    if (allTimestamps.length === 0) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight={400}
                sx={{
                    background: alpha(theme.palette.grey[100], 0.5),
                    borderRadius: 2
                }}
            >
                <Box textAlign="center" color="text.secondary">
                    No valid timestamps found
                </Box>
            </Box>
        );
    }

    const alignedDatasets = validDatasets.map(dataset => {
        const dataMap = new Map();

        // Safely build the data map with validation
        dataset.data.forEach(entry => {
            if (entry && entry.timestamp && entry[metric] !== undefined) {
                const date = new Date(entry.timestamp);
                if (!isNaN(date.getTime())) {
                    dataMap.set(date.toISOString(), entry[metric]);
                }
            }
        });

        const data = allTimestamps.map(timestamp => dataMap.get(timestamp) || null);

        return {
            label: dataset.label,
            data: data,
            fill: false,
            backgroundColor: dataset.backgroundColor || theme.palette.primary.main,
            borderColor: dataset.borderColor || theme.palette.primary.main,
            borderWidth: dataset.borderWidth || 2,
            pointRadius: dataset.pointRadius || 0,
            pointHoverRadius: dataset.pointHoverRadius || 4,
            tension: dataset.tension || 0.1,
        };
    });

    const chartData = {
        labels: allTimestamps,
        datasets: alignedDatasets,
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
        interaction: {
            mode: 'index',
            intersect: false,
        },
        elements: {
            point: {
                radius: 0,
                hoverRadius: 6,
                hitRadius: 10,
            },
            line: {
                tension: 0.2,
                borderWidth: 3,
            },
        },
        layout: {
            padding: {
                top: 20,
                right: 20,
                bottom: 20,
                left: 20,
            },
        },
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: showDatesOnly ? 'day' : unit,
                    stepSize: showDatesOnly ? 1 : stepSize,
                    tooltipFormat: showDatesOnly ? 'MM/dd/yyyy' : 'MM/dd/yyyy HH:mm:ss',
                },
                grid: {
                    color: alpha(theme.palette.divider, 0.3),
                    lineWidth: 1,
                },
                ticks: {
                    color: theme.palette.text.secondary,
                    font: {
                        size: 12,
                        weight: 500,
                    },
                    maxTicksLimit: 8,
                },
                title: {
                    display: true,
                    text: 'Date',
                    color: theme.palette.text.primary,
                    font: {
                        size: 14,
                        weight: 600,
                    },
                },
            },
            y: {
                grid: {
                    color: alpha(theme.palette.divider, 0.2),
                    lineWidth: 1,
                },
                ticks: {
                    color: theme.palette.text.secondary,
                    font: {
                        size: 12,
                        weight: 500,
                    },
                    callback: function(value) {
                        // Format large numbers
                        if (value >= 1e12) return (value / 1e12).toFixed(1) + 'T';
                        if (value >= 1e9) return (value / 1e9).toFixed(1) + 'B';
                        if (value >= 1e6) return (value / 1e6).toFixed(1) + 'M';
                        if (value >= 1e3) return (value / 1e3).toFixed(1) + 'K';
                        return value.toLocaleString();
                    },
                },
                title: {
                    display: true,
                    text: title,
                    color: theme.palette.text.primary,
                    font: {
                        size: 14,
                        weight: 600,
                    },
                },
            },
        },
        plugins: {
            legend: {
                position: 'top',
                align: 'start',
                labels: {
                    color: theme.palette.text.primary,
                    font: {
                        size: 13,
                        weight: 600,
                    },
                    padding: 20,
                    usePointStyle: true,
                    pointStyle: 'circle',
                },
            },
            tooltip: {
                mode: 'index',
                intersect: false,
                backgroundColor: alpha(theme.palette.background.paper, 0.95),
                titleColor: theme.palette.text.primary,
                bodyColor: theme.palette.text.secondary,
                borderColor: alpha(theme.palette.primary.main, 0.3),
                borderWidth: 1,
                cornerRadius: 8,
                padding: 12,
                titleFont: {
                    size: 14,
                    weight: 600,
                },
                bodyFont: {
                    size: 13,
                    weight: 500,
                },
                callbacks: {
                    label: function(context) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        const value = context.parsed.y;
                        if (value >= 1e12) label += '$' + (value / 1e12).toFixed(2) + 'T';
                        else if (value >= 1e9) label += '$' + (value / 1e9).toFixed(2) + 'B';
                        else if (value >= 1e6) label += '$' + (value / 1e6).toFixed(2) + 'M';
                        else if (value >= 1e3) label += '$' + (value / 1e3).toFixed(2) + 'K';
                        else label += '$' + value.toLocaleString();
                        return label;
                    },
                },
            },
        },
    };

    return (
        <Box sx={{ height: 500, p: 3 }}>
            <Box
                sx={{
                    mb: 3,
                    pb: 2,
                    borderBottom: `2px solid ${alpha(theme.palette.primary.main, 0.1)}`
                }}
            >
                <Box
                    component="h2"
                    sx={{
                        m: 0,
                        fontSize: '1.5rem',
                        fontWeight: 700,
                        color: theme.palette.text.primary,
                        background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}
                >
                    {title}
                </Box>
            </Box>
            <Line data={chartData} options={options} plugins={plugins} />
        </Box>
    );
};

export default CryptoChart;

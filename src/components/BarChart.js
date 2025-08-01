import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Box, useTheme, alpha } from '@mui/material';
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
    const theme = useTheme();

    // Enhanced validation for metrics
    if (!metrics || metrics.length === 0 || !Array.isArray(metrics)) {
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

    // Filter out invalid metrics
    const validMetrics = metrics.filter(m =>
        m &&
        m.label &&
        m[metric] !== undefined &&
        m[metric] !== null &&
        !isNaN(parseFloat(m[metric]))
    );

    if (validMetrics.length === 0) {
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
                    No valid metrics available
                </Box>
            </Box>
        );
    }

    const chartData = {
        labels: validMetrics.map(m => m.label),
        datasets: [
            {
                label: title,
                data: validMetrics.map(m => parseFloat(m[metric]) || 0),
                backgroundColor: validMetrics.map((_, index) => {
                    const colors = [
                        theme.palette.primary.main,
                        theme.palette.secondary.main,
                        theme.palette.success.main,
                        theme.palette.warning.main,
                        theme.palette.error.main,
                        theme.palette.info.main,
                    ];
                    return alpha(colors[index % colors.length], 0.7);
                }),
                borderColor: validMetrics.map((_, index) => {
                    const colors = [
                        theme.palette.primary.main,
                        theme.palette.secondary.main,
                        theme.palette.success.main,
                        theme.palette.warning.main,
                        theme.palette.error.main,
                        theme.palette.info.main,
                    ];
                    return colors[index % colors.length];
                }),
                borderWidth: 2,
                borderRadius: 6,
                borderSkipped: false,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
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
                grid: {
                    display: false,
                },
                ticks: {
                    color: theme.palette.text.secondary,
                    font: {
                        size: 12,
                        weight: 500,
                    },
                },
            },
            y: {
                beginAtZero: true,
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
                display: false,
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
            <Bar data={chartData} options={options} />
        </Box>
    );
};

export default BarChart;

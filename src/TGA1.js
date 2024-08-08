import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
    CircularProgress,
    Grid,
    TextField
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';

const TGA1 = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [startDate, setStartDate] = useState(dayjs().add(-1, "M"));
    const [endDate, setEndDate] = useState(dayjs());

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line
    }, [startDate, endDate]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await fetch(`https://api.fijisolutions.net/tga1?start_date=${startDate.format('YYYY-MM-DD')}&end_date=${endDate.format('YYYY-MM-DD')}`);
            const result = await response.json();
            setData(result);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        setLoading(false);
    };

    const processChartData = () => {
        const labels = data.map(item => dayjs(item.record_date).format('YYYY-MM-DD'));
        const openTodayBalances = data.map(item => parseFloat(item.open_today_bal));

        return {
            labels,
            datasets: [
                {
                    label: 'Open Today Balance',
                    data: openTodayBalances,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    fill: false,
                },
            ],
        };
    };

    const getMinMax = () => {
        const openTodayBalances = data.map(item => parseFloat(item.open_today_bal));
        const min = Math.min(...openTodayBalances) - 5000;
        const max = Math.max(...openTodayBalances) + 5000;
        return { min, max };
    };

    const { min, max } = getMinMax();

    return (
        <div className="App">
            <h1>Treasury General Account (TGA) Open Today Balance</h1>
            <Grid container spacing={2} justifyContent="center">
                <Grid item>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Start Date"
                            value={startDate}
                            onChange={(newValue) => setStartDate(newValue)}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="End Date"
                            value={endDate}
                            onChange={(newValue) => setEndDate(newValue)}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </Grid>
            </Grid>
            {loading ? (
                <CircularProgress />
            ) : (
                <Grid container justifyContent="center">
                    <Grid item xs={12} md={8}>
                        <Line
                            data={processChartData()}
                            options={{
                                responsive: true,
                                plugins: {
                                    legend: {
                                        position: 'top',
                                    },
                                    title: {
                                        display: true,
                                        text: 'TGA Open Today Balance Over Time',
                                    },
                                },
                                scales: {
                                    x: {
                                        type: 'time',
                                        time: {
                                            unit: 'day',
                                            tooltipFormat: 'MM/dd/yyyy',
                                        },
                                    },
                                    y: {
                                        beginAtZero: false,
                                        min: min,
                                        max: max,
                                    },
                                },
                            }}
                        />
                    </Grid>
                </Grid>
            )}
        </div>
    );
};

export default TGA1;

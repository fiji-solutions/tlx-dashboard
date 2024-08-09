import React, {useEffect, useState} from 'react';
import {Line} from 'react-chartjs-2';
import {CircularProgress, Grid, TextField, Typography,} from '@mui/material';
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from 'dayjs';
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";

const TGA1 = () => {
    const [tgaData, setTgaData] = useState([]);
    const [rrpData, setRrpData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [startDate, setStartDate] = useState(dayjs("2024-01-01"));
    const [endDate, setEndDate] = useState(dayjs());

    useEffect(() => {
        fetchTgaData();
        // eslint-disable-next-line
    }, [startDate, endDate]);

    useEffect(() => {
        fetchRrpData();
    }, []);

    const fetchTgaData = async () => {
        setLoading(true);
        try {
            const response = await fetch(`https://api.fijisolutions.net/tga1?start_date=${startDate.format('YYYY-MM-DD')}&end_date=${endDate.format('YYYY-MM-DD')}`);
            const result = await response.json();
            setTgaData(result);
        } catch (error) {
            console.error('Error fetching TGA data:', error);
        }
        setLoading(false);
    };

    const fetchRrpData = async () => {
        const body = {
            "hostName": "fred.stlouisfed.org",
            "series": {},
            "chart": {
                "labels": {
                    "title": "Overnight Reverse Repurchase Agreements: Treasury Securities Sold by the Federal Reserve in the Temporary Open Market Operations",
                    "subtitle": "Source: Federal Reserve Bank of New York",
                    "left_axis": "Billions of US Dollars",
                    "right_axis": "",
                    "bottom_axis": "",
                    "bubble-size_axis": "",
                    "footer": "2024 fred.stlouisfed.org"
                },
                "cosd": "2019-08-08",
                "coed": "2024-08-08",
                "min_date": "2003-02-07",
                "max_date": "2024-08-08",
                "frequency": "Daily",
                "width": 720,
                "height": 450,
                "drp": 0,
                "stacking": null,
                "txtcolor": "#444444",
                "mode": "fred",
                "ts": 12,
                "tts": 12,
                "fo": "open sans",
                "x_scale": "time",
                "trc": 0,
                "nt": 0,
                "thu": 0,
                "bgcolor": "#E1E9F0",
                "graph_bgcolor": "#ffffff",
                "showLegend": "yes",
                "showAxisTitles": "yes",
                "zoomType": "x",
                "showTooltip": "yes",
                "chartType": "line",
                "recession_bars": "on",
                "showNavigator": "true",
                "available_chart_types": [
                    "line",
                    "area",
                    "column",
                    "scatter",
                    "pie",
                    "bubble"
                ],
                "log_scales": {
                    "left": false,
                    "right": false,
                    "bottom": false,
                    "bubble-size": false
                },
                "available_stacking": [
                    "normal",
                    "percent"
                ],
                "legacy_url": "bgcolor=%23E1E9F0&chart_type=line&drp=0&fo=open%20sans&graph_bgcolor=%23ffffff&height=450&mode=fred&recession_bars=on&txtcolor=%23444444&ts=12&tts=12&width=720&nt=0&thu=0&trc=0&show_legend=yes&show_axis_titles=yes&show_tooltip=yes&id=RRPONTSYD&scale=left&cosd=2019-08-08&coed=2024-08-08&line_color=%234572a7&link_values=false&line_style=solid&mark_type=none&mw=3&lw=2&ost=-99999&oet=99999&mma=0&fml=a&fq=Daily&fam=avg&fgst=lin&fgsnd=2020-02-01&line_index=0&transformation=lin&vintage_date=2024-08-08&revision_date=2024-08-08&nd=2003-02-07",
                "piedate": null,
                "lastModified": "Thu, 08 Aug 2024 18:01:06 GMT",
                "obsFetch": false,
                "initialPayload": true
            },
            "xAxis": {},
            "yAxis": {},
            "seriesObjects": [
                {
                    "type": "time-series",
                    "line_index": 1,
                    "legendIndex": 1,
                    "title": "Overnight Reverse Repurchase Agreements: Treasury Securities Sold by the Federal Reserve in the Temporary Open Market Operations",
                    "available_formula_transformations": {
                        "lin": {
                            "full": "",
                            "short": ""
                        },
                        "chg": {
                            "full": "Change",
                            "short": "Chg."
                        },
                        "ch1": {
                            "full": "Change from Year Ago",
                            "short": "Chg. from Yr. Ago"
                        },
                        "pch": {
                            "full": "Percent Change",
                            "short": "% Chg."
                        },
                        "pc1": {
                            "full": "Percent Change from Year Ago",
                            "short": "% Chg. from Yr. Ago"
                        },
                        "pca": {
                            "full": "Compounded Annual Rate of Change",
                            "short": "Comp. Annual Rate of Chg."
                        },
                        "cch": {
                            "full": "Continuously Compounded Rate of Change",
                            "short": "Cont. Comp. Rate of Chg."
                        },
                        "cca": {
                            "full": "Continuously Compounded Annual Rate of Change",
                            "short": "Cont. Comp. Annual Rate of Chg."
                        },
                        "log": {
                            "full": "Natural Log",
                            "short": "Log"
                        },
                        "nbd": {
                            "full": "Index (Scale value to 100 for chosen period)",
                            "short": "Index"
                        }
                    },
                    "line_color": "#4572a7",
                    "line_style": "solid",
                    "lw": 2,
                    "mark_type": "none",
                    "hide_marks": true,
                    "mw": 3,
                    "scale": "left",
                    "decimal_places": "3",
                    "frequency": "Daily",
                    "fq": "Daily",
                    "available_colors": {
                        "1": "#4572A7",
                        "2": "#AA4643",
                        "3": "#89A54E",
                        "4": "#80699B",
                        "5": "#3D96AE",
                        "6": "#DB843D",
                        "7": "#92A8CD",
                        "8": "#A47D7C",
                        "9": "#B5CA92",
                        "10": "#91e8e1",
                        "11": "#8d4653",
                        "12": "#8085e8"
                    },
                    "available_fams": {
                        "Average": "avg",
                        "Sum": "sum",
                        "End of Period": "eop"
                    },
                    "fam": "avg",
                    "available_fqs": [
                        "Daily",
                        "Weekly, Ending Friday",
                        "Weekly, Ending Thursday",
                        "Weekly, Ending Wednesday",
                        "Weekly, Ending Tuesday",
                        "Weekly, Ending Monday",
                        "Weekly, Ending Sunday",
                        "Weekly, Ending Saturday",
                        "Biweekly, Ending Wednesday",
                        "Biweekly, Ending Monday",
                        "Monthly",
                        "Quarterly",
                        "Semiannual",
                        "Annual"
                    ],
                    "fml": "a",
                    "fgst": "lin",
                    "fgsnd": "2020-02-01",
                    "all_fred_series_have_same_frequency": true,
                    "has_fred_series_with_nbd_transformation": false,
                    "cosd": "2019-08-08",
                    "coed": "2024-08-08",
                    "min_date": "2003-02-07",
                    "max_date": "2024-08-08",
                    "year_range": 21,
                    "ost": -99999,
                    "oet": 99999,
                    "available_mmas": [
                        0,
                        1,
                        2
                    ],
                    "mma": 0,
                    "graph_series_ids": [
                        "RRPONTSYD"
                    ],
                    "series_objects": {
                        "a": {
                            "series_id": "RRPONTSYD",
                            "title": "Overnight Reverse Repurchase Agreements: Treasury Securities Sold by the Federal Reserve in the Temporary Open Market Operations",
                            "season": "Not Seasonally Adjusted",
                            "season_short": "NSA",
                            "frequency": "Daily",
                            "frequency_short": "D",
                            "units_short": "Bil. of US $",
                            "keywords": " ",
                            "all_obs_transformations": {
                                "lin": "Billions of US Dollars",
                                "cap": "US Dollars per Capita",
                                "chg": "Change, Billions of US Dollars",
                                "ch1": "Change from Year Ago, Billions of US Dollars",
                                "pch": "Percent Change",
                                "pc1": "Percent Change from Year Ago",
                                "pca": "Compounded Annual Rate of Change",
                                "cch": "Continuously Compounded Rate of Change",
                                "cca": "Continuously Compounded Annual Rate of Change"
                            },
                            "abbreviated_all_obs_transformations": {
                                "lin": "Levels",
                                "cap": "Levels per Capita",
                                "chg": "Chg.",
                                "ch1": "Chg. from Yr. Ago",
                                "pch": "% Chg.",
                                "pc1": "% Chg. from Yr. Ago",
                                "pca": "Comp. Annual Rate of Chg.",
                                "cch": "Cont. Comp. Rate of Chg.",
                                "cca": "Cont. Comp. Annual Rate of Chg.",
                                "log": "Log"
                            },
                            "obs_transformations": {
                                "lin": "Billions of US Dollars",
                                "chg": "Change, Billions of US Dollars",
                                "ch1": "Change from Year Ago, Billions of US Dollars",
                                "pch": "Percent Change",
                                "pc1": "Percent Change from Year Ago",
                                "pca": "Compounded Annual Rate of Change",
                                "cch": "Continuously Compounded Rate of Change",
                                "cca": "Continuously Compounded Annual Rate of Change"
                            },
                            "valid_start_date": "2024-08-08",
                            "valid_end_date": "2024-08-08",
                            "vintage_date": "2024-08-08",
                            "available_revision_dates": [
                                "2024-08-08"
                            ],
                            "revision_date": "2024-08-08",
                            "relative_vintage": null,
                            "nd": "2003-02-07",
                            "step_line": "f",
                            "transformation": "lin",
                            "available_units": {
                                "lin": "Billions of US Dollars",
                                "chg": "Change, Billions of US Dollars",
                                "ch1": "Change from Year Ago, Billions of US Dollars",
                                "pch": "Percent Change",
                                "pc1": "Percent Change from Year Ago",
                                "pca": "Compounded Annual Rate of Change",
                                "cch": "Continuously Compounded Rate of Change",
                                "cca": "Continuously Compounded Annual Rate of Change"
                            },
                            "units": "Billions of US Dollars",
                            "min_valid_start_date": "2024-08-08",
                            "max_valid_start_date": null,
                            "min_obs_start_date": "2003-02-07",
                            "max_obs_start_date": "2024-08-08",
                            "last_updated": "2024-08-08 13:01:06-05"
                        }
                    },
                    "lsv": null,
                    "lev": null,
                    "observation_grouping_approximation": "close",
                    "chart_key": "aa75a337c9b030211541a833128d3db0"
                }
            ],
            "fredLogo": {
                "width": 105,
                "height": 22,
                "image": "https://fred.stlouisfed.org/images/fredgraph-logo-2x.png"
            },
            "container": {
                "width": 720,
                "height": 450
            },
            "defaultFontSize": 12,
            "defaultMaxTicks": 10,
            "showNavigator": true,
            "showCredits": true,
            "dataParams": {},
            "dataUrl": "https://fred-sa.stlouisfed.org/graph/graph-data.php",
            "graphBreakpointWidth": 400,
            "observations": {},
            "axisTitleHeight": 300,
            "titleWidth": 555,
            "alignTicks": true,
            "borderRadius": 0,
            "recessionBars": "on",
            "spacingBottom": 15,
            "spacingTop": 50,
            "spacingRight": 20,
            "zoomType": "x",
            "style": {
                "fontFamily": "Open Sans",
                "color": "color: rgb(68, 68, 68)"
            },
            "chartTypes": {
                "line": "LINE",
                "area": "AREA",
                "column": "BAR",
                "scatter": "PLOT",
                "pie": "SEGMENT"
            },
            "chartTypeIcons": {
                "line": "fa-chart-line",
                "area": "fa-chart-area",
                "column": "fa-chart-bar",
                "pie": "fa-chart-pie",
                "scatter": ""
            }
        };
        try {
            const response = await fetch(`https://cors.fijisolutions.net:8080/https://fred.stlouisfed.org/graph/api/series/?obs=true&sid=RRPONTSYD`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body),
            });
            const result = await response.json();
            setRrpData(result.observations);
        } catch (error) {
            console.error('Error fetching RRP data:', error);
        }
    };

    const filterDataByDate = (data, startDate, endDate) => {
        const startTimestamp = startDate.valueOf();
        const endTimestamp = endDate.valueOf();

        // Flatten the nested array to work with timestamp-value pairs
        const flatData = data.flat();

        return flatData.filter(([timestamp]) => {
            return timestamp >= startTimestamp && timestamp <= endTimestamp;
        });
    };

    const processTgaChartData = () => {
        const validData = tgaData
            .filter(item => item.open_today_bal !== null && !isNaN(parseFloat(item.open_today_bal)))
            .sort((a, b) => new Date(a.record_date) - new Date(b.record_date));

        const labels = validData.map(item => dayjs(item.record_date).format('YYYY-MM-DD'));
        const openTodayBalances = validData.map(item => parseFloat(item.open_today_bal));

        const minValue = Math.min(...openTodayBalances);
        const maxValue = Math.max(...openTodayBalances);

        const latestDate = labels[labels.length - 1] || "N/A";

        return {
            labels,
            datasets: [
                {
                    label: 'Closing Balance',
                    data: openTodayBalances,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    fill: false,
                },
            ],
            minValue, // Return minValue
            maxValue, // Return maxValue
            latestDate, // Return latest date
        };
    };

    const processRrpChartData = () => {
        const filteredData = filterDataByDate(rrpData, startDate, endDate);

        const validData = filteredData.filter(([, value]) => value !== null);

        if (validData.length === 0) {
            return {
                labels: [],
                datasets: [
                    {
                        label: 'RRPONTSYD',
                        data: [],
                        borderColor: 'rgba(255, 99, 132, 1)',
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        fill: false,
                    },
                ],
            };
        }

        const labels = validData.map(([timestamp]) => dayjs(timestamp).format('YYYY-MM-DD'));
        const rrpValues = validData.map(([, value]) => value);

        const minRrpValue = Math.min(...rrpValues);
        const maxRrpValue = Math.max(...rrpValues);

        const latestDate = labels[labels.length - 1] || "N/A";

        return {
            labels,
            datasets: [
                {
                    label: 'RRPONTSYD',
                    data: rrpValues,
                    borderColor: 'rgba(255, 99, 132, 1)',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    fill: false,
                },
            ],
            minValue: minRrpValue,
            maxValue: maxRrpValue,
            latestDate, // Return latest date
        };
    };

    return (
        <div className="App">
            <h1>Treasury General Account (TGA) Closing Balance</h1>
            <Grid container spacing={2} justifyContent="center">
                <Grid item>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Start Date"
                            value={startDate}
                            onChange={(newValue) => {
                                setStartDate(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="End Date"
                            value={endDate}
                            onChange={(newValue) => {
                                setEndDate(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </Grid>
            </Grid>
            {loading ? (
                <CircularProgress />
            ) : (
                <>
                    <Grid container justifyContent="center">
                        <Grid item xs={12} md={8}>
                            <Line
                                data={processTgaChartData()}
                                options={{
                                    responsive: true,
                                    plugins: {
                                        legend: {
                                            position: 'top',
                                        },
                                        title: {
                                            display: true,
                                            text: 'TGA Closing Balance Over Time',
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
                                            beginAtZero: true,
                                            min: processTgaChartData().minValue - 5000,
                                            max: processTgaChartData().maxValue + 5000,
                                        },
                                    },
                                }}
                            />
                            <Typography variant="body1" align="center">
                                Latest Date: {processTgaChartData().latestDate}
                            </Typography>
                        </Grid>
                    </Grid>

                    <h1>Overnight Reverse Repurchase Agreements:</h1>
                    <h1>Treasury Securities Sold by the Federal Reserve (RRPONTSYD)</h1>

                    <Grid container justifyContent="center">
                        <Grid item xs={12} md={8}>
                            <Line
                                data={processRrpChartData()}
                                options={{
                                    responsive: true,
                                    plugins: {
                                        legend: {
                                            position: 'top',
                                        },
                                        title: {
                                            display: true,
                                            text: 'RRPONTSYD Over Time',
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
                                            min: processRrpChartData().minValue - 5,
                                            max: processRrpChartData().maxValue + 5,
                                        },
                                    },
                                }}
                            />
                            <Typography variant="body1" align="center">
                                Latest Date: {processRrpChartData().latestDate}
                            </Typography>
                        </Grid>
                    </Grid>
                </>
            )}
        </div>
    );
};

export default TGA1;

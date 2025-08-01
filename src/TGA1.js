import React, { useEffect, useState } from 'react';
import CryptoChart from './components/CryptoChart';
import {
    Button,
    CircularProgress,
    Grid,
    Tab,
    Tabs,
    Card,
    CardContent,
    Typography,
    Box,
    Chip,
    Paper,
    Container,
    Fade,
    useTheme,
    alpha,
    IconButton,
    Tooltip,
    Snackbar
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import ViewAgendaOutlinedIcon from '@mui/icons-material/ViewAgendaOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import ViewQuiltOutlinedIcon from '@mui/icons-material/ViewQuiltOutlined';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import RefreshIcon from '@mui/icons-material/Refresh';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import "./App.css";

// Apply UTC plugin to dayjs
dayjs.extend(utc);

const TGA1 = () => {
    const theme = useTheme();

    // State for all data sources
    const [tgaData, setTgaData] = useState([]);
    const [rrpData, setRrpData] = useState([]);
    const [wlcData, setWlcData] = useState([]);
    const [h4Data, setH4Data] = useState([]);
    const [walData, setWalData] = useState([]);

    // UI state
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [errorSource, setErrorSource] = useState("");
    const [startDate, setStartDate] = useState(dayjs().utc().add(-2, "M"));
    const [endDate, setEndDate] = useState(dayjs().utc());
    const [tabValue, setTabValue] = useState('2');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [lastUpdated, setLastUpdated] = useState(null);

    // Get the latest TGA date for the vertical line plugin
    const getLatestTgaDate = () => {
        if (!tgaData || tgaData.length === 0) return null;
        
        const validTgaData = tgaData
            .filter(item => item.open_today_bal !== null && !isNaN(parseFloat(item.open_today_bal)))
            .sort((a, b) => dayjs(a.record_date).utc().toDate() - dayjs(b.record_date).utc().toDate());
        
        return validTgaData.length > 0 ? validTgaData[validTgaData.length - 1].record_date : null;
    };

    // Vertical line plugin for showing latest TGA date
    const verticalLinePlugin = {
        id: 'verticalLine',
        beforeDraw: (chart) => {
            const latestTgaDate = getLatestTgaDate();
            if (!latestTgaDate) return;

            const ctx = chart.ctx;
            const chartArea = chart.chartArea;
            const xScale = chart.scales['x'];
            const targetDate = dayjs(latestTgaDate).utc();

            // Convert the target date to the x-coordinate on the chart
            const xPosition = xScale.getPixelForValue(targetDate.toDate());

            // Draw the vertical line
            if (xPosition >= chartArea.left && xPosition <= chartArea.right) {
                ctx.save();

                // Draw the vertical line
                ctx.beginPath();
                ctx.moveTo(xPosition, chartArea.top);
                ctx.lineTo(xPosition, chartArea.bottom);
                ctx.lineWidth = 2;
                ctx.strokeStyle = 'rgba(75, 192, 192, 1)';
                ctx.stroke();

                // Add a label at the top of the vertical line
                ctx.font = 'bold 12px Inter';
                ctx.fillStyle = 'rgba(75, 192, 192, 1)';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'bottom';
                ctx.fillText('Latest TGA Value', xPosition, chartArea.top - 5);

                ctx.restore();
            }
        },
    };

    const domain = "https://api.fijisolutions.net";

    // Fetch TGA data
    const fetchTgaData = async () => {
        setError(false);
        setErrorSource("");
        setLoading(true);
        try {
            const response = await fetch(`${domain}/tga1?start_date=${startDate.format('YYYY-MM-DD')}&end_date=${endDate.format('YYYY-MM-DD')}`);
            const result = await response.json();

            const normalizedData = result.map(item => {
                const normalizedDate = dayjs(item.record_date).utc().format('YYYY-MM-DD');
                return {
                    ...item,
                    record_date: normalizedDate
                };
            });
            setTgaData(normalizedData);
        } catch (error) {
            console.error('Error fetching TGA data:', error);
            setError(true);
            setErrorSource("TGA");
        }
        setLoading(false);
    };

    // Fetch FRED data for all other indicators
    const fetchFredData = async () => {
        const rrpBody = {
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
        const wlcBody = {
            "hostName": "fred.stlouisfed.org",
            "series": {},
            "chart": {
                "labels": {
                    "title": "Assets: Liquidity and Credit Facilities: Loans: Primary Credit: Wednesday Level",
                    "subtitle": "Source: Board of Governors of the Federal Reserve System (US)",
                    "left_axis": "Millions of U.S. Dollars",
                    "right_axis": "",
                    "bottom_axis": "",
                    "bubble-size_axis": "",
                    "footer": "2024 fred.stlouisfed.org"
                },
                "cosd": "2002-12-18",
                "coed": "2024-08-07",
                "min_date": "2002-12-18",
                "max_date": "2024-08-07",
                "frequency": "Weekly",
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
                "legacy_url": "bgcolor=%23E1E9F0&chart_type=line&drp=0&fo=open%20sans&graph_bgcolor=%23ffffff&height=450&mode=fred&recession_bars=on&txtcolor=%23444444&ts=12&tts=12&width=720&nt=0&thu=0&trc=0&show_legend=yes&show_axis_titles=yes&show_tooltip=yes&id=WLCFLPCL&scale=left&cosd=2002-12-18&coed=2024-08-07&line_color=%234572a7&link_values=false&line_style=solid&mark_type=none&mw=3&lw=2&ost=-99999&oet=99999&mma=0&fml=a&fq=Weekly%2C%20As%20of%20Wednesday&fam=avg&fgst=lin&fgsnd=2020-02-01&line_index=0&transformation=lin&vintage_date=2024-08-09&revision_date=2024-08-09&nd=2002-12-18",
                "piedate": null,
                "lastModified": "Thu, 08 Aug 2024 20:35:52 GMT",
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
                    "title": "Assets: Liquidity and Credit Facilities: Loans: Primary Credit: Wednesday Level",
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
                    "decimal_places": "0",
                    "frequency": "Weekly",
                    "fq": "Weekly, As of Wednesday",
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
                        "Weekly, As of Wednesday",
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
                    "cosd": "2002-12-18",
                    "coed": "2024-08-07",
                    "min_date": "2002-12-18",
                    "max_date": "2024-08-07",
                    "year_range": 22,
                    "ost": -99999,
                    "oet": 99999,
                    "available_mmas": [
                        0,
                        1,
                        2
                    ],
                    "mma": 0,
                    "graph_series_ids": [
                        "WLCFLPCL"
                    ],
                    "series_objects": {
                        "a": {
                            "series_id": "WLCFLPCL",
                            "title": "Assets: Liquidity and Credit Facilities: Loans: Primary Credit: Wednesday Level",
                            "season": "Not Seasonally Adjusted",
                            "season_short": "NSA",
                            "frequency": "Weekly",
                            "frequency_short": "W",
                            "units_short": "Mil. of U.S. $",
                            "keywords": "   ",
                            "all_obs_transformations": {
                                "lin": "Millions of U.S. Dollars",
                                "cap": "U.S. Dollars per Capita",
                                "chg": "Change, Millions of U.S. Dollars",
                                "ch1": "Change from Year Ago, Millions of U.S. Dollars",
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
                                "lin": "Millions of U.S. Dollars",
                                "chg": "Change, Millions of U.S. Dollars",
                                "ch1": "Change from Year Ago, Millions of U.S. Dollars",
                                "pch": "Percent Change",
                                "pc1": "Percent Change from Year Ago",
                                "pca": "Compounded Annual Rate of Change",
                                "cch": "Continuously Compounded Rate of Change",
                                "cca": "Continuously Compounded Annual Rate of Change"
                            },
                            "valid_start_date": "2024-08-09",
                            "valid_end_date": "2024-08-09",
                            "vintage_date": "2024-08-09",
                            "available_revision_dates": [
                                "2024-08-09"
                            ],
                            "revision_date": "2024-08-09",
                            "relative_vintage": null,
                            "nd": "2002-12-18",
                            "step_line": "f",
                            "transformation": "lin",
                            "available_units": {
                                "lin": "Millions of U.S. Dollars",
                                "chg": "Change, Millions of U.S. Dollars",
                                "ch1": "Change from Year Ago, Millions of U.S. Dollars",
                                "pch": "Percent Change",
                                "pc1": "Percent Change from Year Ago",
                                "pca": "Compounded Annual Rate of Change",
                                "cch": "Continuously Compounded Rate of Change",
                                "cca": "Continuously Compounded Annual Rate of Change"
                            },
                            "units": "Millions of U.S. Dollars",
                            "min_valid_start_date": "2024-08-08",
                            "max_valid_start_date": null,
                            "min_obs_start_date": "2002-12-18",
                            "max_obs_start_date": "2024-08-07",
                            "last_updated": "2024-08-08 15:35:52-05"
                        }
                    },
                    "lsv": null,
                    "lev": null,
                    "observation_grouping_approximation": "close",
                    "chart_key": "13bc347869c12029231c3395ac6f399c"
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
        const h4Body = {
            "hostName": "fred.stlouisfed.org",
            "series": {},
            "chart": {
                "labels": {
                    "title": "Assets: Liquidity and Credit Facilities: Loans: Bank Term Funding Program, Net: Wednesday Level",
                    "subtitle": "Source: Board of Governors of the Federal Reserve System (US)",
                    "left_axis": "Millions of U.S. Dollars",
                    "right_axis": "",
                    "bottom_axis": "",
                    "bubble-size_axis": "",
                    "footer": "2024 fred.stlouisfed.org"
                },
                "cosd": "2002-12-18",
                "coed": "2024-08-07",
                "min_date": "2002-12-18",
                "max_date": "2024-08-07",
                "frequency": "Weekly",
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
                "legacy_url": "bgcolor=%23E1E9F0&chart_type=line&drp=0&fo=open%20sans&graph_bgcolor=%23ffffff&height=450&mode=fred&recession_bars=on&txtcolor=%23444444&ts=12&tts=12&width=720&nt=0&thu=0&trc=0&show_legend=yes&show_axis_titles=yes&show_tooltip=yes&id=H41RESPPALDKNWW&scale=left&cosd=2002-12-18&coed=2024-08-07&line_color=%234572a7&link_values=false&line_style=solid&mark_type=none&mw=3&lw=2&ost=-99999&oet=99999&mma=0&fml=a&fq=Weekly&fam=avg&fgst=lin&fgsnd=2020-02-01&line_index=0&transformation=lin&vintage_date=2024-08-09&revision_date=2024-08-09&nd=2002-12-18",
                "piedate": null,
                "lastModified": "Thu, 08 Aug 2024 20:36:08 GMT",
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
                    "title": "Assets: Liquidity and Credit Facilities: Loans: Bank Term Funding Program, Net: Wednesday Level",
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
                    "decimal_places": "0",
                    "frequency": "Weekly",
                    "fq": "Weekly",
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
                        "Weekly",
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
                    "cosd": "2002-12-18",
                    "coed": "2024-08-07",
                    "min_date": "2002-12-18",
                    "max_date": "2024-08-07",
                    "year_range": 22,
                    "ost": -99999,
                    "oet": 99999,
                    "available_mmas": [
                        0,
                        1,
                        2
                    ],
                    "mma": 0,
                    "graph_series_ids": [
                        "H41RESPPALDKNWW"
                    ],
                    "series_objects": {
                        "a": {
                            "series_id": "H41RESPPALDKNWW",
                            "title": "Assets: Liquidity and Credit Facilities: Loans: Bank Term Funding Program, Net: Wednesday Level",
                            "season": "Not Seasonally Adjusted",
                            "season_short": "NSA",
                            "frequency": "Weekly",
                            "frequency_short": "W",
                            "units_short": "Mil. of U.S. $",
                            "keywords": "",
                            "all_obs_transformations": {
                                "lin": "Millions of U.S. Dollars",
                                "cap": "U.S. Dollars per Capita",
                                "chg": "Change, Millions of U.S. Dollars",
                                "ch1": "Change from Year Ago, Millions of U.S. Dollars",
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
                                "lin": "Millions of U.S. Dollars",
                                "chg": "Change, Millions of U.S. Dollars",
                                "ch1": "Change from Year Ago, Millions of U.S. Dollars",
                                "pch": "Percent Change",
                                "pc1": "Percent Change from Year Ago",
                                "pca": "Compounded Annual Rate of Change",
                                "cch": "Continuously Compounded Rate of Change",
                                "cca": "Continuously Compounded Annual Rate of Change"
                            },
                            "valid_start_date": "2024-08-09",
                            "valid_end_date": "2024-08-09",
                            "vintage_date": "2024-08-09",
                            "available_revision_dates": [
                                "2024-08-09"
                            ],
                            "revision_date": "2024-08-09",
                            "relative_vintage": null,
                            "nd": "2002-12-18",
                            "step_line": "f",
                            "transformation": "lin",
                            "available_units": {
                                "lin": "Millions of U.S. Dollars",
                                "chg": "Change, Millions of U.S. Dollars",
                                "ch1": "Change from Year Ago, Millions of U.S. Dollars",
                                "pch": "Percent Change",
                                "pc1": "Percent Change from Year Ago",
                                "pca": "Compounded Annual Rate of Change",
                                "cch": "Continuously Compounded Rate of Change",
                                "cca": "Continuously Compounded Annual Rate of Change"
                            },
                            "units": "Millions of U.S. Dollars",
                            "min_valid_start_date": "2024-08-08",
                            "max_valid_start_date": null,
                            "min_obs_start_date": "2002-12-18",
                            "max_obs_start_date": "2024-08-07",
                            "last_updated": "2024-08-08 15:36:08-05"
                        }
                    },
                    "lsv": null,
                    "lev": null,
                    "observation_grouping_approximation": "close",
                    "chart_key": "f07538d8f09fc1b249d55fe17f62a61d"
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
        const walBody = {
            "hostName": "fred.stlouisfed.org",
            "series": {},
            "chart": {
                "labels": {
                    "title": "Assets: Total Assets: Total Assets (Less Eliminations from Consolidation): Wednesday Level",
                    "subtitle": "Source: Board of Governors of the Federal Reserve System (US)",
                    "left_axis": "Millions of U.S. Dollars",
                    "right_axis": "",
                    "bottom_axis": "",
                    "bubble-size_axis": "",
                    "footer": "2024 fred.stlouisfed.org"
                },
                "cosd": "2002-12-18",
                "coed": "2024-08-07",
                "min_date": "2002-12-18",
                "max_date": "2024-08-07",
                "frequency": "Weekly",
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
                "legacy_url": "bgcolor=%23E1E9F0&chart_type=line&drp=0&fo=open%20sans&graph_bgcolor=%23ffffff&height=450&mode=fred&recession_bars=on&txtcolor=%23444444&ts=12&tts=12&width=720&nt=0&thu=0&trc=0&show_legend=yes&show_axis_titles=yes&show_tooltip=yes&id=WALCL&scale=left&cosd=2002-12-18&coed=2024-08-07&line_color=%234572a7&link_values=false&line_style=solid&mark_type=none&mw=3&lw=2&ost=-99999&oet=99999&mma=0&fml=a&fq=Weekly%2C%20As%20of%20Wednesday&fam=avg&fgst=lin&fgsnd=2020-02-01&line_index=0&transformation=lin&vintage_date=2024-08-09&revision_date=2024-08-09&nd=2002-12-18",
                "piedate": null,
                "lastModified": "Thu, 08 Aug 2024 20:37:19 GMT",
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
                    "title": "Assets: Total Assets: Total Assets (Less Eliminations from Consolidation): Wednesday Level",
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
                    "decimal_places": "0",
                    "frequency": "Weekly",
                    "fq": "Weekly, As of Wednesday",
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
                        "Weekly, As of Wednesday",
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
                    "cosd": "2002-12-18",
                    "coed": "2024-08-07",
                    "min_date": "2002-12-18",
                    "max_date": "2024-08-07",
                    "year_range": 22,
                    "ost": -99999,
                    "oet": 99999,
                    "available_mmas": [
                        0,
                        1,
                        2
                    ],
                    "mma": 0,
                    "graph_series_ids": [
                        "WALCL"
                    ],
                    "series_objects": {
                        "a": {
                            "series_id": "WALCL",
                            "title": "Assets: Total Assets: Total Assets (Less Eliminations from Consolidation): Wednesday Level",
                            "season": "Not Seasonally Adjusted",
                            "season_short": "NSA",
                            "frequency": "Weekly",
                            "frequency_short": "W",
                            "units_short": "Mil. of U.S. $",
                            "keywords": "  ",
                            "all_obs_transformations": {
                                "lin": "Millions of U.S. Dollars",
                                "cap": "U.S. Dollars per Capita",
                                "chg": "Change, Millions of U.S. Dollars",
                                "ch1": "Change from Year Ago, Millions of U.S. Dollars",
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
                                "lin": "Millions of U.S. Dollars",
                                "chg": "Change, Millions of U.S. Dollars",
                                "ch1": "Change from Year Ago, Millions of U.S. Dollars",
                                "pch": "Percent Change",
                                "pc1": "Percent Change from Year Ago",
                                "pca": "Compounded Annual Rate of Change",
                                "cch": "Continuously Compounded Rate of Change",
                                "cca": "Continuously Compounded Annual Rate of Change"
                            },
                            "valid_start_date": "2024-08-09",
                            "valid_end_date": "2024-08-09",
                            "vintage_date": "2024-08-09",
                            "available_revision_dates": [
                                "2024-08-09"
                            ],
                            "revision_date": "2024-08-09",
                            "relative_vintage": null,
                            "nd": "2002-12-18",
                            "step_line": "f",
                            "transformation": "lin",
                            "available_units": {
                                "lin": "Millions of U.S. Dollars",
                                "chg": "Change, Millions of U.S. Dollars",
                                "ch1": "Change from Year Ago, Millions of U.S. Dollars",
                                "pch": "Percent Change",
                                "pc1": "Percent Change from Year Ago",
                                "pca": "Compounded Annual Rate of Change",
                                "cch": "Continuously Compounded Rate of Change",
                                "cca": "Continuously Compounded Annual Rate of Change"
                            },
                            "units": "Millions of U.S. Dollars",
                            "min_valid_start_date": "2024-08-08",
                            "max_valid_start_date": null,
                            "min_obs_start_date": "2002-12-18",
                            "max_obs_start_date": "2024-08-07",
                            "last_updated": "2024-08-08 15:37:19-05"
                        }
                    },
                    "lsv": null,
                    "lev": null,
                    "observation_grouping_approximation": "close",
                    "chart_key": "ffbd7bb3bea497096845c74307ee3d96"
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

        let count = 0;
        try {
            // Fetch RRP data
            const response1 = await fetch(`https://cors.fijisolutions.net:8082/https://fred.stlouisfed.org/graph/api/series/?obs=true&sid=RRPONTSYD`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(rrpBody),
            });
            const result1 = await response1.json();
            const normalizedData1 = result1.observations[0].map(([timestamp, value]) => {
                const date = dayjs(timestamp).utc().format('YYYY-MM-DD');
                return [date, value ? value * 1000 : value];
            });
            setRrpData(normalizedData1);
            count = 1;

            // Fetch WLC data
            const response2 = await fetch(`https://cors.fijisolutions.net:8082/https://fred.stlouisfed.org/graph/api/series/?obs=true&sid=WLCFLPCL`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(wlcBody),
            });
            const result2 = await response2.json();
            const normalizedData2 = result2.observations[0].map(([timestamp, value]) => {
                const date = dayjs(timestamp).utc().format('YYYY-MM-DD');
                return [date, value];
            });
            setWlcData(normalizedData2);
            count = 2;

            // Fetch H4 data
            const response3 = await fetch(`https://cors.fijisolutions.net:8082/https://fred.stlouisfed.org/graph/api/series/?obs=true&sid=H41RESPPALDKNWW`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(h4Body),
            });
            const result3 = await response3.json();
            const normalizedData3 = result3.observations[0].map(([timestamp, value]) => {
                const date = dayjs(timestamp).utc().format('YYYY-MM-DD');
                return [date, value];
            });
            setH4Data(normalizedData3);
            count = 3;

            // Fetch WAL data
            const response4 = await fetch(`https://cors.fijisolutions.net:8082/https://fred.stlouisfed.org/graph/api/series/?obs=true&sid=WALCL`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(walBody),
            });
            const result4 = await response4.json();
            const normalizedData4 = result4.observations[0].map(([timestamp, value]) => {
                const date = dayjs(timestamp).utc().format('YYYY-MM-DD');
                return [date, value];
            });
            setWalData(normalizedData4);
            count = 4;

            setLastUpdated(new Date());
        } catch (error) {
            console.error('Error fetching FRED data:', error);
            setError(true);
            setErrorSource(count === 0 ? "RRP" : (count === 1 ? "WLC" : (count === 2 ? "H4" : (count === 3 ? "WAL" : "Exception"))));
        }
    };

    // Filter data by date range
    const filterDataByDate = (data, startDate, endDate) => {
        const startTimestamp = startDate.utc().valueOf();
        const endTimestamp = endDate.utc().valueOf();

        return data.filter(([dateString]) => {
            const timestamp = dayjs(dateString).utc().valueOf();
            return timestamp >= startTimestamp && timestamp <= endTimestamp;
        });
    };

    // Process TGA chart data
    const processTgaChartData = () => {
        const validData = tgaData
            .filter(item => item.open_today_bal !== null && !isNaN(parseFloat(item.open_today_bal)))
            .sort((a, b) => dayjs(a.record_date).utc().toDate() - dayjs(b.record_date).utc().toDate());

        if (validData.length === 0) {
            return {
                labels: [],
                datasets: [{
                    label: 'TGA Closing Balance',
                    data: [],
                    borderColor: theme.palette.primary.main,
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                }],
                minValue: 0,
                maxValue: 0,
                latestDate: "N/A"
            };
        }

        const data = validData.map(item => ({
            timestamp: dayjs(item.record_date).format('YYYY-MM-DD'),
            balance: parseFloat(item.open_today_bal)
        }));

        const balances = data.map(item => item.balance);
        const minValue = Math.min(...balances);
        const maxValue = Math.max(...balances);
        const latestDate = data[data.length - 1]?.timestamp || "N/A";

        return {
            labels: data.map(item => item.timestamp),
            datasets: [{
                label: 'TGA Closing Balance',
                data: data,
                borderColor: theme.palette.primary.main,
                backgroundColor: alpha(theme.palette.primary.main, 0.1),
                borderWidth: 3,
                pointRadius: 0,
                pointHoverRadius: 6,
                tension: 0.1,
                fill: true
            }],
            minValue,
            maxValue,
            latestDate
        };
    };

    // Process individual FRED data charts
    const processChartData = (data, label, color) => {
        const filteredData = filterDataByDate(data, startDate, endDate);
        const validData = filteredData.filter(([, value]) => value !== null);

        if (validData.length === 0) {
            return {
                labels: [],
                datasets: [{
                    label: label,
                    data: [],
                    borderColor: color,
                    backgroundColor: alpha(color, 0.1),
                }],
                minValue: 0,
                maxValue: 0,
                latestDate: "N/A"
            };
        }

        const chartData = validData.map(([date, value]) => ({
            timestamp: date,
            value: value
        }));

        const values = chartData.map(item => item.value);
        const minValue = Math.min(...values);
        const maxValue = Math.max(...values);
        const latestDate = chartData[chartData.length - 1]?.timestamp || "N/A";

        return {
            labels: chartData.map(item => item.timestamp),
            datasets: [{
                label: label,
                data: chartData,
                borderColor: color,
                backgroundColor: alpha(color, 0.1),
                borderWidth: 3,
                pointRadius: 0,
                pointHoverRadius: 6,
                tension: 0.1,
                fill: true
            }],
            minValue,
            maxValue,
            latestDate
        };
    };

    // Process combined formula chart
    const processCombinedChartData = () => {
        let startString = startDate.utc().format('YYYY-MM-DD');
        const endString = endDate.utc().format('YYYY-MM-DD');

        // Extract all dates from each dataset and convert them to timestamps
        const walDates = walData.map(([date]) => dayjs(date).utc().toDate().getTime());
        const tgaDates = tgaData.map(item => dayjs(item.record_date).utc().toDate().getTime());
        const rrpDates = rrpData.map(([date]) => dayjs(date).utc().toDate().getTime());
        const h4Dates = h4Data.map(([date]) => dayjs(date).utc().toDate().getTime());
        const wlcDates = wlcData.map(([date]) => dayjs(date).utc().toDate().getTime());

        // Convert start and end strings to timestamps
        const startTimestamp = dayjs(startString).utc().toDate().getTime();
        const endTimestamp = dayjs(endString).utc().toDate().getTime();

        // Find the latest common start date across all datasets
        const latestCommonStartDateTimestamp = Math.max(
            Math.min(...walDates.filter(date => date >= startTimestamp && date <= endTimestamp)),
            Math.min(...tgaDates.filter(date => date >= startTimestamp && date <= endTimestamp)),
            Math.min(...rrpDates.filter(date => date >= startTimestamp && date <= endTimestamp)),
            Math.min(...h4Dates.filter(date => date >= startTimestamp && date <= endTimestamp)),
            Math.min(...wlcDates.filter(date => date >= startTimestamp && date <= endTimestamp))
        );

        // Update startString to this latest common start date
        startString = dayjs(latestCommonStartDateTimestamp).utc().format('YYYY-MM-DD');

        // Synchronize the dates and filter based on start and end dates
        const dates = Array.from(new Set([
            ...walData.map(([date]) => date),
            ...tgaData.map(item => item.record_date),
            ...rrpData.map(([date]) => date),
            ...h4Data.map(([date]) => date),
            ...wlcData.map(([date]) => date),
        ])).filter(date => date >= startString && date <= endString)
            .sort((a, b) => dayjs(a).utc().toDate() - dayjs(b).utc().toDate());

        let lastWalValue = 0;
        let lastTgaValue = 0;
        let lastRrpValue = 0;
        let lastH4Value = 0;
        let lastWlcValue = 0;

        const combinedData = dates.map(date => {
            const walValue = walData.find(([d]) => d === date)?.[1] || lastWalValue;
            const tgaValue = tgaData.find(item => item.record_date === date)?.open_today_bal || lastTgaValue;
            const rrpValue = rrpData.find(([d]) => d === date)?.[1] || lastRrpValue;
            const h4Value = h4Data.find(([d]) => d === date)?.[1] || lastH4Value;
            const wlcValue = wlcData.find(([d]) => d === date)?.[1] || lastWlcValue;

            // Update the last known values
            lastWalValue = walValue;
            lastTgaValue = tgaValue;
            lastRrpValue = rrpValue;
            lastH4Value = h4Value;
            lastWlcValue = wlcValue;

            // Apply the formula: WALCL - TGA - RRPONTSYD + H41RESPPALDKNWW + WLCFLPCL
            return walValue - tgaValue - rrpValue + h4Value + wlcValue;
        });

        const filteredData = [];
        const filteredDates = [];

        for (let i = 1; i < combinedData.length; i++) {
            if (combinedData[i] !== 0) {
                filteredData.push(combinedData[i]);
                filteredDates.push(dates[i]);
            }
        }

        const chartData = filteredDates.map((date, index) => ({
            timestamp: date,
            liquidity: filteredData[index]
        }));

        const minValue = filteredData.length > 0 ? Math.min(...filteredData) : 0;
        const maxValue = filteredData.length > 0 ? Math.max(...filteredData) : 0;
        const latestDate = filteredDates[filteredDates.length - 1] || "N/A";

        return {
            labels: filteredDates,
            datasets: [{
                label: 'NET FED Liquidity Formula',
                data: chartData,
                borderColor: theme.palette.secondary.main,
                backgroundColor: alpha(theme.palette.secondary.main, 0.1),
                borderWidth: 3,
                pointRadius: 0,
                pointHoverRadius: 6,
                tension: 0.1,
                fill: true
            }],
            minValue,
            maxValue,
            latestDate
        };
    };

    // Generate Pine Script for TradingView
    const generatePineScript = (chartData, title) => {
        const values = chartData.datasets[0].data;
        const dates = chartData.labels;

        if (!values || values.length === 0) return;

        const filledDates = [];
        const filledValues = [];
        let lastKnownValue = null;
        let currentIndex = 0;

        for (let d = new Date(dates[0]); d <= new Date(dates[dates.length - 1]); d.setDate(d.getDate() + 1)) {
            const currentDateString = d.toISOString().split('T')[0];

            if (dates[currentIndex] === currentDateString) {
                lastKnownValue = Array.isArray(values[currentIndex]) ? values[currentIndex].liquidity || values[currentIndex].balance || values[currentIndex].value : values[currentIndex];
                filledDates.push(currentDateString);
                filledValues.push(lastKnownValue);
                currentIndex++;
            } else {
                filledDates.push(currentDateString);
                filledValues.push(lastKnownValue);
            }
        }

        filledDates.reverse();
        filledValues.reverse();

        const mostRecentDate = filledDates[filledDates.length - 1];

        let pineScript = `//@version=5
indicator("${title} Data Plot", overlay=true)

var customValues = array.new_float()
bump = input(true, '', inline = '1') // Enable/Disable offset of origin bar.
date = input.time(timestamp("${mostRecentDate} 00:00 +0000"), "Shift Origin To", tooltip = 'When enabled use this offset for origin bar of data range.', inline = '1')

indx = not bump ? 0 : ta.valuewhen(time == date, bar_index, 0) // Origin bar index.

if bar_index == indx
    customValues := array.from(
     `;

        for (let i = 0; i < filledDates.length; i++) {
            const multiplier = title.includes('Formula') ? 1000000 : 1;
            pineScript += `${filledValues[i] * multiplier}${i < filledValues.length - 1 ? ', ' : `
 `}`;
        }

        pineScript += `    )`;
        pineScript += `

plot(array.size(customValues) < 1 ? na : array.pop(customValues), 'csv', #ffff00) // Plot and shrink dataset for bars within data range.
`;

        navigator.clipboard.writeText(pineScript).then(() => {
            setOpenSnackbar(true);
        }).catch(err => {
            console.error('Could not copy text: ', err);
        });
    };

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    const onRefresh = () => {
        fetchTgaData();
        fetchFredData();
    };

    useEffect(() => {
        fetchTgaData();
        fetchFredData();
    }, [startDate, endDate]);

    const chartIcons = [
        { icon: <ViewAgendaOutlinedIcon />, value: "1", tooltip: "Single Column" },
        // { icon: <ViewQuiltOutlinedIcon />, value: "1.3", tooltip: "Compact Grid" },
        { icon: <GridViewOutlinedIcon />, value: "2", tooltip: "Two Columns" }
    ];

    // Chart configurations
    const charts = [
        {
            title: "Formula #1: NET FED Liquidity",
            subtitle: "WALCL - TGA - RRPONTSYD + H41RESPPALDKNWW + WLCFLPCL (Millions)",
            data: processCombinedChartData(),
            metric: "liquidity",
            plugins: [verticalLinePlugin]
        },
        {
            title: "Treasury General Account (TGA) Closing Balance",
            subtitle: "TGA Closing Balance Over Time (Millions)",
            data: processTgaChartData(),
            metric: "balance"
        },
        {
            title: "Total Assets Supplying Reserve Funds (WALCL)",
            subtitle: "WALCL on Wednesdays (Millions)",
            data: processChartData(walData, 'WALCL', theme.palette.success.main),
            metric: "value"
        },
        {
            title: "Treasury Securities Sold by Fed (RRPONTSYD)",
            subtitle: "Overnight Reverse Repurchase Agreements (Millions)",
            data: processChartData(rrpData, 'RRPONTSYD', theme.palette.error.main),
            metric: "value"
        },
        {
            title: "Liquidity and Credit Facilities Loans (H41RESPPALDKNWW)",
            subtitle: "Bank Term Funding Program, Net on Wednesdays (Millions)",
            data: processChartData(h4Data, 'H41RESPPALDKNWW', theme.palette.warning.main),
            metric: "value"
        },
        {
            title: "Loans Held by Federal Reserve (WLCFLPCL)",
            subtitle: "Primary Credit on Wednesdays (Millions)",
            data: processChartData(wlcData, 'WLCFLPCL', theme.palette.info.main),
            metric: "value"
        }
    ];

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            <Fade in timeout={800}>
                <Box>
                    {/* Header Section */}
                    <Paper
                        elevation={0}
                        sx={{
                            p: 4,
                            mb: 4,
                            background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
                            borderRadius: 3,
                            border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
                        }}
                    >
                        <Box display="flex" alignItems="center" mb={2}>
                            <TrendingUpIcon sx={{ fontSize: 40, color: theme.palette.primary.main, mr: 2 }} />
                            <Typography
                                variant="h3"
                                component="h1"
                                fontWeight="bold"
                                sx={{
                                    background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                                    backgroundClip: 'text',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent'
                                }}
                            >
                                NET FED Liquidity Analysis
                            </Typography>
                        </Box>

                        <Typography variant="h6" color="text.secondary" sx={{ mb: 3, maxWidth: '800px' }}>
                            Comprehensive analysis of Federal Reserve liquidity using the formula: WALCL - TGA - RRPONTSYD + H41RESPPALDKNWW + WLCFLPCL.
                            Track all components that affect market liquidity and monetary conditions.
                        </Typography>

                        {lastUpdated && (
                            <Chip
                                icon={<AnalyticsIcon />}
                                label={`Last updated: ${lastUpdated.toLocaleString()}`}
                                variant="outlined"
                                color="primary"
                                size="small"
                            />
                        )}
                    </Paper>

                    {/* Controls Section */}
                    <Card elevation={2} sx={{ mb: 4, borderRadius: 3 }}>
                        <CardContent sx={{ p: 3 }}>
                            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                                <ShowChartIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                                Analysis Parameters
                            </Typography>

                            <Grid container spacing={3} alignItems="center">
                                <Grid item xs={12} sm={6} md={3}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            label="Start Date"
                                            value={startDate}
                                            onChange={(newValue) => setStartDate(dayjs(newValue).utc())}
                                            disabled={loading}
                                            maxDate={endDate}
                                            minDate={dayjs("2023-03-16").utc()}
                                            sx={{ width: '100%' }}
                                            slotProps={{
                                                textField: {
                                                    variant: 'outlined',
                                                    size: 'medium'
                                                }
                                            }}
                                        />
                                    </LocalizationProvider>
                                </Grid>

                                <Grid item xs={12} sm={6} md={3}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            label="End Date"
                                            value={endDate}
                                            onChange={(newValue) => setEndDate(dayjs(newValue).utc())}
                                            disabled={loading}
                                            minDate={startDate}
                                            maxDate={dayjs().utc()}
                                            sx={{ width: '100%' }}
                                            slotProps={{
                                                textField: {
                                                    variant: 'outlined',
                                                    size: 'medium'
                                                }
                                            }}
                                        />
                                    </LocalizationProvider>
                                </Grid>

                                <Grid item xs={12} sm={6} md={3}>
                                    <Button
                                        onClick={onRefresh}
                                        variant="contained"
                                        disabled={loading}
                                        size="large"
                                        startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <RefreshIcon />}
                                        sx={{
                                            height: 56,
                                            borderRadius: 2,
                                            textTransform: 'none',
                                            fontSize: '1rem',
                                            fontWeight: 600,
                                            boxShadow: theme.shadows[4],
                                            '&:hover': {
                                                boxShadow: theme.shadows[8]
                                            }
                                        }}
                                        fullWidth
                                    >
                                        {loading ? 'Loading...' : 'Reload Charts'}
                                    </Button>
                                </Grid>

                                <Grid item xs={12} sm={6} md={3}>
                                    <Paper
                                        elevation={1}
                                        sx={{
                                            p: 2,
                                            borderRadius: 2,
                                            background: alpha(theme.palette.primary.main, 0.05)
                                        }}
                                    >
                                        <Typography variant="body2" color="text.secondary" gutterBottom>
                                            Chart Layout
                                        </Typography>
                                        <Box display="flex" justifyContent="center">
                                            {chartIcons.map((item) => (
                                                <Tooltip key={item.value} title={item.tooltip}>
                                                    <IconButton
                                                        onClick={() => setTabValue(item.value)}
                                                        color={tabValue === item.value ? "primary" : "default"}
                                                        sx={{
                                                            mx: 0.5,
                                                            backgroundColor: tabValue === item.value ? alpha(theme.palette.primary.main, 0.1) : 'transparent',
                                                            '&:hover': {
                                                                backgroundColor: alpha(theme.palette.primary.main, 0.1)
                                                            }
                                                        }}
                                                    >
                                                        {item.icon}
                                                    </IconButton>
                                                </Tooltip>
                                            ))}
                                        </Box>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>

                    {/* Charts Section */}
                    {!loading && (
                        <Fade in timeout={1000}>
                            <Grid container spacing={3}>
                                {charts.map((chart, index) => (
                                    <Grid key={index} item xs={12 / parseFloat(tabValue)}>
                                        <Card
                                            elevation={3}
                                            sx={{
                                                borderRadius: 3,
                                                overflow: 'hidden',
                                                background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
                                                mb: 2
                                            }}
                                        >
                                            <CardContent sx={{ p: 0 }}>
                                                <Box sx={{ p: 2, borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}` }}>
                                                    <Box display="flex" justifyContent="space-between" alignItems="center">
                                                        <Box>
                                                            <Typography variant="h6" fontWeight="bold" color="primary">
                                                                {chart.title}
                                                            </Typography>
                                                            <Typography variant="body2" color="text.secondary">
                                                                {chart.subtitle}
                                                            </Typography>
                                                            <Typography variant="caption" color="text.secondary">
                                                                Latest: {chart.data.latestDate}
                                                            </Typography>
                                                        </Box>
                                                        <Tooltip title="Copy Pine Script">
                                                            <IconButton
                                                                onClick={() => generatePineScript(chart.data, chart.title)}
                                                                disabled={!chart.data.datasets[0].data.length}
                                                                color="primary"
                                                            >
                                                                <ContentCopyIcon />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </Box>
                                                </Box>
                                                <CryptoChart
                                                    datasets={chart.data.datasets}
                                                    title=""
                                                    metric={chart.metric}
                                                    showDatesOnly={true}
                                                    plugins={chart.plugins}
                                                />
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </Fade>
                    )}

                    {loading && (
                        <Box display="flex" justifyContent="center" alignItems="center" minHeight={400}>
                            <CircularProgress size={60} />
                        </Box>
                    )}

                    {/* Info Section */}
                    <Paper
                        elevation={1}
                        sx={{
                            mt: 4,
                            p: 3,
                            borderRadius: 3,
                            background: alpha(theme.palette.info.main, 0.02),
                            border: `1px solid ${alpha(theme.palette.info.main, 0.1)}`
                        }}
                    >
                        <Typography variant="h6" gutterBottom color="info.main">
                            About NET FED Liquidity Formula
                        </Typography>
                        <Typography variant="body2" color="text.secondary" paragraph>
                            <strong>Formula:</strong> WALCL - TGA - RRPONTSYD + H41RESPPALDKNWW + WLCFLPCL
                        </Typography>
                        <Typography variant="body2" color="text.secondary" paragraph>
                            <strong>Components:</strong>
                        </Typography>
                        <Box component="ul" sx={{ pl: 2, m: 0 }}>
                            <Typography component="li" variant="body2" color="text.secondary">
                                <strong>WALCL:</strong> Total assets supplying reserve funds (adds liquidity)
                            </Typography>
                            <Typography component="li" variant="body2" color="text.secondary">
                                <strong>TGA:</strong> Treasury General Account balance (removes liquidity when high)
                            </Typography>
                            <Typography component="li" variant="body2" color="text.secondary">
                                <strong>RRPONTSYD:</strong> Reverse repo operations (removes liquidity)
                            </Typography>
                            <Typography component="li" variant="body2" color="text.secondary">
                                <strong>H41RESPPALDKNWW:</strong> Bank Term Funding Program (adds liquidity)
                            </Typography>
                            <Typography component="li" variant="body2" color="text.secondary">
                                <strong>WLCFLPCL:</strong> Primary credit loans (adds liquidity)
                            </Typography>
                        </Box>
                    </Paper>

                    <Snackbar
                        open={openSnackbar}
                        autoHideDuration={6000}
                        onClose={handleCloseSnackbar}
                        message="Pine Script copied to clipboard!"
                    />

                    <Snackbar
                        open={error}
                        message={`Error loading data: ${errorSource}. Try reloading the page.`}
                    />
                </Box>
            </Fade>
        </Container>
    );
};

export default TGA1;
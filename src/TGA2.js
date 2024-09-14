import React, {useEffect, useState} from 'react';
import {Line} from 'react-chartjs-2';
import {Button, CircularProgress, Grid, Snackbar, Tab, Tabs, TextField, Typography,} from '@mui/material';
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import ViewAgendaOutlinedIcon from "@mui/icons-material/ViewAgendaOutlined";
import ViewQuiltOutlinedIcon from "@mui/icons-material/ViewQuiltOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import {CognitoRefreshToken, CognitoUser} from "amazon-cognito-identity-js";
import {UserPool} from "./UserPool";
import {Link} from "react-router-dom";

// Apply UTC plugin to dayjs
dayjs.extend(utc);

const TGA1 = () => {
    const [tgaData, setTgaData] = useState([]);
    const [rrpData, setRrpData] = useState([]);
    const [wlcData, setWlcData] = useState([]);
    const [h4Data, setH4Data] = useState([]);
    const [walData, setWalData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [errorSource, setErrorSource] = useState("");
    const [startDate, setStartDate] = useState(dayjs("2000-01-01"));
    const [endDate, setEndDate] = useState(dayjs().utc());
    const [tabValue, setTabValue] = useState('1.3');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const watermarkPlugin = {
        id: 'watermark',
        beforeDraw: (chart) => {
            const ctx = chart.ctx;
            const width = chart.width;
            const height = chart.height;

            ctx.save();
            ctx.font = 'bold 30px Arial';
            ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.translate(width / 2, height / 2);
            ctx.rotate(-Math.PI / 4);
            ctx.fillText('WWW.JOINTHEREALWORLD.COM', 0, 0);
            ctx.fillText('WWW.JOINTHEREALWORLD.COM', -width/5, -height/2.5);
            ctx.fillText('WWW.JOINTHEREALWORLD.COM', width/5, height/2.5);
            ctx.restore();
        },
    };

    const localStorageTokenListener = () => {
        const token = localStorage.getItem("cognito-token");
        if (token) {
            const refreshToken = new CognitoRefreshToken({RefreshToken: localStorage.getItem("cognito-refresh-token")});

            const cognitoUser = new CognitoUser({
                Username: localStorage.getItem("email"),
                Pool: UserPool,
            });

            cognitoUser.refreshSession(refreshToken, (err, session) => {
                if (!err) {
                    localStorage.setItem("cognito-token", session.getIdToken().getJwtToken());
                    setIsLoggedIn(true);
                }
            });
        }
    };

    useEffect(() => {
        localStorageTokenListener();
        window.addEventListener("cognito-token-change", localStorageTokenListener);
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        fetchTgaData();
        // eslint-disable-next-line
    }, [startDate, endDate, isLoggedIn]);

    useEffect(() => {
        fetchRrpData();
    }, []);

    const fetchTgaData = async () => {
        setError(false);
        setErrorSource("");
        setLoading(true);
        try {
            const token = localStorage.getItem("cognito-token");
            const path = isLoggedIn ? "new-secret-path" : "tga1";

            const response = await fetch(`https://api.fijisolutions.net/${path}?start_date=${startDate.format('YYYY-MM-DD')}&end_date=${endDate.format('YYYY-MM-DD')}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
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

    const fetchRrpData = async () => {
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
            const response1 = await fetch(`https://cors.fijisolutions.net:8080/https://fred.stlouisfed.org/graph/api/series/?obs=true&sid=RRPONTSYD`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(rrpBody),
            });
            const result1 = await response1.json();

            // Normalize timestamp to YYYY-MM-DD
            const normalizedData1 = result1.observations[0].map(([timestamp, value]) => {
                const date = dayjs(timestamp).utc().format('YYYY-MM-DD');
                return [date, value ? value * 1000 : value];
            });
            setRrpData(normalizedData1);
            count = 1;

            const response2 = await fetch(`https://cors.fijisolutions.net:8080/https://fred.stlouisfed.org/graph/api/series/?obs=true&sid=WLCFLPCL`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(wlcBody),
            });
            const result2 = await response2.json();

            // Normalize timestamp to YYYY-MM-DD
            const normalizedData2 = result2.observations[0].map(([timestamp, value]) => {
                const date = dayjs(timestamp).utc().format('YYYY-MM-DD');
                return [date, value];
            });
            setWlcData(normalizedData2);
            count = 2;

            const response3 = await fetch(`https://cors.fijisolutions.net:8080/https://fred.stlouisfed.org/graph/api/series/?obs=true&sid=H41RESPPALDKNWW`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(h4Body),
            });
            const result3 = await response3.json();

            // Normalize timestamp to YYYY-MM-DD
            const normalizedData3 = result3.observations[0].map(([timestamp, value]) => {
                const date = dayjs(timestamp).utc().format('YYYY-MM-DD');
                return [date, value];
            });
            setH4Data(normalizedData3);
            count = 3;

            const response4 = await fetch(`https://cors.fijisolutions.net:8080/https://fred.stlouisfed.org/graph/api/series/?obs=true&sid=WALCL`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(walBody),
            });
            const result4 = await response4.json();

            // Normalize timestamp to YYYY-MM-DD
            const normalizedData4 = result4.observations[0].map(([timestamp, value]) => {
                const date = dayjs(timestamp).utc().format('YYYY-MM-DD');
                return [date, value];
            });
            setWalData(normalizedData4);
            count = 4;
        } catch (error) {
            console.error('Error fetching data:', error);
            setError(true);
            setErrorSource(count === 0 ? "RRP" : (count === 1 ? "WLC" : (count === 2 ? "H4" : (count === 3 ? "WAL" : "Exception"))));
        }
    };

    const filterDataByDate = (data, startDate, endDate) => {
        const startTimestamp = startDate.utc().valueOf();
        const endTimestamp = endDate.utc().valueOf();

        return data.filter(([dateString]) => {
            const timestamp = dayjs(dateString).utc().valueOf(); // Convert date string back to timestamp
            return timestamp >= startTimestamp && timestamp <= endTimestamp;
        });
    };

    const processTgaChartData = () => {
        const validData = tgaData
            .filter(item => item.open_today_bal !== null && !isNaN(parseFloat(item.open_today_bal)))
            .sort((a, b) => dayjs(a.record_date).utc().toDate() - dayjs(b.record_date).utc().toDate());

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

        const labels = validData.map(([date]) => date);
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

    const processWlcChartData = () => {
        const filteredData = filterDataByDate(wlcData, startDate, endDate);

        const validData = filteredData.filter(([, value]) => value !== null);

        if (validData.length === 0) {
            return {
                labels: [],
                datasets: [
                    {
                        label: 'WLCFLPCL',
                        data: [],
                        borderColor: 'rgba(255, 99, 132, 1)',
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        fill: false,
                    },
                ],
            };
        }

        const labels = validData.map(([date]) => date);
        const rrpValues = validData.map(([, value]) => value);

        const minRrpValue = Math.min(...rrpValues);
        const maxRrpValue = Math.max(...rrpValues);

        const latestDate = labels[labels.length - 1] || "N/A";

        return {
            labels,
            datasets: [
                {
                    label: 'WLCFLPCL',
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

    const processH4ChartData = () => {
        const filteredData = filterDataByDate(h4Data, startDate, endDate);

        const validData = filteredData.filter(([, value]) => value !== null);

        if (validData.length === 0) {
            return {
                labels: [],
                datasets: [
                    {
                        label: 'H41RESPPALDKNWW',
                        data: [],
                        borderColor: 'rgba(255, 99, 132, 1)',
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        fill: false,
                    },
                ],
            };
        }

        const labels = validData.map(([date]) => date);
        const rrpValues = validData.map(([, value]) => value);

        const minRrpValue = Math.min(...rrpValues);
        const maxRrpValue = Math.max(...rrpValues);

        const latestDate = labels[labels.length - 1] || "N/A";

        return {
            labels,
            datasets: [
                {
                    label: 'H41RESPPALDKNWW',
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

    const processWalChartData = () => {
        const filteredData = filterDataByDate(walData, startDate, endDate);

        const validData = filteredData.filter(([, value]) => value !== null);

        if (validData.length === 0) {
            return {
                labels: [],
                datasets: [
                    {
                        label: 'WALCL',
                        data: [],
                        borderColor: 'rgba(255, 99, 132, 1)',
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        fill: false,
                    },
                ],
            };
        }

        const labels = validData.map(([date]) => date);
        const rrpValues = validData.map(([, value]) => value);

        const minRrpValue = Math.min(...rrpValues);
        const maxRrpValue = Math.max(...rrpValues);

        const latestDate = labels[labels.length - 1] || "N/A";

        return {
            labels,
            datasets: [
                {
                    label: 'WALCL',
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

    const processCombinedChartData = () => {
        // Convert start and end dates to strings in YYYY-MM-DD format
        let startString = startDate.utc().format('YYYY-MM-DD');
        const endString = endDate.utc().format('YYYY-MM-DD');

        // Extract all dates from each dataset and convert them to timestamps
        // const walDates = walData.map(([date]) => dayjs(date).utc().toDate().getTime());
        // const tgaDates = tgaData.map(item => dayjs(item.record_date).utc().toDate().getTime());
        // const rrpDates = rrpData.map(([date]) => dayjs(date).utc().toDate().getTime());
        // const h4Dates = h4Data.map(([date]) => dayjs(date).utc().toDate().getTime());
        // const wlcDates = wlcData.map(([date]) => dayjs(date).utc().toDate().getTime());

        // Convert start and end strings to timestamps
        // const startTimestamp = dayjs(startString).utc().toDate().getTime();
        // const endTimestamp = dayjs(endString).utc().toDate().getTime();

        // Find the latest common start date across all datasets
        // const latestCommonStartDateTimestamp = Math.max(
        //     Math.min(...walDates.filter(date => date >= startTimestamp && date <= endTimestamp)),
        //     Math.min(...tgaDates.filter(date => date >= startTimestamp && date <= endTimestamp)),
        //     Math.min(...rrpDates.filter(date => date >= startTimestamp && date <= endTimestamp)),
        //     Math.min(...h4Dates.filter(date => date >= startTimestamp && date <= endTimestamp)),
        //     Math.min(...wlcDates.filter(date => date >= startTimestamp && date <= endTimestamp))
        // );

        // Convert the timestamp back to a date string
        // Update startString to this latest common start date
        // startString = dayjs(latestCommonStartDateTimestamp).utc().format('YYYY-MM-DD');

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

            // if (walValue === 0 || tgaValue === 0 || rrpValue === 0 || h4Value === 0 || wlcValue === 0) {
            //     return 0;
            // }

            // Apply the formula
            return walValue - tgaValue - rrpValue + h4Value + wlcValue;
        });

        const filteredData = [];
        const filteredDates = [];

        for (let i = 0; i < combinedData.length; i++) {
            if (combinedData[i] !== 0) {
                filteredData.push(combinedData[i]);
                filteredDates.push(dates[i]);
            }
        }

        // Use the dates directly as labels (they are already in YYYY-MM-DD format)
        const labels = filteredDates;

        const minValue = filteredData.length > 0 ? Math.min(...filteredData) : 0;
        const maxValue = filteredData.length > 0 ? Math.max(...filteredData) : 0;

        const latestDate = labels[labels.length - 1] || "N/A";

        return {
            labels,
            datasets: [
                {
                    label: 'Tomas\' Formula',
                    data: filteredData,
                    borderColor: 'rgba(153, 102, 255, 1)',
                    backgroundColor: 'rgba(153, 102, 255, 0.2)',
                    fill: false,
                },
            ],
            minValue,
            maxValue,
            latestDate,
        };
    };

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const generatePineScript = () => {
        const values = processCombinedChartData().datasets[0].data;
        const dates = processCombinedChartData().labels;

        const filledDates = [];
        const filledValues = [];

        let lastKnownValue = null;

        let currentIndex = 0;
        for (let d = new Date(dates[0]); d <= new Date(dates[dates.length - 1]); d.setDate(d.getDate() + 1)) {
            const currentDateString = d.toISOString().split('T')[0];

            if (dates[currentIndex] === currentDateString) {
                lastKnownValue = values[currentIndex];
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
indicator("${processCombinedChartData().datasets[0].label} Data Plot", overlay=true)

var customValues = array.new_float()
bump = input(true, '', inline = '1') // Enable/Disable offset of origin bar.
date = input.time(timestamp("${mostRecentDate} 00:00 +0000"), "Shift Origin To", tooltip = 'When enabled use this offset for origin bar of data range.', inline = '1')

indx = not bump ? 0 : ta.valuewhen(time == date, bar_index, 0) // Origin bar index.

if bar_index == indx
    customValues := array.from(
     `;

        for (let i = 0; i < filledDates.length; i++) {
            pineScript += `${filledValues[i] * 1000000}${i < filledValues.length - 1 ? ', ' : `
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

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    return (
        <div className="App">
            <h1>{"NET FED Liquidity Formulas" + (!isLoggedIn ? " (LAGGING)" : "")}</h1>
            {!isLoggedIn && (
                <>
                    <Typography variant={"body1"} style={{marginBottom: "16px"}}>
                        The TGA in the data below is lagging by 7 entries. To view up to date data you need to <Link to={"/login"}>login</Link>.
                    </Typography>
                </>
            )}
            <Grid container spacing={2} justifyContent="center">
                <Grid item>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Start Date"
                            value={startDate}
                            onChange={(newValue) => {
                                setStartDate(dayjs(newValue).utc());
                            }}
                            renderInput={(params) => <TextField {...params} />}
                            // minDate={dayjs("2023-03-16").utc()}
                            // maxDate={endDate}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="End Date"
                            value={endDate}
                            onChange={(newValue) => {
                                setEndDate(dayjs(newValue).utc());
                            }}
                            renderInput={(params) => <TextField {...params} />}
                            // minDate={startDate}
                            // maxDate={dayjs().utc()}
                        />
                    </LocalizationProvider>
                </Grid>

                <Grid container item justifyContent="center">
                    <Grid item>
                        <Button style={{"marginLeft": "8px"}} onClick={() => generatePineScript()} variant="contained"
                                disabled={loading || processCombinedChartData().datasets[0].data.length === 0}>
                            {loading || processCombinedChartData().datasets[0].data.length === 0 ? (
                                <CircularProgress size={25} color={"grey"}/>
                            ) : (
                                "Copy Pine Script"
                            )}
                        </Button>
                    </Grid>
                </Grid>

                <Grid
                    container
                    justifyContent={"center"}
                    alignItems={"center"}
                    direction={"column"}
                >
                    <Grid item>
                        <h4>Change charts size</h4>
                    </Grid>

                    <Grid item>
                        <Tabs value={tabValue} onChange={handleTabChange}>
                            <Tab label={(<ViewAgendaOutlinedIcon/>)} value={"1"}/>
                            <Tab label={(<ViewQuiltOutlinedIcon/>)} value={"1.3"}/>
                            <Tab label={(<GridViewOutlinedIcon/>)} value={"2"}/>
                        </Tabs>
                    </Grid>
                </Grid>
            </Grid>
            {loading ? (
                <CircularProgress/>
            ) : (
                <Grid
                    container
                    direction={"row"}
                    justifyContent={"space-evenly"}
                >
                    <Grid
                        item
                        xs={11 / parseFloat(tabValue)}
                        justifyContent="center"
                    >
                        <Grid item xs={12}>
                            <Line
                                data={processCombinedChartData()}
                                options={{
                                    responsive: true,
                                    plugins: {
                                        legend: {
                                            position: 'top',
                                        },
                                        title: {
                                            display: true,
                                            text: 'Tomas\' Formula: WALCL - TGA - RRPONTSYD + H41RESPPALDKNWW + WLCFLPCL (Millions)',
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
                                            min: processCombinedChartData().minValue - 10000,
                                            max: processCombinedChartData().maxValue + 10000,
                                        },
                                    },
                                }}
                                plugins={[watermarkPlugin]}
                            />
                            <Typography variant="body1" align="center">
                                Latest Date: {processCombinedChartData().latestDate}
                            </Typography>
                        </Grid>
                    </Grid>

                    <Grid
                        item
                        xs={11 / parseFloat(tabValue)}
                        justifyContent="center"
                    >
                        <h1>Treasury General Account (TGA) Closing Balance</h1>
                        <Grid item xs={12}>
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
                                            text: 'TGA Closing Balance Over Time (Millions)',
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
                                plugins={[watermarkPlugin]}
                            />
                            <Typography variant="body1" align="center">
                                Latest Date: {processTgaChartData().latestDate}
                            </Typography>
                        </Grid>
                    </Grid>


                    <Grid
                        item
                        xs={11 / parseFloat(tabValue)}
                        justifyContent="center"
                    >
                        <h1>Factors Affecting Reserve Balances:</h1>
                        <h1>Total Assets Supplying Reserve Funds on Wednesdays (WALCL)</h1>
                        <Grid item xs={12}>
                            <Line
                                data={processWalChartData()}
                                options={{
                                    responsive: true,
                                    plugins: {
                                        legend: {
                                            position: 'top',
                                        },
                                        title: {
                                            display: true,
                                            text: 'WALCL (Millions)',
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
                                            min: processWalChartData().minValue - 3000,
                                            max: processWalChartData().maxValue + 3000,
                                        },
                                    },
                                }}
                                plugins={[watermarkPlugin]}
                            />
                            <Typography variant="body1" align="center">
                                Latest Date: {processWalChartData().latestDate}
                            </Typography>
                        </Grid>
                    </Grid>


                    <Grid
                        item
                        xs={11 / parseFloat(tabValue)}
                        justifyContent="center"
                    >
                        <h1>Overnight Reverse Repurchase Agreements:</h1>
                        <h1>Treasury Securities Sold by the Federal Reserve (RRPONTSYD)</h1>
                        <Grid item xs={12}>
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
                                            text: 'RRPONTSYD (Millions)',
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
                                            min: processRrpChartData().minValue - 10000,
                                            max: processRrpChartData().maxValue + 10000,
                                        },
                                    },
                                }}
                                plugins={[watermarkPlugin]}
                            />
                            <Typography variant="body1" align="center">
                                Latest Date: {processRrpChartData().latestDate}
                            </Typography>
                        </Grid>
                    </Grid>


                    <Grid
                        item
                        xs={11 / parseFloat(tabValue)}
                        justifyContent="center"
                    >
                        <h1>Factors Affecting Reserve Balances: Reserve Bank Credit:</h1>
                        <h1>Liquidity and Credit Facilities: Loans on Wednesdays (H41RESPPALDKNWW)</h1>
                        <Grid item xs={12}>
                            <Line
                                data={processH4ChartData()}
                                options={{
                                    responsive: true,
                                    plugins: {
                                        legend: {
                                            position: 'top',
                                        },
                                        title: {
                                            display: true,
                                            text: 'H41RESPPALDKNWW (Millions)',
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
                                            min: processH4ChartData().minValue - 200,
                                            max: processH4ChartData().maxValue + 200,
                                        },
                                    },
                                }}
                                plugins={[watermarkPlugin]}
                            />
                            <Typography variant="body1" align="center">
                                Latest Date: {processH4ChartData().latestDate}
                            </Typography>
                        </Grid>
                    </Grid>


                    <Grid
                        item
                        xs={11 / parseFloat(tabValue)}
                        justifyContent="center"
                    >
                        <h1>Assets: Liquidity and Credit Facilities:</h1>
                        <h1>Loans Held by the Federal Reserve (WLCFLPCL)</h1>
                        <Grid item xs={12}>
                            <Line
                                data={processWlcChartData()}
                                options={{
                                    responsive: true,
                                    plugins: {
                                        legend: {
                                            position: 'top',
                                        },
                                        title: {
                                            display: true,
                                            text: 'WLCFLPCL (Millions)',
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
                                            min: processWlcChartData().minValue - 500,
                                            max: processWlcChartData().maxValue + 500,
                                        },
                                    },
                                }}
                                plugins={[watermarkPlugin]}
                            />
                            <Typography variant="body1" align="center">
                                Latest Date: {processWlcChartData().latestDate}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            )}

            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message="Pine Script copied to clipboard!"
            />

            <Snackbar
                open={error}
                message={`Error on data loading occurred: ${errorSource}, try reloading the page`}
            />
        </div>
    );
};

export default TGA1;

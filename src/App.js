import React, {useEffect, useState} from 'react';
import CryptoChart from './components/CryptoChart';
import {
    Button,
    Checkbox,
    CircularProgress,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Tab,
    Tabs,
    TextField,
    Paper,
    Box,
    Typography,
    Card,
    CardContent,
    Chip,
    Divider,
    useTheme,
    alpha,
    Container,
    FormControlLabel
} from "@mui/material";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import BarChart from "./components/BarChart";
import "./App.css";
import ViewAgendaOutlinedIcon from '@mui/icons-material/ViewAgendaOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import ViewQuiltOutlinedIcon from '@mui/icons-material/ViewQuiltOutlined';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import SearchIcon from '@mui/icons-material/Search';
import GetAppIcon from '@mui/icons-material/GetApp';

const App = () => {
    const theme = useTheme();
    const [datasets, setDatasets] = useState([]);
    const [metrics, setMetrics] = useState([]);

    // const [btc1l, setBtc1l] = useState(false);
    // const [btc2l, setBtc2l] = useState(false);
    // const [btc3l, setBtc3l] = useState(false);
    // const [btc4l, setBtc4l] = useState(false);
    // const [btc5l, setBtc5l] = useState(false);
    // const [btc7l, setBtc7l] = useState(false);
    //
    // const [eth1l, setEth1l] = useState(false);
    // const [eth2l, setEth2l] = useState(false);
    // const [eth3l, setEth3l] = useState(false);
    // const [eth4l, setEth4l] = useState(false);
    // const [eth5l, setEth5l] = useState(false);
    // const [eth7l, setEth7l] = useState(false);
    //
    // const [sol1l, setSol1l] = useState(false);
    // const [sol2l, setSol2l] = useState(false);
    // const [sol3l, setSol3l] = useState(false);
    // const [sol4l, setSol4l] = useState(false);
    // const [sol5l, setSol5l] = useState(false);
    //
    // const [doge2l, setDoge2l] = useState(false);
    // const [doge5l, setDoge5l] = useState(false);
    //
    // const [ethbtc2l, setEthbtc2l] = useState(false);
    // const [ethbtc5l, setEthbtc5l] = useState(false);
    // const [ethbtc10l, setEthbtc10l] = useState(false);
    //
    // const [sui2l, setSui2l] = useState(false);
    // const [sui5l, setSui5l] = useState(false);

    const [btc1xpol, setBtc1xpol] = useState(false);
    const [btc1xbase, setBtc1xbase] = useState(false);
    const [btc1xopt, setBtc1xopt] = useState(false);
    const [btc1xarb, setBtc1xarb] = useState(false);
    const [btc2xbase, setBtc2xbase] = useState(false);
    const [btc2xopt, setBtc2xopt] = useState(false);
    const [btc2xarb, setBtc2xarb] = useState(false);
    const [btc3xpol, setBtc3xpol] = useState(false);
    const [btc3xbase, setBtc3xbase] = useState(false);
    const [btc3xopt, setBtc3xopt] = useState(false);
    const [btc3xarb, setBtc3xarb] = useState(false);
    const [btc4xopt, setBtc4xopt] = useState(false);
    const [btc4xarb, setBtc4xarb] = useState(false);
    const [btccvrd2xarb, setBtccvrd2xarb] = useState(false);
    const [btc1xprotected, setBtc1xprotected] = useState(false);
    const [btc2xprotected, setBtc2xprotected] = useState(false);
    const [btc3xprotected, setBtc3xprotected] = useState(false);

    const [eth1xpol, setEth1xpol] = useState(false);
    const [eth1xopt, setEth1xopt] = useState(false);
    const [eth1xarb, setEth1xarb] = useState(false);
    const [steth2x, setSteth2x] = useState(false);
    const [eth2xopt, setEth2xopt] = useState(false);
    const [eth2xarb, setEth2xarb] = useState(false);
    const [eth3xpol, setEth3xpol] = useState(false);
    const [steth3x, setSteth3x] = useState(false);
    const [eth3xopt, setEth3xopt] = useState(false);
    const [eth3xarb, setEth3xarb] = useState(false);
    const [eth4xarb, setEth4xarb] = useState(false);
    const [steth4x, setSteth4x] = useState(false);

    const [sol1xarb, setSol1xarb] = useState(false);
    const [sol2xopt, setSol2xopt] = useState(false);
    const [sol3xopt, setSol3xopt] = useState(false);
    const [sol1xxarb, setSol1xxarb] = useState(false);
    const [sol2xarb, setSol2xarb] = useState(false);
    const [sol3xarb, setSol3xarb] = useState(false);

    const [sui2xopt, setSui2xopt] = useState(false);
    const [sui1xxarb, setSui1xxarb] = useState(false);
    const [sui2xarb, setSui2xarb] = useState(false);

    const [doge2xopt, setDoge2xopt] = useState(false);

    const [spotBtc, setSpotBtc] = useState(false);
    const [spotBtc2, setSpotBtc2] = useState(false);
    const [spotBtc3, setSpotBtc3] = useState(false);
    const [spotBtc4, setSpotBtc4] = useState(false);
    const [spotBtc5, setSpotBtc5] = useState(false);
    const [spotEth, setSpotEth] = useState(false);
    const [spotEth2, setSpotEth2] = useState(false);
    const [spotEth3, setSpotEth3] = useState(false);
    const [spotEth4, setSpotEth4] = useState(false);
    const [spotEth5, setSpotEth5] = useState(false);
    const [spotSol, setSpotSol] = useState(false);
    const [spotSol2, setSpotSol2] = useState(false);
    const [spotSol3, setSpotSol3] = useState(false);
    const [spotSol4, setSpotSol4] = useState(false);
    const [spotSol5, setSpotSol5] = useState(false);
    const [spotSui, setSpotSui] = useState(false);
    const [spotSui2, setSpotSui2] = useState(false);
    const [spotSui3, setSpotSui3] = useState(false);
    const [spotSui4, setSpotSui4] = useState(false);
    const [spotSui5, setSpotSui5] = useState(false);
    const [spotDoge, setSpotDoge] = useState(false);
    const [spotDoge2, setSpotDoge2] = useState(false);
    const [spotDoge3, setSpotDoge3] = useState(false);
    const [spotDoge4, setSpotDoge4] = useState(false);
    const [spotDoge5, setSpotDoge5] = useState(false);

    const array = [];
    // const [array,setArray] = useState([]);
    const [torosArray,setTorosArray] = useState([]);
    const [spotArray,setSpotArray] = useState([]);

    const [tabValue, setTabValue] = React.useState('2');
    const [granularity, setGranularity] = useState("DAYS");
    const [interval, setInterval] = useState("1d");
    const [granularityUnit, setGranularityUnit] = useState(1);
    const [fromDate, setFromDate] = useState(dayjs("2024-05-01"));
    const [toDate, setToDate] = useState(dayjs(undefined));
    const [initialCapital, setInitialCapital] = useState(1000);
    const [riskFreeRate, setRiskFreeRate] = useState(0);
    const [loading, setLoading] = useState(false);

    const domain = "https://np40nkw6be.execute-api.us-east-1.amazonaws.com/Prod/";

    // const checkboxClick = (asset) => {
    //     let boolValue = false;
    //     switch (asset) {
    //         case "BTC1L":
    //             boolValue = !btc1l;
    //             setBtc1l(!btc1l);
    //             break;
    //         case "BTC2L":
    //             boolValue = !btc2l;
    //             setBtc2l(!btc2l);
    //             break;
    //         case "BTC3L":
    //             boolValue = !btc3l;
    //             setBtc3l(!btc3l);
    //             break;
    //         case "BTC4L":
    //             boolValue = !btc4l;
    //             setBtc4l(!btc4l);
    //             break;
    //         case "BTC5L":
    //             boolValue = !btc5l;
    //             setBtc5l(!btc5l);
    //             break;
    //         case "BTC7L":
    //             boolValue = !btc7l;
    //             setBtc7l(!btc7l);
    //             break;
    //
    //         case "ETH1L":
    //             boolValue = !eth1l;
    //             setEth1l(!eth1l);
    //             break;
    //         case "ETH2L":
    //             boolValue = !eth2l;
    //             setEth2l(!eth2l);
    //             break;
    //         case "ETH3L":
    //             boolValue = !eth3l;
    //             setEth3l(!eth3l);
    //             break;
    //         case "ETH4L":
    //             boolValue = !eth4l;
    //             setEth4l(!eth4l);
    //             break;
    //         case "ETH5L":
    //             boolValue = !eth5l;
    //             setEth5l(!eth5l);
    //             break;
    //         case "ETH7L":
    //             boolValue = !eth7l;
    //             setEth7l(!eth7l);
    //             break;
    //
    //         case "SOL1L":
    //             boolValue = !sol1l;
    //             setSol1l(!sol1l);
    //             break;
    //         case "SOL2L":
    //             boolValue = !sol2l;
    //             setSol2l(!sol2l);
    //             break;
    //         case "SOL3L":
    //             boolValue = !sol3l;
    //             setSol3l(!sol3l);
    //             break;
    //         case "SOL4L":
    //             boolValue = !sol4l;
    //             setSol4l(!sol4l);
    //             break;
    //         case "SOL5L":
    //             boolValue = !sol5l;
    //             setSol5l(!sol5l);
    //             break;
    //
    //         case "DOGE2L":
    //             boolValue = !doge2l;
    //             setDoge2l(!doge2l);
    //             break;
    //
    //         case "DOGE5L":
    //             boolValue = !doge5l;
    //             setDoge5l(!doge5l);
    //             break;
    //
    //         case "ETHBTC2L":
    //             boolValue = !ethbtc2l;
    //             setEthbtc2l(!ethbtc2l);
    //             break;
    //
    //         case "ETHBTC5L":
    //             boolValue = !ethbtc5l;
    //             setEthbtc5l(!ethbtc5l);
    //             break;
    //
    //         case "ETHBTC10L":
    //             boolValue = !ethbtc10l;
    //             setEthbtc10l(!ethbtc10l);
    //             break;
    //
    //         case "SUI2L":
    //             boolValue = !sui2l;
    //             setSui2l(!sui2l);
    //             break;
    //
    //         case "SUI5L":
    //             boolValue = !sui5l;
    //             setSui5l(!sui5l);
    //             break;
    //         default:
    //             break;
    //     }
    //
    //     if (boolValue) {
    //         setArray([...array, asset]);
    //     } else {
    //         setArray(array.filter(str => str !== asset));
    //     }
    // };

    const torosCheckboxClick = (asset) => {
        let boolValue = false;
        switch (asset) {
            case "BTC1XPOL":
                boolValue = !btc1xpol;
                setBtc1xpol(!btc1xpol);
                break;
            case "BTC1XBASE":
                boolValue = !btc1xbase;
                setBtc1xbase(!btc1xbase);
                break;
            case "BTC1XOPT":
                boolValue = !btc1xopt;
                setBtc1xopt(!btc1xopt);
                break;
            case "BTC1XARB":
                boolValue = !btc1xarb;
                setBtc1xarb(!btc1xarb);
                break;
            case "BTC2XOPT":
                boolValue = !btc2xopt;
                setBtc2xopt(!btc2xopt);
                break;
            case "BTC2XBASE":
                boolValue = !btc2xbase;
                setBtc2xbase(!btc2xbase);
                break;
            case "BTC2XARB":
                boolValue = !btc2xarb;
                setBtc2xarb(!btc2xarb);
                break;
            case "BTC3XPOL":
                boolValue = !btc3xpol;
                setBtc3xpol(!btc3xpol);
                break;
            case "BTC3XBASE":
                boolValue = !btc3xbase;
                setBtc3xbase(!btc3xbase);
                break;
            case "BTC3XOPT":
                boolValue = !btc3xopt;
                setBtc3xopt(!btc3xopt);
                break;
            case "BTC3XARB":
                boolValue = !btc3xarb;
                setBtc3xarb(!btc3xarb);
                break;
            case "BTC4XOPT":
                boolValue = !btc4xopt;
                setBtc4xopt(!btc4xopt);
                break;
            case "BTC4XARB":
                boolValue = !btc4xarb;
                setBtc4xarb(!btc4xarb);
                break;
            case "BTCCVRD2XARB":
                boolValue = !btccvrd2xarb;
                setBtccvrd2xarb(!btccvrd2xarb);
                break;
            case "BTC1XPROTECTED":
                boolValue = !btc1xprotected;
                setBtc1xprotected(!btc1xprotected);
                break;
            case "BTC2XPROTECTED":
                boolValue = !btc2xprotected;
                setBtc2xprotected(!btc2xprotected);
                break;
            case "BTC3XPROTECTED":
                boolValue = !btc3xprotected;
                setBtc3xprotected(!btc3xprotected);
                break;
            case "ETH1XPOL":
                boolValue = !eth1xpol;
                setEth1xpol(!eth1xpol);
                break;
            case "ETH1XOPT":
                boolValue = !eth1xopt;
                setEth1xopt(!eth1xopt);
                break;
            case "ETH1XARB":
                boolValue = !eth1xarb;
                setEth1xarb(!eth1xarb);
                break;
            case "STETH2X":
                boolValue = !steth2x;
                setSteth2x(!steth2x);
                break;
            case "ETH2XOPT":
                boolValue = !eth2xopt;
                setEth2xopt(!eth2xopt);
                break;
            case "ETH2XARB":
                boolValue = !eth2xarb;
                setEth2xarb(!eth2xarb);
                break;
            case "ETH3XPOL":
                boolValue = !eth3xpol;
                setEth3xpol(!eth3xpol);
                break;
            case "STETH3X":
                boolValue = !steth3x;
                setSteth3x(!steth3x);
                break;
            case "ETH3XOPT":
                boolValue = !eth3xopt;
                setEth3xopt(!eth3xopt);
                break;
            case "ETH3XARB":
                boolValue = !eth3xarb;
                setEth3xarb(!eth3xarb);
                break;
            case "ETH4XARB":
                boolValue = !eth4xarb;
                setEth4xarb(!eth4xarb);
                break;
            case "STETH4X":
                boolValue = !steth4x;
                setSteth4x(!steth4x);
                break;
            case "SOL1XARB":
                boolValue = !sol1xarb;
                setSol1xarb(!sol1xarb);
                break;
            case "SOL2XOPT":
                boolValue = !sol2xopt;
                setSol2xopt(!sol2xopt);
                break;
            case "SOL3XOPT":
                boolValue = !sol3xopt;
                setSol3xopt(!sol3xopt);
                break;
            case "SOL1XXARB":
                boolValue = !sol1xxarb;
                setSol1xxarb(!sol1xxarb);
                break;
            case "SOL2XARB":
                boolValue = !sol2xarb;
                setSol2xarb(!sol2xarb);
                break;
            case "SOL3XARB":
                boolValue = !sol3xarb;
                setSol3xarb(!sol3xarb);
                break;
            case "SUI2XOPT":
                boolValue = !sui2xopt;
                setSui2xopt(!sui2xopt);
                break;
            case "SUI1XXARB":
                boolValue = !sui1xxarb;
                setSui1xxarb(!sui1xxarb);
                break;
            case "SUI2XARB":
                boolValue = !sui2xarb;
                setSui2xarb(!sui2xarb);
                break;
            case "DOGE2XOPT":
                boolValue = !doge2xopt;
                setDoge2xopt(!doge2xopt);
                break;
            default:
                break;
        }

        if (boolValue) {
            setTorosArray([...torosArray, asset]);
        } else {
            setTorosArray(torosArray.filter(str => str !== asset));
        }
    }

    const spotCheckboxClick = (asset) => {
        let boolValue = false;
        switch (asset) {
            case "btc-1":
                boolValue = !spotBtc;
                setSpotBtc(!spotBtc);
                break;
            case "btc-2":
                boolValue = !spotBtc2;
                setSpotBtc2(!spotBtc2);
                break;
            case "btc-3":
                boolValue = !spotBtc3;
                setSpotBtc3(!spotBtc3);
                break;
            case "btc-4":
                boolValue = !spotBtc4;
                setSpotBtc4(!spotBtc4);
                break;
            case "btc-5":
                boolValue = !spotBtc5;
                setSpotBtc5(!spotBtc5);
                break;
            case "eth-1":
                boolValue = !spotEth;
                setSpotEth(!spotEth);
                break;
            case "eth-2":
                boolValue = !spotEth2;
                setSpotEth2(!spotEth2);
                break;
            case "eth-3":
                boolValue = !spotEth3;
                setSpotEth3(!spotEth3);
                break;
            case "eth-4":
                boolValue = !spotEth4;
                setSpotEth4(!spotEth4);
                break;
            case "eth-5":
                boolValue = !spotEth5;
                setSpotEth5(!spotEth5);
                break;
            case "sol-1":
                boolValue = !spotSol;
                setSpotSol(!spotSol);
                break;
            case "sol-2":
                boolValue = !spotSol2;
                setSpotSol2(!spotSol2);
                break;
            case "sol-3":
                boolValue = !spotSol3;
                setSpotSol3(!spotSol3);
                break;
            case "sol-4":
                boolValue = !spotSol4;
                setSpotSol4(!spotSol4);
                break;
            case "sol-5":
                boolValue = !spotSol5;
                setSpotSol5(!spotSol5);
                break;
            case "sui-1":
                boolValue = !spotSui;
                setSpotSui(!spotSui);
                break;
            case "sui-2":
                boolValue = !spotSui2;
                setSpotSui2(!spotSui2);
                break;
            case "sui-3":
                boolValue = !spotSui3;
                setSpotSui3(!spotSui3);
                break;
            case "sui-4":
                boolValue = !spotSui4;
                setSpotSui4(!spotSui4);
                break;
            case "sui-5":
                boolValue = !spotSui5;
                setSpotSui5(!spotSui5);
                break;
            case "doge-1":
                boolValue = !spotDoge;
                setSpotDoge(!spotDoge);
                break;
            case "doge-2":
                boolValue = !spotDoge2;
                setSpotDoge2(!spotDoge2);
                break;
            case "doge-3":
                boolValue = !spotDoge3;
                setSpotDoge3(!spotDoge3);
                break;
            case "doge-4":
                boolValue = !spotDoge4;
                setSpotDoge4(!spotDoge4);
                break;
            case "doge-5":
                boolValue = !spotDoge5;
                setSpotDoge5(!spotDoge5);
                break;
            default:
                break;
        }

        if (boolValue) {
            setSpotArray([...spotArray, asset]);
        } else {
            setSpotArray(spotArray.filter(str => str !== asset));
        }
    };

    const maxDates = {
        "BTC1L": "2024-05-14",
        "BTC2L": "2024-05-14",
        "BTC3L": "2024-05-24",
        "BTC4L": "2024-05-24",
        "BTC5L": "2024-05-14",
        "BTC7L": "2024-06-25",
        "ETH1L": "2024-05-14",
        "ETH2L": "2024-05-14",
        "ETH3L": "2024-05-24",
        "ETH4L": "2024-05-24",
        "ETH5L": "2024-05-14",
        "ETH7L": "2024-07-11",
        "SOL1L": "2024-05-14",
        "SOL2L": "2024-05-14",
        "SOL3L": "2024-05-24",
        "SOL4L": "2024-05-24",
        "SOL5L": "2024-05-14",
        "DOGE2L": "2024-06-13",
        "DOGE5L": "2024-06-13",
        "ETHBTC2L": "2024-07-30",
        "ETHBTC5L": "2024-07-30",
        "ETHBTC10L": "2024-09-18",
        "SUI2L": "2024-08-16",
        "SUI5L": "2024-08-16",
        "BTC2XOPT": "2023-10-10",
        "BTC3XOPT": "2024-03-13",
        "BTC4XOPT": "2024-06-05",
        "BTC4XARB": "2025-03-19",
        "BTCCVRD2XARB": "2025-03-12",
        "BTC1XPROTECTED": "2025-06-12",
        "BTC2XPROTECTED": "2025-06-12",
        "BTC3XPROTECTED": "2025-06-12",
        "BTC3XPOL": "2023-06-27",
        "BTC2XARB": "2024-07-16",
        "BTC3XARB": "2024-02-22",
        "ETH2XOPT": "2023-10-10",
        "ETH3XOPT": "2024-03-12",
        "ETH3XPOL": "2023-06-27",
        "ETH2XARB": "2024-07-16",
        "ETH3XARB": "2024-02-22",
        "ETH4XARB": "2025-03-19",
        "STETH2X": "2024-06-14",
        "STETH3X": "2024-06-14",
        "STETH4X": "2024-06-14",
        "SOL1XARB": "2025-03-13",
        "SOL2XOPT": "2024-05-27",
        "SOL3XOPT": "2024-05-27",
        "SOL1XXARB": "2025-05-12",
        "SOL2XARB": "2025-03-13",
        "SOL3XARB": "2025-03-13",
        "SUI2XOPT": "2024-11-12",
        "SUI1XXARB": "2025-05-09",
        "SUI2XARB": "2025-04-28",
        "DOGE2XOPT": "2024-11-13",
        "BTC1XPOL": "2024-05-01",
        "BTC1XBASE": "2024-11-13",
        "BTC1XOPT": "2024-05-01",
        "BTC1XARB": "2024-07-16",
        "BTC2XBASE": "2024-11-13",
        "BTC3XBASE": "2024-11-13",
        "ETH1XPOL": "2024-05-01",
        "ETH1XOPT": "2024-05-01",
        "ETH1XARB": "2024-07-16",
        "btc": "2024-05-14",
        "eth": "2024-05-14",
        "sol": "2024-05-14",
        "sui": "2024-05-14",
        "doge": "2024-05-14",
    }

    const fetchData = async () => {
        setLoading(true);

        const arrayPromises = array.map(asset =>
            fetch(domain + "hello/?coin=" + asset + "&granularity=" + granularity + "&granularityUnit=" + granularityUnit + "&fromDate=" + dayjs(fromDate).format("YYYY-MM-DD") + "&toDate=" + getToDateString(asset) + "&initialInvestment=" + initialCapital + "&riskFreeRate=" + riskFreeRate).then(response => response.json())
        );

        const torosArrayPromises = torosArray.map(asset =>
            fetch(domain + "toros/?coin=" + asset + "&interval=" + interval + "&fromDate=" + dayjs(fromDate).format("YYYY-MM-DD") + "&toDate=" + getToDateString(asset) + "&initialInvestment=" + initialCapital + "&riskFreeRate=" + riskFreeRate).then(response => response.json())
        );

        // Fetch BTC Lambda function data

        const spotArrayPromises = spotArray.map(asset =>
            fetch(`${domain}spot?asset=${asset}&fromDate=${dayjs(fromDate).format("YYYY-MM-DD")}&toDate=${dayjs(toDate).format("YYYY-MM-DD")}&initialInvestment=${initialCapital}&riskFreeRate=${riskFreeRate}`).then(response => response.json())
        );
        const results = await Promise.all([...arrayPromises, ...torosArrayPromises, ...spotArrayPromises]);

        const combinedData = results.map((result, index) => ({
                label:
                    index < array.length
                        ? array[index]
                        : index < array.length + torosArray.length
                            ? torosArray[index - array.length]
                            : spotArray[index - array.length - torosArray.length],
            data: result.data,
            borderColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`,
            backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.2)`,
        }));

        const assetMetrics = results.map((result, index) => ({
                label:
                    index < array.length
                        ? array[index]
                        : index < array.length + torosArray.length
                            ? torosArray[index - array.length]
                            : spotArray[index - array.length - torosArray.length],
            volatility: result.volatility,
            sharpe_ratio: result.sharpe_ratio,
            sortino_ratio: result.sortino_ratio,
            omega_ratio: result.omega_ratio,
            simple_omega_ratio: result.simple_omega_ratio
        }));

        setDatasets(combinedData);
        setMetrics(assetMetrics);
        setLoading(false);
    };

    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

    const downloadData = async () => {
        try {
            setLoading(true);
            const arrayPromises = array.map(asset =>
                fetch(domain + "tlx-export/?coin=" + asset + "&granularity=" + granularity + "&granularityUnit=" + granularityUnit + "&fromDate=" + dayjs(fromDate).format("YYYY-MM-DD") + "&toDate=" + getToDateString(asset) + "&initialInvestment=" + initialCapital + "&riskFreeRate=" + riskFreeRate, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'text/csv'
                    }
                }).then(response => response.blob())
            );

            const torosArrayPromises = torosArray.map(asset =>
                fetch(domain + "toros-export/?coin=" + asset + "&interval=" + interval + "&fromDate=" + dayjs(fromDate).format("YYYY-MM-DD") + "&toDate=" + getToDateString(asset) + "&initialInvestment=" + initialCapital + "&riskFreeRate=" + riskFreeRate, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'text/csv'
                    }
                }).then(response => response.blob())
            );

            const results = await Promise.all([...arrayPromises, ...torosArrayPromises]);

            for (let i = 0; i < results.length; i++) {
                const blob = results[i];
                const index = results.indexOf(blob);
                // Create a link element
                const link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = index < array.length ? `${array[index]}-${dayjs(fromDate).format("YYYY-MM-DD")}-${interval}.csv` : `${torosArray[index - array.length]}-${dayjs(fromDate).format("YYYY-MM-DD")}-${interval}.csv`;

                // Append the link to the body
                document.body.appendChild(link);

                // Programmatically click the link to trigger the download
                link.click();

                // Remove the link from the document
                document.body.removeChild(link);
                await delay(150);
            }
            setLoading(false);
        } catch (error) {
            console.error('Error downloading CSV files:', error);
            setLoading(false);
        }
    };


    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const onSearch = () => {
        fetchData();
    }

    const onExport = () => {
        downloadData();
    }

    const handleIntervalChange = (event) => {
        let value = event.target.value;
        setInterval(value);
    }

    const maxOfTwoDays = (date1, date2) => {
        const dateObject1 = new Date(date1);
        const dateObject2 = new Date(date2);

        return dateObject1.getTime() > dateObject2.getTime() ? date1 : date2;
    }

    const getToDateString = (asset) => {
        const assetDateString = maxDates[asset];
        const toDateString = dayjs(toDate).format("YYYY-MM-DD");

        return maxOfTwoDays(assetDateString, toDateString);
    }

    useEffect(() => {
        switch (interval) {
            case "1h":
                setGranularity("HOURS");
                setGranularityUnit(1);
                break;
            case "4h":
                setGranularity("HOURS");
                setGranularityUnit(4);
                break;
            case "1d":
                setGranularity("DAYS");
                setGranularityUnit(1);
                break;
            case "1w":
                setGranularity("DAYS");
                setGranularityUnit(7);
                break;
            default:
                break;
        }
    }, [interval]);

    const snowflake = document.createElement('img');
    snowflake.src = '/snowflake.png';

    // Helper component for asset selection with improved styling
    const AssetCheckbox = ({ checked, onChange, icon, networkIcon, label, disabled = false }) => (
        <FormControlLabel
            control={
                <Checkbox
                    checked={checked}
                    onChange={onChange}
                    disabled={disabled}
                    sx={{
                        '&.Mui-checked': {
                            color: theme.palette.primary.main,
                        }
                    }}
                />
            }
            label={
                <Box display="flex" alignItems="center" gap={1}>
                    <Box position="relative">
                        <img
                            style={{ height: '28px', width: '28px', borderRadius: networkIcon ? '50%' : '4px' }}
                            src={icon}
                            alt="coin"
                        />
                        {networkIcon && (
                            <img
                                style={{
                                    height: '14px',
                                    width: '14px',
                                    position: 'absolute',
                                    top: -2,
                                    right: -2,
                                    borderRadius: '50%',
                                    border: '1px solid white'
                                }}
                                src={networkIcon}
                                alt="network"
                            />
                        )}
                    </Box>
                    <Typography variant="body2" fontWeight={500}>
                        {label}
                    </Typography>
                </Box>
            }
            sx={{
                margin: 0,
                '& .MuiFormControlLabel-label': {
                    fontSize: '0.875rem'
                }
            }}
        />
    );

    return (
        <Box sx={{ 
            minHeight: '100vh',
            background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.02)} 0%, ${alpha(theme.palette.secondary.main, 0.02)} 100%)`,
        }}>
            <Container maxWidth="xl" sx={{ py: 4 }}>
                {/* Header Section */}
                <Paper
                    elevation={3}
                    sx={{
                        p: 4,
                        mb: 4,
                        borderRadius: 3,
                        background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${alpha(theme.palette.primary.main, 0.02)} 100%)`,
                        border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
                    }}
                >
                    <Box display="flex" alignItems="center" mb={2}>
                        <TrendingUpIcon sx={{ fontSize: 40, color: theme.palette.primary.main, mr: 2 }} />
                        <Box>
                            <Typography variant="h3" component="h1" fontWeight={700} color="primary">
                                Toros Performance Analysis
                            </Typography>
                            <Typography variant="h6" color="text.secondary" sx={{ mt: 1 }}>
                                Advanced leveraged token performance metrics and analytics
                            </Typography>
                        </Box>
                    </Box>
                    
                    <Box display="flex" gap={1} flexWrap="wrap">
                        <Chip 
                            icon={<AnalyticsIcon />} 
                            label="Performance Analytics" 
                            color="primary" 
                            variant="outlined" 
                        />
                        <Chip 
                            label="Real-time Data" 
                            color="success" 
                            variant="outlined" 
                        />
                        <Chip 
                            label="Risk Metrics" 
                            color="warning" 
                            variant="outlined" 
                        />
                    </Box>
                </Paper>

                {/* Controls Section */}
                <Paper
                    elevation={2}
                    sx={{
                        p: 3,
                        mb: 4,
                        borderRadius: 2,
                        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`
                    }}
                >
                    <Typography variant="h5" fontWeight={600} mb={3} color="text.primary">
                        Analysis Parameters
                    </Typography>

                    <Grid container spacing={3} mb={4}>
                        {/* Date and Settings Controls */}
                        <Grid item xs={12} md={6}>
                            <Card variant="outlined" sx={{ p: 2, height: '100%' }}>
                                <Typography variant="h6" fontWeight={600} mb={2} color="primary">
                                    Time Range & Settings
                                </Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth size="small">
                                            <InputLabel>Interval</InputLabel>
                                            <Select
                                                value={interval}
                                                label="Interval"
                                                onChange={handleIntervalChange}
                                                disabled={loading}
                                            >
                                                <MenuItem value="1h">1 Hour</MenuItem>
                                                <MenuItem value="4h">4 Hours</MenuItem>
                                                <MenuItem value="1d">1 Day</MenuItem>
                                                <MenuItem value="1w">1 Week</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="Initial Capital"
                                            type="number"
                                            value={initialCapital}
                                            onChange={(e) => setInitialCapital(e.target.value)}
                                            disabled={loading}
                                            fullWidth
                                            size="small"
                                            InputProps={{ inputProps: { min: 1 } }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker
                                                label="Start Date"
                                                value={fromDate}
                                                onChange={(newValue) => setFromDate(newValue)}
                                                disabled={loading}
                                                maxDate={toDate}
                                                slotProps={{
                                                    textField: {
                                                        fullWidth: true,
                                                        size: 'small'
                                                    }
                                                }}
                                            />
                                        </LocalizationProvider>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker
                                                label="End Date"
                                                value={toDate}
                                                onChange={(newValue) => setToDate(newValue)}
                                                disabled={loading}
                                                minDate={fromDate}
                                                slotProps={{
                                                    textField: {
                                                        fullWidth: true,
                                                        size: 'small'
                                                    }
                                                }}
                                            />
                                        </LocalizationProvider>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            label="Risk Free Rate (%)"
                                            type="number"
                                            value={riskFreeRate}
                                            onChange={(e) => setRiskFreeRate(e.target.value)}
                                            disabled={loading}
                                            fullWidth
                                            size="small"
                                            InputProps={{ inputProps: { min: 0, max: 100 } }}
                                        />
                                    </Grid>
                                </Grid>
                            </Card>
                        </Grid>

                        {/* Action Buttons */}
                        <Grid item xs={12} md={6}>
                            <Card variant="outlined" sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                <Typography variant="h6" fontWeight={600} mb={2} color="primary">
                                    Actions
                                </Typography>
                                <Box display="flex" flexDirection="column" gap={2}>
                                    <Button
                                        onClick={onSearch}
                                        variant="contained"
                                        disabled={loading || (array.length === 0 && torosArray.length === 0 && spotArray.length === 0)}
                                        startIcon={loading ? <CircularProgress size={20} /> : <SearchIcon />}
                                        size="large"
                                        sx={{
                                            py: 1.5,
                                            borderRadius: 2,
                                            fontWeight: 600,
                                            boxShadow: theme.shadows[4],
                                            '&:hover': {
                                                boxShadow: theme.shadows[8],
                                            }
                                        }}
                                    >
                                        {loading ? 'Analyzing...' : 'Fetch Data'}
                                    </Button>
                                    
                                    <Button
                                        onClick={onExport}
                                        variant="outlined"
                                        disabled={loading || (array.length === 0 && torosArray.length === 0 && spotArray.length === 0)}
                                        startIcon={<GetAppIcon />}
                                        size="large"
                                        sx={{
                                            py: 1.5,
                                            borderRadius: 2,
                                            fontWeight: 600,
                                        }}
                                    >
                                        Export CSV
                                    </Button>
                                </Box>
                            </Card>
                        </Grid>
                    </Grid>

                    {/* Asset Selection */}
                    <Card variant="outlined" sx={{ p: 3 }}>
                        <Box display="flex" alignItems="center" mb={3}>
                            <img
                                style={{ height: '32px', marginRight: '12px', borderRadius: '8px' }}
                                src="https://d2l35o8v06vi7z.cloudfront.net/fiji/toros.jpg"
                                alt="Toros"
                            />
                            <Typography variant="h5" fontWeight={600} color="primary">
                                Toros Coins
                            </Typography>
                        </Box>

                        <Grid container spacing={2}>
                            {/* BTC Bear Tokens */}
                            <Grid item xs={12} sm={6} md={4}>
                                <Card variant="outlined" sx={{ p: 2, height: '100%', bgcolor: alpha(theme.palette.error.main, 0.02) }}>
                                    <Typography variant="subtitle1" fontWeight={600} mb={2} color="error.main">
                                        BTC Bear Tokens
                                    </Typography>
                                    <Box display="flex" flexDirection="column" gap={1}>
                                        <AssetCheckbox
                                            checked={btc1xbase}
                                            onChange={() => torosCheckboxClick("BTC1XBASE")}
                                            icon="https://d2l35o8v06vi7z.cloudfront.net/bitcoin.webp"
                                            networkIcon="https://toros.finance/icons/base-network.svg"
                                            label="BTC1XBASE BEAR"
                                            disabled={loading}
                                        />
                                        <AssetCheckbox
                                            checked={btc1xopt}
                                            onChange={() => torosCheckboxClick("BTC1XOPT")}
                                            icon="https://d2l35o8v06vi7z.cloudfront.net/bitcoin.webp"
                                            networkIcon="https://toros.finance/icons/optimism-network.svg"
                                            label="BTC1XOPT BEAR"
                                            disabled={loading}
                                        />
                                        <AssetCheckbox
                                            checked={btc1xarb}
                                            onChange={() => torosCheckboxClick("BTC1XARB")}
                                            icon="https://d2l35o8v06vi7z.cloudfront.net/bitcoin.webp"
                                            networkIcon="https://toros.finance/icons/arbitrum-network.svg"
                                            label="BTC1XARB BEAR"
                                            disabled={loading}
                                        />
                                    </Box>
                                </Card>
                            </Grid>

                            {/* BTC Bull Tokens */}
                            <Grid item xs={12} sm={6} md={4}>
                                <Card variant="outlined" sx={{ p: 2, height: '100%', bgcolor: alpha(theme.palette.success.main, 0.02) }}>
                                    <Typography variant="subtitle1" fontWeight={600} mb={2} color="success.main">
                                        BTC Bull Tokens
                                    </Typography>
                                    <Box display="flex" flexDirection="column" gap={1}>
                                        <AssetCheckbox
                                            checked={btc3xpol}
                                            onChange={() => torosCheckboxClick("BTC3XPOL")}
                                            icon="https://d2l35o8v06vi7z.cloudfront.net/bitcoin.webp"
                                            networkIcon="https://toros.finance/icons/polygon-network.svg"
                                            label="BTC3XPOL"
                                            disabled={loading}
                                        />
                                        <AssetCheckbox
                                            checked={btc2xbase}
                                            onChange={() => torosCheckboxClick("BTC2XBASE")}
                                            icon="https://d2l35o8v06vi7z.cloudfront.net/bitcoin.webp"
                                            networkIcon="https://toros.finance/icons/base-network.svg"
                                            label="BTC2XBASE"
                                            disabled={loading}
                                        />
                                        <AssetCheckbox
                                            checked={btc3xbase}
                                            onChange={() => torosCheckboxClick("BTC3XBASE")}
                                            icon="https://d2l35o8v06vi7z.cloudfront.net/bitcoin.webp"
                                            networkIcon="https://toros.finance/icons/base-network.svg"
                                            label="BTC3XBASE"
                                            disabled={loading}
                                        />
                                        <AssetCheckbox
                                            checked={btc2xopt}
                                            onChange={() => torosCheckboxClick("BTC2XOPT")}
                                            icon="https://d2l35o8v06vi7z.cloudfront.net/bitcoin.webp"
                                            networkIcon="https://toros.finance/icons/optimism-network.svg"
                                            label="BTC2XOPT"
                                            disabled={loading}
                                        />
                                        <AssetCheckbox
                                            checked={btc3xopt}
                                            onChange={() => torosCheckboxClick("BTC3XOPT")}
                                            icon="https://d2l35o8v06vi7z.cloudfront.net/bitcoin.webp"
                                            networkIcon="https://toros.finance/icons/optimism-network.svg"
                                            label="BTC3XOPT"
                                            disabled={loading}
                                        />
                                        <AssetCheckbox
                                            checked={btc4xopt}
                                            onChange={() => torosCheckboxClick("BTC4XOPT")}
                                            icon="https://d2l35o8v06vi7z.cloudfront.net/bitcoin.webp"
                                            networkIcon="https://toros.finance/icons/optimism-network.svg"
                                            label="BTC4XOPT"
                                            disabled={loading}
                                        />
                                        <AssetCheckbox
                                            checked={btc2xarb}
                                            onChange={() => torosCheckboxClick("BTC2XARB")}
                                            icon="https://d2l35o8v06vi7z.cloudfront.net/bitcoin.webp"
                                            networkIcon="https://toros.finance/icons/arbitrum-network.svg"
                                            label="BTC2XARB"
                                            disabled={loading}
                                        />
                                        <AssetCheckbox
                                            checked={btc3xarb}
                                            onChange={() => torosCheckboxClick("BTC3XARB")}
                                            icon="https://d2l35o8v06vi7z.cloudfront.net/bitcoin.webp"
                                            networkIcon="https://toros.finance/icons/arbitrum-network.svg"
                                            label="BTC3XARB"
                                            disabled={loading}
                                        />
                                        <AssetCheckbox
                                            checked={btc4xarb}
                                            onChange={() => torosCheckboxClick("BTC4XARB")}
                                            icon="https://d2l35o8v06vi7z.cloudfront.net/bitcoin.webp"
                                            networkIcon="https://toros.finance/icons/arbitrum-network.svg"
                                            label="BTC4XARB"
                                            disabled={loading}
                                        />
                                    </Box>
                                </Card>
                            </Grid>

                            {/* BTC Protected */}
                            <Grid item xs={12} sm={6} md={4}>
                                <Card variant="outlined" sx={{ p: 2, height: '100%', bgcolor: alpha(theme.palette.info.main, 0.02) }}>
                                    <Typography variant="subtitle1" fontWeight={600} mb={2} color="info.main">
                                        BTC Protected
                                    </Typography>
                                    <Box display="flex" flexDirection="column" gap={1}>
                                        <AssetCheckbox
                                            checked={btc1xprotected}
                                            onChange={() => torosCheckboxClick("BTC1XPROTECTED")}
                                            icon="https://d2l35o8v06vi7z.cloudfront.net/bitcoin.webp"
                                            networkIcon="https://toros.finance/icons/arbitrum-network.svg"
                                            label="BTC Protected 1X"
                                            disabled={loading}
                                        />
                                        <AssetCheckbox
                                            checked={btc2xprotected}
                                            onChange={() => torosCheckboxClick("BTC2XPROTECTED")}
                                            icon="https://d2l35o8v06vi7z.cloudfront.net/bitcoin.webp"
                                            networkIcon="https://toros.finance/icons/arbitrum-network.svg"
                                            label="BTC Protected 2X"
                                            disabled={loading}
                                        />
                                        <AssetCheckbox
                                            checked={btc3xprotected}
                                            onChange={() => torosCheckboxClick("BTC3XPROTECTED")}
                                            icon="https://d2l35o8v06vi7z.cloudfront.net/bitcoin.webp"
                                            networkIcon="https://toros.finance/icons/arbitrum-network.svg"
                                            label="BTC Protected 3X"
                                            disabled={loading}
                                        />
                                    </Box>
                                    <Box mt={2} p={2} sx={{ bgcolor: alpha(theme.palette.info.main, 0.05), borderRadius: 1 }}>
                                        <Typography variant="caption" color="text.secondary" display="block" mb={1}>
                                            Read more about
                                        </Typography>
                                        <Button
                                            href="https://x.com/torosfinance/status/1948284944880730309"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            size="small"
                                            variant="text"
                                            sx={{ p: 0, minWidth: 'auto', textTransform: 'none' }}
                                        >
                                            Protected Leverage Vaults
                                        </Button>
                                    </Box>
                                </Card>
                            </Grid>

                            {/* ETH Tokens */}
                            <Grid item xs={12} sm={6} md={4}>
                                <Card variant="outlined" sx={{ p: 2, height: '100%', bgcolor: alpha(theme.palette.secondary.main, 0.02) }}>
                                    <Typography variant="subtitle1" fontWeight={600} mb={2} color="secondary.main">
                                        ETH Tokens
                                    </Typography>
                                    <Box display="flex" flexDirection="column" gap={1}>
                                        <AssetCheckbox
                                            checked={eth1xopt}
                                            onChange={() => torosCheckboxClick("ETH1XOPT")}
                                            icon="https://d2l35o8v06vi7z.cloudfront.net/fiji/ethereum.png"
                                            networkIcon="https://toros.finance/icons/optimism-network.svg"
                                            label="ETH1XOPT BEAR"
                                            disabled={loading}
                                        />
                                        <AssetCheckbox
                                            checked={eth1xarb}
                                            onChange={() => torosCheckboxClick("ETH1XARB")}
                                            icon="https://d2l35o8v06vi7z.cloudfront.net/fiji/ethereum.png"
                                            networkIcon="https://toros.finance/icons/arbitrum-network.svg"
                                            label="ETH1XARB BEAR"
                                            disabled={loading}
                                        />
                                        <AssetCheckbox
                                            checked={eth3xpol}
                                            onChange={() => torosCheckboxClick("ETH3XPOL")}
                                            icon="https://d2l35o8v06vi7z.cloudfront.net/fiji/ethereum.png"
                                            networkIcon="https://toros.finance/icons/polygon-network.svg"
                                            label="ETH3XPOL"
                                            disabled={loading}
                                        />
                                        <AssetCheckbox
                                            checked={steth2x}
                                            onChange={() => torosCheckboxClick("STETH2X")}
                                            icon="https://d2l35o8v06vi7z.cloudfront.net/fiji/ethereum.png"
                                            networkIcon="https://toros.finance/icons/base-network.svg"
                                            label="STETH2X"
                                            disabled={loading}
                                        />
                                        <AssetCheckbox
                                            checked={steth3x}
                                            onChange={() => torosCheckboxClick("STETH3X")}
                                            icon="https://d2l35o8v06vi7z.cloudfront.net/fiji/ethereum.png"
                                            networkIcon="https://toros.finance/icons/base-network.svg"
                                            label="STETH3X"
                                            disabled={loading}
                                        />
                                        <AssetCheckbox
                                            checked={steth4x}
                                            onChange={() => torosCheckboxClick("STETH4X")}
                                            icon="https://d2l35o8v06vi7z.cloudfront.net/fiji/ethereum.png"
                                            networkIcon="https://toros.finance/icons/base-network.svg"
                                            label="STETH4X"
                                            disabled={loading}
                                        />
                                        <AssetCheckbox
                                            checked={eth2xopt}
                                            onChange={() => torosCheckboxClick("ETH2XOPT")}
                                            icon="https://d2l35o8v06vi7z.cloudfront.net/fiji/ethereum.png"
                                            networkIcon="https://toros.finance/icons/optimism-network.svg"
                                            label="ETH2XOPT"
                                            disabled={loading}
                                        />
                                        <AssetCheckbox
                                            checked={eth3xopt}
                                            onChange={() => torosCheckboxClick("ETH3XOPT")}
                                            icon="https://d2l35o8v06vi7z.cloudfront.net/fiji/ethereum.png"
                                            networkIcon="https://toros.finance/icons/optimism-network.svg"
                                            label="ETH3XOPT"
                                            disabled={loading}
                                        />
                                        <AssetCheckbox
                                            checked={eth2xarb}
                                            onChange={() => torosCheckboxClick("ETH2XARB")}
                                            icon="https://d2l35o8v06vi7z.cloudfront.net/fiji/ethereum.png"
                                            networkIcon="https://toros.finance/icons/arbitrum-network.svg"
                                            label="ETH2XARB"
                                            disabled={loading}
                                        />
                                        <AssetCheckbox
                                            checked={eth3xarb}
                                            onChange={() => torosCheckboxClick("ETH3XARB")}
                                            icon="https://d2l35o8v06vi7z.cloudfront.net/fiji/ethereum.png"
                                            networkIcon="https://toros.finance/icons/arbitrum-network.svg"
                                            label="ETH3XARB"
                                            disabled={loading}
                                        />
                                        <AssetCheckbox
                                            checked={eth4xarb}
                                            onChange={() => torosCheckboxClick("ETH4XARB")}
                                            icon="https://d2l35o8v06vi7z.cloudfront.net/fiji/ethereum.png"
                                            networkIcon="https://toros.finance/icons/arbitrum-network.svg"
                                            label="ETH4XARB"
                                            disabled={loading}
                                        />
                                    </Box>
                                </Card>
                            </Grid>

                            {/* SOL Tokens */}
                            <Grid item xs={12} sm={6} md={4}>
                                <Card variant="outlined" sx={{ p: 2, height: '100%', bgcolor: alpha(theme.palette.warning.main, 0.02) }}>
                                    <Typography variant="subtitle1" fontWeight={600} mb={2} color="warning.main">
                                        SOL Tokens
                                    </Typography>
                                    <Box display="flex" flexDirection="column" gap={1}>
                                        <AssetCheckbox
                                            checked={sol1xarb}
                                            onChange={() => torosCheckboxClick("SOL1XARB")}
                                            icon="https://d2l35o8v06vi7z.cloudfront.net/SOL.webp"
                                            networkIcon="https://toros.finance/icons/arbitrum-network.svg"
                                            label="SOL1XARB BEAR"
                                            disabled={loading}
                                        />
                                        <AssetCheckbox
                                            checked={sol1xxarb}
                                            onChange={() => torosCheckboxClick("SOL1XXARB")}
                                            icon="https://d2l35o8v06vi7z.cloudfront.net/SOL.webp"
                                            networkIcon="https://toros.finance/icons/arbitrum-network.svg"
                                            label="SOL1XARB"
                                            disabled={loading}
                                        />
                                        <AssetCheckbox
                                            checked={sol2xarb}
                                            onChange={() => torosCheckboxClick("SOL2XARB")}
                                            icon="https://d2l35o8v06vi7z.cloudfront.net/SOL.webp"
                                            networkIcon="https://toros.finance/icons/arbitrum-network.svg"
                                            label="SOL2XARB"
                                            disabled={loading}
                                        />
                                        <AssetCheckbox
                                            checked={sol3xarb}
                                            onChange={() => torosCheckboxClick("SOL3XARB")}
                                            icon="https://d2l35o8v06vi7z.cloudfront.net/SOL.webp"
                                            networkIcon="https://toros.finance/icons/arbitrum-network.svg"
                                            label="SOL3XARB"
                                            disabled={loading}
                                        />
                                    </Box>
                                </Card>
                            </Grid>

                            {/* SUI Tokens */}
                            <Grid item xs={12} sm={6} md={4}>
                                <Card variant="outlined" sx={{ p: 2, height: '100%', bgcolor: alpha(theme.palette.info.main, 0.02) }}>
                                    <Typography variant="subtitle1" fontWeight={600} mb={2} color="info.main">
                                        SUI Tokens
                                    </Typography>
                                    <Box display="flex" flexDirection="column" gap={1}>
                                        <AssetCheckbox
                                            checked={sui1xxarb}
                                            onChange={() => torosCheckboxClick("SUI1XXARB")}
                                            icon="https://d2l35o8v06vi7z.cloudfront.net/fiji/sui.png"
                                            networkIcon="https://toros.finance/icons/optimism-network.svg"
                                            label="SUI1XARB"
                                            disabled={loading}
                                        />
                                        <AssetCheckbox
                                            checked={sui2xarb}
                                            onChange={() => torosCheckboxClick("SUI2XARB")}
                                            icon="https://d2l35o8v06vi7z.cloudfront.net/fiji/sui.png"
                                            networkIcon="https://toros.finance/icons/optimism-network.svg"
                                            label="SUI2XARB"
                                            disabled={loading}
                                        />
                                    </Box>
                                </Card>
                            </Grid>
                        </Grid>
                    </Card>

                    <Divider sx={{ my: 4 }} />

                    {/* Spot and No-Fee Perps Section */}
                    <Card variant="outlined" sx={{ p: 3 }}>
                        <Typography variant="h5" fontWeight={600} mb={3} color="primary">
                            Spot and No-Fee Perps
                        </Typography>

                        <Grid container spacing={2}>
                            {[
                                { 
                                    title: 'BTC', 
                                    icon: 'https://d2l35o8v06vi7z.cloudfront.net/bitcoin.webp',
                                    assets: [
                                        { checked: spotBtc, onChange: () => spotCheckboxClick("btc-1"), label: 'BTC' },
                                        { checked: spotBtc2, onChange: () => spotCheckboxClick("btc-2"), label: 'BTC2X' },
                                        { checked: spotBtc3, onChange: () => spotCheckboxClick("btc-3"), label: 'BTC3X' },
                                        { checked: spotBtc4, onChange: () => spotCheckboxClick("btc-4"), label: 'BTC4X' },
                                        { checked: spotBtc5, onChange: () => spotCheckboxClick("btc-5"), label: 'BTC5X' },
                                    ]
                                },
                                { 
                                    title: 'ETH', 
                                    icon: 'https://d2l35o8v06vi7z.cloudfront.net/fiji/ethereum.png',
                                    assets: [
                                        { checked: spotEth, onChange: () => spotCheckboxClick("eth-1"), label: 'ETH' },
                                        { checked: spotEth2, onChange: () => spotCheckboxClick("eth-2"), label: 'ETH2X' },
                                        { checked: spotEth3, onChange: () => spotCheckboxClick("eth-3"), label: 'ETH3X' },
                                        { checked: spotEth4, onChange: () => spotCheckboxClick("eth-4"), label: 'ETH4X' },
                                        { checked: spotEth5, onChange: () => spotCheckboxClick("eth-5"), label: 'ETH5X' },
                                    ]
                                },
                                { 
                                    title: 'SOL', 
                                    icon: 'https://d2l35o8v06vi7z.cloudfront.net/SOL.webp',
                                    assets: [
                                        { checked: spotSol, onChange: () => spotCheckboxClick("sol-1"), label: 'SOL' },
                                        { checked: spotSol2, onChange: () => spotCheckboxClick("sol-2"), label: 'SOL2X' },
                                        { checked: spotSol3, onChange: () => spotCheckboxClick("sol-3"), label: 'SOL3X' },
                                        { checked: spotSol4, onChange: () => spotCheckboxClick("sol-4"), label: 'SOL4X' },
                                        { checked: spotSol5, onChange: () => spotCheckboxClick("sol-5"), label: 'SOL5X' },
                                    ]
                                },
                                { 
                                    title: 'SUI', 
                                    icon: 'https://d2l35o8v06vi7z.cloudfront.net/fiji/sui.png',
                                    assets: [
                                        { checked: spotSui, onChange: () => spotCheckboxClick("sui-1"), label: 'SUI' },
                                        { checked: spotSui2, onChange: () => spotCheckboxClick("sui-2"), label: 'SUI2X' },
                                        { checked: spotSui3, onChange: () => spotCheckboxClick("sui-3"), label: 'SUI3X' },
                                        { checked: spotSui4, onChange: () => spotCheckboxClick("sui-4"), label: 'SUI4X' },
                                        { checked: spotSui5, onChange: () => spotCheckboxClick("sui-5"), label: 'SUI5X' },
                                    ]
                                },
                                { 
                                    title: 'DOGE', 
                                    icon: 'https://d2l35o8v06vi7z.cloudfront.net/fiji/dogecoin.png',
                                    assets: [
                                        { checked: spotDoge, onChange: () => spotCheckboxClick("doge-1"), label: 'DOGE' },
                                        { checked: spotDoge2, onChange: () => spotCheckboxClick("doge-2"), label: 'DOGE2X' },
                                        { checked: spotDoge3, onChange: () => spotCheckboxClick("doge-3"), label: 'DOGE3X' },
                                        { checked: spotDoge4, onChange: () => spotCheckboxClick("doge-4"), label: 'DOGE4X' },
                                        { checked: spotDoge5, onChange: () => spotCheckboxClick("doge-5"), label: 'DOGE5X' },
                                    ]
                                },
                            ].map((category, index) => (
                                <Grid item xs={12} sm={6} md={4} lg={2.4} key={index}>
                                    <Card variant="outlined" sx={{ p: 2, height: '100%' }}>
                                        <Box display="flex" alignItems="center" mb={2}>
                                            <img
                                                style={{ height: '24px', width: '24px', marginRight: '8px', borderRadius: '50%' }}
                                                src={category.icon}
                                                alt={category.title}
                                            />
                                            <Typography variant="subtitle1" fontWeight={600}>
                                                {category.title}
                                            </Typography>
                                        </Box>
                                        <Box display="flex" flexDirection="column" gap={1}>
                                            {category.assets.map((asset, assetIndex) => (
                                                <AssetCheckbox
                                                    key={assetIndex}
                                                    checked={asset.checked}
                                                    onChange={asset.onChange}
                                                    icon={category.icon}
                                                    label={asset.label}
                                                    disabled={loading}
                                                />
                                            ))}
                                        </Box>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Card>
                </Paper>

                {/* Results Section */}
                {datasets.length > 0 && (
                    <>
                        {/* Chart Size Controls */}
                        <Paper
                            elevation={1}
                            sx={{
                                p: 2,
                                mb: 3,
                                borderRadius: 2,
                                background: alpha(theme.palette.background.paper, 0.8)
                            }}
                        >
                            <Box display="flex" alignItems="center" justifyContent="center" gap={2}>
                                <Typography variant="h6" fontWeight={600} color="text.primary">
                                    Chart Layout
                                </Typography>
                                <Tabs value={tabValue} onChange={handleTabChange}>
                                    <Tab 
                                        icon={<ViewAgendaOutlinedIcon />} 
                                        value="1" 
                                        label="Single Column"
                                        sx={{ minHeight: 48 }}
                                    />
                                    <Tab 
                                        icon={<ViewQuiltOutlinedIcon />} 
                                        value="1.3" 
                                        label="Compact"
                                        sx={{ minHeight: 48 }}
                                    />
                                    <Tab 
                                        icon={<GridViewOutlinedIcon />} 
                                        value="2" 
                                        label="Two Columns"
                                        sx={{ minHeight: 48 }}
                                    />
                                </Tabs>
                            </Box>
                        </Paper>

                        {/* Charts Grid */}
                        <Grid container spacing={3}>
                            <Grid item xs={12 / parseFloat(tabValue)}>
                                <Paper elevation={2} sx={{ borderRadius: 2, overflow: 'hidden' }}>
                                    <CryptoChart 
                                        datasets={datasets} 
                                        title="Price" 
                                        metric="price"
                                        showDatesOnly={granularity === "DAYS"}
                                    />
                                </Paper>
                            </Grid>

                            <Grid item xs={12 / parseFloat(tabValue)}>
                                <Paper elevation={2} sx={{ borderRadius: 2, overflow: 'hidden' }}>
                                    <CryptoChart 
                                        datasets={datasets} 
                                        title="Returns" 
                                        metric="returns"
                                        showDatesOnly={granularity === "DAYS"}
                                    />
                                </Paper>
                            </Grid>

                            <Grid item xs={12 / parseFloat(tabValue)}>
                                <Paper elevation={2} sx={{ borderRadius: 2, overflow: 'hidden' }}>
                                    <CryptoChart 
                                        datasets={datasets} 
                                        title="Investment Value" 
                                        metric="investment-value"
                                        showDatesOnly={granularity === "DAYS"}
                                    />
                                </Paper>
                            </Grid>

                            <Grid item xs={12 / parseFloat(tabValue)}>
                                <Paper elevation={2} sx={{ borderRadius: 2, overflow: 'hidden' }}>
                                    <BarChart metrics={metrics} title="Volatility" metric="volatility"/>
                                </Paper>
                            </Grid>

                            <Grid item xs={12 / parseFloat(tabValue)}>
                                <Paper elevation={2} sx={{ borderRadius: 2, overflow: 'hidden' }}>
                                    <BarChart metrics={metrics} title="Sharpe Ratio" metric="sharpe_ratio"/>
                                </Paper>
                            </Grid>

                            <Grid item xs={12 / parseFloat(tabValue)}>
                                <Paper elevation={2} sx={{ borderRadius: 2, overflow: 'hidden' }}>
                                    <BarChart metrics={metrics} title="Sortino Ratio" metric="sortino_ratio"/>
                                </Paper>
                            </Grid>

                            <Grid item xs={12 / parseFloat(tabValue)}>
                                <Paper elevation={2} sx={{ borderRadius: 2, overflow: 'hidden' }}>
                                    <BarChart metrics={metrics} title="CDF-based Omega Ratio" metric="omega_ratio"/>
                                    <Box p={2}>
                                        <Typography variant="body2" color="text.secondary">
                                            This chart displays the Omega ratio calculated using probability-weighted gains and losses
                                            derived from the Cumulative Distribution Function (CDF) of the returns.
                                        </Typography>
                                    </Box>
                                </Paper>
                            </Grid>

                            <Grid item xs={12 / parseFloat(tabValue)}>
                                <Paper elevation={2} sx={{ borderRadius: 2, overflow: 'hidden' }}>
                                    <BarChart metrics={metrics} title="Simple Sum-Based Omega Ratio" metric="simple_omega_ratio"/>
                                    <Box p={2}>
                                        <Typography variant="body2" color="text.secondary">
                                            This chart shows the Omega ratio calculated using the straightforward sum of gains and absolute
                                            sum of losses without considering probability weights.
                                        </Typography>
                                    </Box>
                                </Paper>
                            </Grid>
                        </Grid>

                        {/* Source Code Link */}
                        <Paper elevation={1} sx={{ p: 3, mt: 4, borderRadius: 2 }}>
                            <Typography variant="body1" color="text.secondary" mb={1}>
                                You can view my backend source code for more info on how I perform the calculations here:
                            </Typography>
                            <Button
                                href="https://github.com/fiji-solutions/tlx/blob/main/hello_world/app.py"
                                target="_blank"
                                rel="noopener noreferrer"
                                variant="outlined"
                                size="small"
                            >
                                View Source Code
                            </Button>
                        </Paper>
                    </>
                )}

                {/* Loading State */}
                {loading && (
                    <Paper
                        elevation={2}
                        sx={{
                            p: 6,
                            textAlign: 'center',
                            borderRadius: 2,
                            background: alpha(theme.palette.background.paper, 0.9)
                        }}
                    >
                        <CircularProgress size={60} sx={{ mb: 2 }} />
                        <Typography variant="h6" color="text.secondary">
                            Analyzing performance data...
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                            This may take a few moments
                        </Typography>
                    </Paper>
                )}

                {/* Empty State */}
                {!loading && datasets.length === 0 && (
                    <Paper
                        elevation={1}
                        sx={{
                            p: 6,
                            textAlign: 'center',
                            borderRadius: 2,
                            background: alpha(theme.palette.background.paper, 0.5),
                            border: `2px dashed ${alpha(theme.palette.primary.main, 0.2)}`
                        }}
                    >
                        <TrendingUpIcon sx={{ fontSize: 80, color: alpha(theme.palette.primary.main, 0.3), mb: 2 }} />
                        <Typography variant="h5" fontWeight={600} color="text.primary" mb={1}>
                            Ready to Analyze
                        </Typography>
                        <Typography variant="body1" color="text.secondary" mb={3}>
                            Select your assets and configure your parameters, then click "Fetch Data" to get started
                        </Typography>
                        <Button
                            variant="contained"
                            onClick={onSearch}
                            disabled={array.length === 0 && torosArray.length === 0 && spotArray.length === 0}
                            startIcon={<SearchIcon />}
                            size="large"
                        >
                            Start Analysis
                        </Button>
                    </Paper>
                )}
            </Container>
        </Box>
    );
};

export default App;

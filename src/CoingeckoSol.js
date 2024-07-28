import React, { useEffect, useState } from 'react';
import CryptoChart from './components/CryptoChart';
import {
    Button, Checkbox,
    CircularProgress, FormControl, FormControlLabel,
    Grid, InputLabel, ListItemText, MenuItem, OutlinedInput, Select,
    Snackbar, Switch,
    Tab,
    Tabs, TextField,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import ViewAgendaOutlinedIcon from '@mui/icons-material/ViewAgendaOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import ViewQuiltOutlinedIcon from '@mui/icons-material/ViewQuiltOutlined';
import "./App.css";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const CoingeckoSol = () => {
    const [datasets, setDatasets] = useState([]);
    const [datasets2, setDatasets2] = useState([]);
    const [fromDate, setFromDate] = useState(dayjs("2024-07-01"));
    const [toDate, setToDate] = useState(dayjs("2024-07-28"));
    const [loading, setLoading] = useState(false);
    const [tabValue, setTabValue] = useState('2');
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(9);

    const [coinsSelected, setCoinsSelected] = React.useState([]);
    const [checked, setChecked] = React.useState(true);

    const domain = "https://np40nkw6be.execute-api.us-east-1.amazonaws.com/Prod/coingecko-sol";

    const handleCoinSelectChange = (event) => {
        const {
            target: { value },
        } = event;
        setCoinsSelected(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleSwitchChange = (event) => {
        setChecked(event.target.checked);
    };

    const fetchData = async () => {
        setLoading(true);

        const response = await fetch(`${domain}?start_date=${dayjs(fromDate).format("YYYY-MM-DD")}&end_date=${dayjs(toDate).format("YYYY-MM-DD")}&index_start=0&index_end=9&exclude_ids=solana,tether,usd-coin,chainlink`);
        const result = await response.json();

        const data = Object.keys(result).map(date => ({
            timestamp: date,
            marketcap: result[date]
        }));

        const combinedData = [
            {
                label: 'Market Cap',
                data: data,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
            }
        ];

        setDatasets(combinedData);
        setLoading(false);
    };

    const fetchData2 = async () => {
        setLoading(true);

        const response = await fetch(`${domain}-all`);
        const result = await response.json();

        setDatasets2(result);
        setLoading(false);
    };

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const onSearch = () => {
        fetchData();
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    useEffect(() => {
        fetchData2();
    }, []);

    return (
        <div className="App">
            <h1>
                Coingecko Sol Market Caps
            </h1>

            <Grid
                container
                spacing={1}
                justifyContent={"center"}
            >

                <Grid
                    item
                    container
                    spacing={1}
                    justifyContent={"center"}
                >
                    <Grid
                        item
                        container
                        direction={"column"}
                        style={{"width": "unset"}}
                    >
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Start date"
                                value={fromDate}
                                onChange={(newValue) => setFromDate(newValue)}
                                disabled={loading}
                                maxDate={toDate}
                            />
                        </LocalizationProvider>
                    </Grid>

                    <Grid
                        item
                        container
                        direction={"column"}
                        style={{"width": "unset"}}
                    >
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="End date"
                                value={toDate}
                                onChange={(newValue) => setToDate(newValue)}
                                disabled={loading}
                                minDate={fromDate}
                            />
                        </LocalizationProvider>
                    </Grid>

                    <Grid
                        item
                        container
                        direction={"column"}
                    >
                    </Grid>

                    <Grid
                        item
                        container
                        direction={"column"}
                        style={{"width": "unset"}}
                    >
                        <TextField
                            label="Start Index"
                            type="number"
                            value={startIndex}
                            onChange={(e) => setStartIndex(e.target.value)}
                            disabled={loading}
                        />
                    </Grid>

                    <Grid
                        item
                        container
                        direction={"column"}
                        style={{"width": "unset"}}
                    >
                        <TextField
                            label="End Index"
                            type="number"
                            value={endIndex}
                            onChange={(e) => setEndIndex(e.target.value)}
                            disabled={loading}
                        />
                    </Grid>

                    <Grid
                        item
                        container
                        direction={"column"}
                    >
                    </Grid>

                    <Grid
                        item
                        container
                        direction={"column"}
                        style={{"width": "unset"}}
                    >
                        <div>
                            <FormControl sx={{m: 1, width: 300}}>
                                <InputLabel id="demo-multiple-checkbox-label">Coins to...</InputLabel>
                                <Select
                                    labelId="demo-multiple-checkbox-label"
                                    id="demo-multiple-checkbox"
                                    multiple
                                    value={coinsSelected}
                                    onChange={handleCoinSelectChange}
                                    input={<OutlinedInput label="Coins to..."/>}
                                    renderValue={(selected) => selected.join(', ')}
                                    MenuProps={MenuProps}
                                >
                                    {datasets2.map((coin) => (
                                        <MenuItem key={coin.id} value={coin.id}>
                                            <Checkbox checked={coinsSelected.indexOf(coin.id) > -1}/>
                                            <img style={{"height": "24px", "margin-right": "8px"}} src={coin.image}/>
                                            <ListItemText primary={coin.id}/>
                                        </MenuItem>
                                    ))}
                                </Select>

                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={checked}
                                            onChange={handleSwitchChange}
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                    }
                                    label={checked ? "Exclude" : "Include"}
                                />
                            </FormControl>
                        </div>
                    </Grid>
                </Grid>
            </Grid>
            <br/>

            <Button onClick={onSearch} variant="contained" disabled={loading}>
                {loading ? (
                    <CircularProgress size={25} color={"grey"}/>
                ) : (
                    "Fetch data"
                )}
            </Button>
            <br/>

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
                        <Tab label={(<ViewAgendaOutlinedIcon />)} value={"1"} />
                        <Tab label={(<ViewQuiltOutlinedIcon />)} value={"1.3"} />
                        <Tab label={(<GridViewOutlinedIcon />)} value={"2"} />
                    </Tabs>
                </Grid>
            </Grid>

            <Grid
                container
                direction={"row"}
                justifyContent={"space-evenly"}
            >
                <Grid
                    item
                    xs={11 / parseFloat(tabValue)}
                >
                    <CryptoChart datasets={datasets} title="Market Cap" metric="marketcap" showDatesOnly={true}/>
                </Grid>
            </Grid>

            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message="Data fetched successfully!"
            />
        </div>
    );
};

export default CoingeckoSol;

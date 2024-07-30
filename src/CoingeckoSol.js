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
import { DataGrid } from '@mui/x-data-grid';
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

const columns = [
    {
        field: 'icon',
        headerName: '',
        width: 100,
        renderCell: (params) => (
            <img src={params.value} alt={params.row.coin} style={{ height: '24px', width: '24px' }} />
        )
    },
    { field: 'coin', headerName: 'Coin', width: 200 },
    { field: 'percentage', headerName: 'Participation (%)', width: 200 },
    { field: 'days_participated', headerName: 'Days Participated', width: 200 }
];

const CoingeckoSol = () => {
    const [datasets, setDatasets] = useState([]);
    const [datasets2, setDatasets2] = useState([]);
    const [participation, setParticipation] = useState([]);
    const [fromDate, setFromDate] = useState(dayjs("2024-07-01"));
    const [toDate, setToDate] = useState(dayjs().add(-1, "day"));
    const [loading, setLoading] = useState(false);
    const [tabValue, setTabValue] = useState('2');
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const [startIndex, setStartIndex] = useState(1);
    const [endIndex, setEndIndex] = useState(10);

    const [coinsSelected, setCoinsSelected] = useState([]);
    const [checked, setChecked] = useState(true);

    const domain = "https://api.fijisolutions.net/coingecko-sol";
    // const domain = "http://127.0.0.1:8000/coingecko-sol";

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
        let coinParams = coinsSelected.join(',');

        if (!checked) {
            const allCoins = datasets2.map(coin => coin.id);
            const includedCoins = allCoins.filter(coin => !coinsSelected.includes(coin));
            coinParams = includedCoins.join(',');
        }

        const response = await fetch(`${domain}?start_date=${dayjs(fromDate).format("YYYY-MM-DD")}&end_date=${dayjs(toDate).format("YYYY-MM-DD")}&index_start=${startIndex - 1}&index_end=${endIndex - 1}&exclude_ids=${coinParams}`);
        const result = await response.json();

        const data = Object.keys(result["market_cap_sums"]).map(date => ({
            timestamp: date,
            marketcap: result["market_cap_sums"][date]
        }));
        console.log(data);

        const combinedData = [
            {
                label: 'Market Cap',
                data: data,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
            }
        ];

        const participationData = result["participation"].map(item => ({
            id: item.coin,
            coin: item.coin,
            percentage: item.percentage + "%",
            days_participated: item.days_participated,
            icon: item.icon
        }));

        setDatasets(combinedData);
        setParticipation(participationData);
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

    const generatePineScript = () => {
        const sortedData = datasets[0].data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

        const mostRecentDate = new Date(sortedData[sortedData.length - 1].timestamp).toISOString().split('T')[0];

        let pineScript = `//@version=5
indicator("${datasets[0].label} Data Plot", overlay=true)

var customValues = array.new_float()
bump = input(true, '', inline = '1') // Enable/Disable offset of origin bar.
date = input.time(timestamp("${mostRecentDate} 00:00 +0000"), "Shift Origin To", tooltip = 'When enabled use this offset for origin bar of data range.', inline = '1')

indx = not bump ? 0 : ta.valuewhen(time == date, bar_index, 0) // Origin bar index.

if bar_index == indx
    customValues := array.from(
     `;

        sortedData.forEach((item, index) => {
            pineScript += `${item.marketcap}${index < sortedData.length - 1 ? ', ' : `
 `}`;
        });

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

    useEffect(() => {
        fetchData2();
    }, []);

    return (
        <div className="App">
            <h1>
                Coingecko Sol Market Caps
            </h1>

            <span>The data used for this chart was fetched from the Coingecko /history API. The information is updated daily.</span>
            <br/>
            <br/>

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
                                minDate={dayjs("2023-01-01")}
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
                        <span>Specify the range of indices to view the coins by market cap.</span>
                        <span>For example, setting the start index to 1 and the end index to 10 will display the top 10 coins by market cap.</span>
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
                                            <img style={{"height": "24px", "marginRight": "8px"}} src={coin.image}
                                                 alt={coin.id}/>
                                            <ListItemText primary={coin.id}/>
                                        </MenuItem>
                                    ))}
                                </Select>

                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={checked}
                                            onChange={handleSwitchChange}
                                            inputProps={{'aria-label': 'controlled'}}
                                        />
                                    }
                                    label={checked ? "Exclude" : "Include"}
                                />
                            </FormControl>
                        </div>
                    </Grid>

                    <Grid
                        item
                        container
                        direction={"column"}
                    >
                        <span>You can either exclude specific coins from the results or include only selected coins.</span>
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

            <Button style={{"marginLeft": "8px"}} onClick={() => generatePineScript()} variant="contained"
                    disabled={loading || datasets.length === 0}>
                {loading ? (
                    <CircularProgress size={25} color={"grey"}/>
                ) : (
                    "Copy Pine Script"
                )}
            </Button>

            <br/>
            <br/>

            <span>To view the data in TradingView, copy the Pine script, go to the Pine Editor in TradingView, and paste it.</span>

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
                        <Tab label={(<ViewAgendaOutlinedIcon/>)} value={"1"}/>
                        <Tab label={(<ViewQuiltOutlinedIcon/>)} value={"1.3"}/>
                        <Tab label={(<GridViewOutlinedIcon/>)} value={"2"}/>
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
                <Grid
                    item
                    xs={11 / parseFloat(tabValue)}
                >
                    <h1>Participation Data</h1>
                    <div style={{height: 400, width: '100%'}}>
                        <DataGrid
                            rows={participation}
                            columns={columns}
                            pageSize={10}
                            rowsPerPageOptions={[10]}
                        />
                    </div>
                </Grid>
            </Grid>
            <h2>Important Disclaimer</h2>
            <p>On <strong>28/07/2024</strong>, the <strong>Top 400 Coins by Market Cap order</strong> were fetched for
                the Solana Ecosystem from CoinGecko: <a href="https://www.coingecko.com/en/categories/solana-ecosystem"
                                                        target="_blank" rel="noreferrer">https://www.coingecko.com/en/categories/solana-ecosystem</a>.
            </p>
            <p>From <strong>01/01/2023</strong> until <strong>28/07/2024</strong>, the data
                includes <strong>ONLY</strong> these coins.</p>
            <p>This is because I did not find a way to view the Market Cap order history for the past.</p>
            <p>If I find a way to do so in the future, the data will be corrected and this disclaimer will be
                removed.</p>
            <p>If you have any feedback or ideas on how to extend the website, tag me in TRW:
                @01HK0BGJQMWXQC26SRG2W46TET</p>

            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message="Pine Script copied to clipboard!"
            />
        </div>
    );
};

export default CoingeckoSol;

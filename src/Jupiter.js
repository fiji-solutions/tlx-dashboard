import React, { useEffect, useState } from 'react';
import CryptoChart from './components/CryptoChart';
import {
    Button,
    Checkbox,
    CircularProgress,
    FormControl,
    Grid,
    InputLabel,
    ListItemText,
    MenuItem,
    OutlinedInput,
    Select,
    Tab,
    Tabs
} from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import ViewAgendaOutlinedIcon from "@mui/icons-material/ViewAgendaOutlined";
import ViewQuiltOutlinedIcon from "@mui/icons-material/ViewQuiltOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";

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
    { field: 'asset_name', headerName: 'Asset Name', width: 200 },
    { field: 'apy', headerName: 'APY (%)', width: 150 },
    { field: 'num_days', headerName: 'Number of Days', width: 150 }
];

const Jupiter = () => {
    const [assets, setAssets] = useState([]);
    const [selectedAssets, setSelectedAssets] = useState([]);
    const [chartData, setChartData] = useState([]);
    const [baseIndexedChartData, setBaseIndexedChartData] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [tabValue, setTabValue] = useState('1.3');

    const fetchAssets = async () => {
        // const response = await fetch('http://localhost:8000/jupiter-all');
        const response = await fetch('https://api.fijisolutions.net/jupiter-all');
        const data = await response.json();
        setAssets(data);
    };

    const fetchData = async () => {
        setLoading(true);

        const generateColor = () => {
            const r = Math.floor(Math.random() * 255);
            const g = Math.floor(Math.random() * 255);
            const b = Math.floor(Math.random() * 255);
            return {
                borderColor: `rgba(${r}, ${g}, ${b}, 1)`,
                backgroundColor: `rgba(${r}, ${g}, ${b}, 0.2)`,
            };
        };

        const allAssets = selectedAssets.concat("solana").join(',');

        // const response = await fetch(`http://localhost:8000/jupiter?ids=${encodeURIComponent(allAssets)}`);
        const response = await fetch(`https://api.fijisolutions.net/jupiter?ids=${encodeURIComponent(allAssets)}`);
        const results = await response.json();

        const colorMap = {};

        const combinedData = Object.keys(results.price_data).map((assetName) => {
            if (!colorMap[assetName]) {
                colorMap[assetName] = generateColor();
            }

            return {
                label: assetName,
                data: results.price_data[assetName].map(item => ({
                    timestamp: item.timestamp,
                    price: item.price,
                })),
                ...colorMap[assetName],
            };
        });

        const baseIndexedData = Object.keys(results.base_indexed_data).map((assetName) => {
            const color = colorMap[assetName] || generateColor();

            return {
                label: assetName,
                data: results.base_indexed_data[assetName].map(item => ({
                    timestamp: item.timestamp,
                    indexed_price: item.indexed_price,
                })),
                ...color,
            };
        });

        const combinedTableData = Object.keys(results.daily_changes).map((assetName, index) => ({
            id: index,
            asset_name: assetName,
            apy: (results.daily_changes[assetName].apy * 100).toFixed(2), // Convert APY to percentage
            num_days: results.daily_changes[assetName].num_days
        }));

        setChartData(combinedData);
        setBaseIndexedChartData(baseIndexedData);
        setTableData(combinedTableData);
        setLoading(false);
    };

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    useEffect(() => {
        fetchAssets();
    }, []);

    return (
        <div className="App">
            <h1>Jupiter LST</h1>

            <Grid
                container
                direction={"column"}
                justifyContent={"center"}
                alignItems={"center"}
                spacing={1}
            >
                <Grid item>
                    <FormControl sx={{ m: 1, width: 300 }}>
                        <InputLabel id="asset-select-label">Select Assets</InputLabel>
                        <Select
                            labelId="asset-select-label"
                            id="asset-select"
                            multiple
                            value={selectedAssets}
                            onChange={(e) => {
                                const value = e.target.value;

                                if (value.includes("all")) {
                                    if (selectedAssets.length === assets.length) {
                                        setSelectedAssets([]); // Deselect all if already selected
                                    } else {
                                        setSelectedAssets(assets.map(asset => asset.coingeckoId)); // Select all
                                    }
                                } else {
                                    setSelectedAssets(value);
                                }
                            }}
                            input={<OutlinedInput label="Select Assets" />}
                            renderValue={(selected) => selected.join(', ')}
                            MenuProps={MenuProps}
                        >
                            <MenuItem key="all" value="all">
                                <Checkbox checked={selectedAssets.length === assets.length} />
                                <ListItemText primary="Select All" />
                            </MenuItem>
                            {assets.map((asset) => (
                                <MenuItem key={asset.coingeckoId} value={asset.coingeckoId}>
                                    <Checkbox checked={selectedAssets.indexOf(asset.coingeckoId) > -1} />
                                    <img
                                        style={{ height: "24px", marginRight: "8px" }}
                                        src={asset.logoURI}
                                        alt={asset.coingeckoId}
                                    />
                                    <ListItemText primary={asset.name} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item>
                    <Button onClick={fetchData} variant="contained" disabled={loading}>
                        {loading ? <CircularProgress size={25} color={"grey"} /> : "Fetch Data"}
                    </Button>
                </Grid>
            </Grid>

            {chartData.length > 0 && (
                <>
                    <Grid container justifyContent={"center"} alignItems={"center"} direction={"column"}>
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

                    <Grid container direction={"row"} justifyContent={"space-evenly"}>
                        <Grid item xs={11 / parseFloat(tabValue)} justifyContent="center">
                            <Grid item xs={12}>
                                <CryptoChart datasets={chartData} title="Asset Prices" metric="price" />
                            </Grid>
                        </Grid>
                        <Grid item xs={11 / parseFloat(tabValue)} justifyContent="center">
                            <Grid item xs={12}>
                                <CryptoChart datasets={baseIndexedChartData} title="Base Indexed Prices" metric="indexed_price" />
                            </Grid>
                        </Grid>
                    </Grid>

                    <h2>Asset Data Table</h2>
                    <div style={{height: 400, width: '100%'}}>
                        <DataGrid
                            rows={tableData}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export default Jupiter;

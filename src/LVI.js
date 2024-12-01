import React, { useState, useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import {Snowfall} from "react-snowfall";

const LiquidityValuationIndicator = () => {
    const [imageUrls] = useState([
        "https://api.fijisolutions.net/static/plots/global_liquidity_vs_bitcoin.png",
        "https://api.fijisolutions.net/static/plots/zscore_btc_prices.png",
        "https://api.fijisolutions.net/static/plots/michael_howell_better_model.png",
        "https://api.fijisolutions.net/static/plots/btc_vs_gl_better_model.png",
        "https://api.fijisolutions.net/static/plots/zscore_btc_prices_valuation.png",
    ]);
    const [lastModifiedDates, setLastModifiedDates] = useState({});

    useEffect(() => {
        // Function to fetch Last-Modified header
        const fetchLastModified = async (url) => {
            try {
                const response = await fetch(url, { method: 'HEAD' });
                const lastModified = response.headers.get('Last-Modified');
                return lastModified ? new Date(lastModified).toLocaleString() : 'Unknown';
            } catch (error) {
                console.error(`Error fetching last modified date for ${url}:`, error);
                return 'Unknown';
            }
        };

        const fetchDates = async () => {
            const dates = {};
            for (const url of imageUrls) {
                dates[url] = await fetchLastModified(url);
            }
            setLastModifiedDates(dates);
        };

        fetchDates();
    }, [imageUrls]);

    const snowflake = document.createElement('img');
    snowflake.src = '/snowflake.png';

    return (
        <div className="App" style={{"min-height": "2000px"}}>
            <Snowfall
                images={[snowflake]}
                radius={[10, 15.0]}
            />
            <h1>{"Liquidity Valuation Indicator"}</h1>
            <Grid container spacing={2} justifyContent="center">
                <Grid item>
                    <Typography variant={"h6"} style={{ marginBottom: "16px" }}>
                        The charts displayed on this page were created by JayWolf as part of his analysis on liquidity valuation metrics.
                    </Typography>
                    <Typography variant={"h6"} style={{ marginBottom: "16px" }}>
                        The first two charts look at a third-degree polynomial trend line, and the last three charts look at Michael Howell’s “Better Model” as described in his CBC letter titled “Is Bitcoin A Liquidity Proxy?” (29 September 2024).
                    </Typography>
                    <Typography variant={"h6"} style={{ marginBottom: "16px" }}>
                        For both trend lines, the Z-scores between data points and the trendlines have been calculated to create a non-stationary time series that could be used for valuation-style analysis.
                    </Typography>
                    <Typography variant={"h6"} style={{ marginBottom: "16px" }}>
                        Michael Howell’s “Better Model” is calculated by combining the linear trend between Bitcoin and gold prices (log-log) with the linear trend line between gold prices and CBC’s Global Liquidity Index (log-log).
                    </Typography>
                    <Typography variant={"h6"} style={{ marginBottom: "16px" }}>
                        {`Charts are updated weekly. Last updated: ${lastModifiedDates["https://api.fijisolutions.net/static/plots/global_liquidity_vs_bitcoin.png"] || 'Loading...'}`}
                    </Typography>
                </Grid>
            </Grid>
            <Grid
                container
                direction={"column"}
                justifyContent={"space-evenly"}
            >
                {imageUrls.map((imageUrl, index) => (
                    <Grid item xs={12} key={index} style={{ marginBottom: '16px' }}>
                        <a href={imageUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'block' }}>
                            <img
                                src={imageUrl}
                                alt={`Liquidity Valuation Indicator ${index + 1}`}
                                style={{ maxWidth: '100%', height: 'auto' }}
                            />
                        </a>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default LiquidityValuationIndicator;

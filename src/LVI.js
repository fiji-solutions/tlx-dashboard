import React, { useState } from 'react';
import { Grid, Typography } from '@mui/material';

const LiquidityValuationIndicator = () => {
    const [imageUrls] = useState([
        "https://api.fijisolutions.net/static/plots/global_liquidity_vs_bitcoin.png",
        "https://api.fijisolutions.net/static/plots/zscore_btc_prices.png",
        "https://api.fijisolutions.net/static/plots/michael_howell_better_model.png",
        "https://api.fijisolutions.net/static/plots/btc_vs_gl_better_model.png",
        "https://api.fijisolutions.net/static/plots/zscore_btc_prices_valuation.png",
    ]);

    return (
        <div className="App">
            <h1>{"Liquidity Valuation Indicator"}</h1>
            <Grid container spacing={2} justifyContent="center">
                <Grid item>
                    <Typography variant={"h6"} style={{ marginBottom: "16px" }}>
                        The charts displayed on this page were created by JayWolf as part of his analysis on liquidity valuation metrics.
                    </Typography>
                    <Typography variant={"h6"} style={{ marginBottom: "16px" }}>
                        The first two charts look at a 3rd degree polynomial trend line and the last three charts look at Michael Howell’s “Better Model” as described in his CBC letter titled “Is Bitcoin A Liquidity Proxy?” (29th September 2024).
                    </Typography>
                    <Typography variant={"h6"} style={{ marginBottom: "16px" }}>
                        For both trend lines, the Z-scores between data points and the trendlines have been calculated to create a non-stationary time-series that could be used for valuation-style analysis.
                    </Typography>
                    <Typography variant={"h6"} style={{ marginBottom: "16px" }}>
                        Charts are updated weekly.
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

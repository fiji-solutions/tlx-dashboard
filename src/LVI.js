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
                        It combines multiple models, including Michael Howell's "better model" and polynomial extrapolations, to provide a comprehensive view of liquidity trends and asset valuations.
                    </Typography>
                </Grid>
            </Grid>
            <Grid
                container
                direction={"row"}
                justifyContent={"space-evenly"}
            >
                {imageUrls.map((imageUrl, index) => (
                    <Grid
                        item
                        xs={11}
                        key={index}
                        justifyContent="center"
                    >
                        <a href={imageUrl} target="_blank" rel="noopener noreferrer">
                            <img
                                src={imageUrl}
                                alt={`Liquidity Valuation Indicator ${index + 1}`}
                                style={{ width: '100%', height: 'auto', marginBottom: '16px' }}
                            />
                        </a>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default LiquidityValuationIndicator;

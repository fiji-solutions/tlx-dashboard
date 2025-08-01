# Catalytics Platform

A comprehensive crypto analysis platform featuring liquidity indicators, market cap analysis, and trading performance metrics.

## Features

- **Liquidity Valuation Indicators**: Advanced analysis using JayWolf's methodology and Michael Howell's "Better Model"
- **Solana Market Analysis**: Market cap tracking for Solana ecosystem and meme coins
- **LST Performance**: Liquid staking token analysis and comparison
- **Trading Experiments**: TradingView strategy backtesting results
- **Toros Finance Integration**: Performance metrics for leveraged tokens

## Tech Stack

- **Frontend**: React 18 with Vite
- **UI Library**: Material-UI (MUI)
- **Charts**: Chart.js with react-chartjs-2
- **Data Grid**: MUI X Data Grid
- **Routing**: React Router v6
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd tlx-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Deployment

This project is configured for deployment on Vercel:

1. Connect your repository to Vercel
2. Vercel will automatically detect the Vite configuration
3. Set any required environment variables in the Vercel dashboard
4. Deploy!

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── CryptoChart.js   # Chart component for time series data
│   ├── BarChart.js      # Bar chart component
│   └── NavTabs.js       # Navigation component
├── App.js              # Toros Finance analysis
├── TGA1.js             # Liquidity analysis
├── Jupiter.js          # LST analysis
├── LVI.js              # Liquidity Valuation Indicators
├── CoingeckoSolMemes.js # Solana meme coin analysis
└── main.jsx            # Application entry point
```

## API Integration

The application integrates with the Fiji Solutions API for:
- Market data fetching
- Historical price analysis
- Correlation calculations
- Performance metrics

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is private and proprietary.

## Acknowledgments

Special thanks to:
- Professor Adam
- JayWolf
- Cedric
- Calypso
- Cryptosaurus Max ₿
- OG_Simba

For their contributions to making this platform possible.
# Market Radar

Marketplace intelligence engine for discovering, scoring, and monitoring resale opportunities.

## What we're building

Market Radar turns marketplace listings into ranked opportunities. The core is provider-neutral:

`marketplace source → normalized listings → comparable valuation → opportunity score`

The first milestone is **read-only intelligence**. No seller messaging, purchasing, or listing creation is part of the core.

## Current state

- Provider-neutral `MarketplaceConnector` interface
- Normalized `MarketplaceListing` domain model
- Explainable comparable-median valuation baseline
- Deterministic opportunity scoring with resale-cost and risk adjustments
- Mock connector for development without a live marketplace
- Facebook Marketplace connector using an explicitly supplied authenticated session
- Rate limiting and configurable Facebook GraphQL operation ID
- `findDeals()` pipeline that ranks returned listings

## Facebook connector

The Facebook connector is isolated under `src/connectors/facebook/`. It does not contain account credentials or browser-cookie extraction. Supply an authenticated session explicitly at runtime.

Facebook's internal Marketplace protocol is undocumented and can change. Operation IDs may rotate, and use of automated access may be restricted by Facebook's terms. Keep usage read-only, low-rate, and limited to accounts you are authorized to use.

## Development

Requirements: Node.js 20+

```bash
npm install
npm run build
npm test
```

## Architecture

```text
Marketplace source
        ↓
   Connector
        ↓
Normalized listing
        ↓
Comparable valuation
        ↓
 Opportunity score
        ↓
 Ranked opportunities
```

See [`docs/architecture.md`](docs/architecture.md) and [`docs/product.md`](docs/product.md) for the current design and product direction.

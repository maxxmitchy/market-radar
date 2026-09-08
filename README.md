# Market Radar

Market Radar is a marketplace intelligence application: it turns marketplace listings into ranked resale opportunities.

## Current direction

The repository keeps the visible web app on `main` while the intelligence engine lives alongside it as provider-neutral TypeScript modules.

Core pipeline:

`marketplace source → normalized listings → comparable valuation → opportunity score`

The initial intelligence milestone is read-only. It does not automatically message sellers, purchase goods, or create listings.

## Core modules

- `src/domain/` — provider-neutral listing, valuation, and opportunity contracts
- `src/connectors/` — marketplace adapters and local mock connector
- `src/connectors/facebook/` — isolated read-only Facebook Marketplace adapter
- `src/intelligence/` — valuation, scoring, and deal discovery

## Facebook connector

The Facebook adapter accepts an explicitly supplied authenticated session at runtime. It does not store account credentials or browser cookies in the repository.

Facebook's internal Marketplace protocol is undocumented and may change. Automated access may also be restricted by Facebook's terms. Keep usage authorized, read-only, and low-rate.

## Development

The visible app remains the primary `main`-branch experience. The intelligence modules can be integrated into the UI/API incrementally without replacing the frontend foundation.

# Market Radar Architecture

## Layers

1. **Web app** — the user-facing Market Radar experience already established on `main`.
2. **Connectors** — provider-specific adapters return the common `MarketplaceListing` model.
3. **Domain** — listings, valuations, and opportunities remain provider-neutral.
4. **Intelligence** — comparable valuation and deterministic scoring produce explainable opportunities.
5. **Delivery** — the intelligence layer can later be exposed through the web app API, MCP, monitors, and alerts.

## Design rule

Source-specific fields stop at the connector boundary. Valuation and scoring consume normalized domain contracts only.

# Architecture

Market Radar separates marketplace acquisition from intelligence so providers can change without rewriting the core.

## Layers

### 1. Connectors
Provider-specific adapters implement `MarketplaceConnector` and return the common `MarketplaceListing` model.

### 2. Domain
The domain model is provider-neutral. A listing captures identity, pricing, location, seller metadata, media, timestamps, and raw source data.

### 3. Intelligence
The intelligence layer estimates fair value and turns the estimated value into an opportunity score after costs and risk adjustments.

The MVP uses an explainable comparable-median baseline. This is deliberately simple so every score can be inspected and tested before introducing more complex models.

### 4. Delivery
The core will eventually be exposed through MCP tools, an API, a dashboard, scheduled monitors, and alerts.

## Design principle

Never let source-specific fields leak into valuation or scoring logic. Source adapters normalize first; intelligence consumes only the common domain contracts.

import type { MarketplaceConnector, ListingSearch } from "../marketplace.js";
import type { MarketplaceListing } from "../../domain/listing.js";
import type { FacebookSearchPage, FacebookSession, MarketplaceListingRecord } from "./types.js";

const GRAPHQL_URL = "https://www.facebook.com/api/graphql/";
const MARKETPLACE_URL = "https://www.facebook.com/marketplace/";

// Facebook rotates these operation IDs. Keep them configurable so the
// connector can be updated without changing the intelligence layer.
const DEFAULT_SEARCH_DOC_ID = "7111939778879383";

export interface FacebookConnectorOptions {
  session: FacebookSession;
  searchDocId?: string;
  userAgent?: string;
  requestsPerMinute?: number;
}

export class FacebookMarketplaceConnector implements MarketplaceConnector {
  readonly name = "facebook-marketplace";

  private readonly session: FacebookSession;
  private readonly searchDocId: string;
  private readonly userAgent: string;
  private readonly minIntervalMs: number;
  private lastRequestAt = 0;
  private requestCounter = 0;

  constructor(options: FacebookConnectorOptions) {
    this.session = options.session;
    this.searchDocId = options.searchDocId ?? DEFAULT_SEARCH_DOC_ID;
    this.userAgent = options.userAgent ?? "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/151.0 Safari/537.36";
    const rpm = Math.max(1, options.requestsPerMinute ?? 3);
    this.minIntervalMs = Math.ceil(60_000 / rpm);
  }

  async searchListings(search: ListingSearch): Promise<MarketplaceListing[]> {
    const page = await this.searchPage(search);
    return page.listings.map((item) => this.normalize(item));
  }

  async getListing(_id: string): Promise<MarketplaceListing | null> {
    // Listing-detail extraction is intentionally separate from search until
    // we have a stable, tested response shape. Returning null prevents the
    // core from depending on undocumented detail fields prematurely.
    return null;
  }

  async searchPage(search: ListingSearch, cursor?: string): Promise<FacebookSearchPage> {
    await this.waitForRateLimit();

    const variables = buildSearchVariables(search, cursor);
    const body = new URLSearchParams({
      fb_dtsg: this.session.fbDtsg,
      lsd: this.session.lsd ?? "",
      jazoest: this.session.jazoest ?? "",
      doc_id: this.searchDocId,
      variables: JSON.stringify(variables),
      __a: "1",
      __req: (++this.requestCounter).toString(36),
      __rev: this.session.clientRevision ?? "1",
    });

    const response = await fetch(GRAPHQL_URL, {
      method: "POST",
      headers: {
        "User-Agent": this.userAgent,
        "Accept": "*/*",
        "Accept-Language": "en-US,en;q=0.9",
        "Content-Type": "application/x-www-form-urlencoded",
        Cookie: this.session.cookieHeader,
        Origin: "https://www.facebook.com",
        Referer: MARKETPLACE_URL,
        ...(this.session.lsd ? { "X-FB-LSD": this.session.lsd } : {}),
      },
      body: body.toString(),
    });

    if (response.status === 401 || response.status === 403) {
      throw new Error("Facebook session was rejected or expired.");
    }
    if (!response.ok) {
      throw new Error(`Facebook GraphQL request failed: ${response.status} ${response.statusText}`);
    }

    const text = await response.text();
    const json = JSON.parse(stripJsonPrefix(text)) as unknown;
    return parseSearchResponse(json);
  }

  private normalize(item: MarketplaceListingRecord): MarketplaceListing {
    return {
      id: item.id,
      source: this.name,
      title: item.title,
      price: item.price,
      currency: item.currency,
      location: item.location,
      url: item.url ?? `https://www.facebook.com/marketplace/item/${item.id}/`,
      imageUrls: item.imageUrl ? [item.imageUrl] : [],
      sellerName: item.sellerName,
      listedAt: item.listedAt,
      capturedAt: new Date().toISOString(),
      raw: item.raw,
    };
  }

  private async waitForRateLimit(): Promise<void> {
    const elapsed = Date.now() - this.lastRequestAt;
    const wait = this.minIntervalMs - elapsed;
    if (wait > 0) await new Promise((resolve) => setTimeout(resolve, wait));
    this.lastRequestAt = Date.now();
  }
}

function buildSearchVariables(search: ListingSearch, cursor?: string): Record<string, unknown> {
  const browseRequestParams: Record<string, unknown> = {
    commerce_enable_local_pickup: true,
    commerce_enable_shipping: true,
    commerce_search_and_rp_available: true,
    commerce_search_and_rp_condition: null,
    commerce_search_and_rp_ctime_days: null,
    filter_location_latitude: search.latitude,
    filter_location_longitude: search.longitude,
    filter_price_lower_bound: search.minPrice ?? 0,
    filter_price_upper_bound: search.maxPrice ?? 214748364700,
    filter_radius_km: search.radiusKm ?? 50,
  };

  if (search.category) {
    browseRequestParams.commerce_search_and_rp_category_id = search.category;
  }

  return {
    count: search.limit ?? 20,
    params: {
      bqf: {
        callsite: "COMMERCE_MKTPLACE_WWW",
        query: search.query,
      },
      browse_request_params: browseRequestParams,
      custom_request_params: { surface: "SEARCH" },
    },
    ...(cursor ? { cursor } : {}),
  };
}

function stripJsonPrefix(text: string): string {
  const index = text.indexOf("{");
  return index >= 0 ? text.slice(index) : text;
}

function parseSearchResponse(payload: unknown): FacebookSearchPage {
  const root = payload as any;
  const connection = findListingConnection(root);
  const edges = Array.isArray(connection?.edges) ? connection.edges : [];

  const listings = edges
    .map((edge: any) => edge?.node ?? edge)
    .map(parseListing)
    .filter((item: MarketplaceListingRecord | null): item is MarketplaceListingRecord => item !== null);

  return {
    listings,
    hasNextPage: Boolean(connection?.page_info?.has_next_page),
    endCursor: connection?.page_info?.end_cursor ?? null,
  };
}

function findListingConnection(root: any): any {
  const seen = new Set<any>();
  const queue: any[] = [root];

  while (queue.length) {
    const value = queue.shift();
    if (!value || typeof value !== "object" || seen.has(value)) continue;
    seen.add(value);

    if (Array.isArray(value.edges) && value.edges.some((edge: any) => edge?.node?.listing_price || edge?.marketplace_listing_title || edge?.name)) {
      return value;
    }

    for (const child of Object.values(value)) {
      if (child && typeof child === "object") queue.push(child);
    }
  }

  return null;
}

function parseListing(node: any): MarketplaceListingRecord | null {
  const id = String(node?.id ?? node?.listing_id ?? "");
  const title = String(node?.marketplace_listing_title ?? node?.name ?? node?.title ?? "").trim();
  if (!id || !title) return null;

  const rawPrice = node?.listing_price?.amount ?? node?.price?.amount ?? node?.price ?? node?.formatted_price?.amount;
  const price = parseNumber(rawPrice);
  if (!Number.isFinite(price)) return null;

  const currency = String(node?.listing_price?.currency ?? node?.price?.currency ?? node?.currency ?? "NGN");
  const imageUrl = node?.primary_listing_photo?.image?.uri ?? node?.image?.uri ?? node?.image_url;
  const sellerName = node?.marketplace_listing_seller?.name ?? node?.seller?.name;
  const location = node?.location?.reverse_geocode?.city ?? node?.location?.name ?? node?.location?.single_line_address;

  return {
    id,
    title,
    price,
    currency,
    location,
    imageUrl,
    sellerName,
    listedAt: node?.creation_time ? new Date(Number(node.creation_time) * 1000).toISOString() : undefined,
    url: node?.url,
    raw: node,
  };
}

function parseNumber(value: unknown): number {
  if (typeof value === "number") return value;
  if (typeof value !== "string") return Number.NaN;
  const normalized = value.replace(/[^0-9.-]/g, "");
  return normalized ? Number(normalized) : Number.NaN;
}

export interface FacebookSession {
  cookieHeader: string;
  fbDtsg: string;
  lsd?: string;
  jazoest?: string;
  clientRevision?: string;
}

export interface FacebookSearchPage {
  listings: MarketplaceListingRecord[];
  hasNextPage: boolean;
  endCursor: string | null;
}

export interface MarketplaceListingRecord {
  id: string;
  title: string;
  price: number;
  currency: string;
  location?: string;
  imageUrl?: string;
  sellerName?: string;
  listedAt?: string;
  url?: string;
  raw: unknown;
}

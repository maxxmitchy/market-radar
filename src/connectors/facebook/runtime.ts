import { FacebookMarketplaceConnector } from "./client.js";
import type { FacebookSession } from "./types.js";
import type { MarketplaceConnector } from "../marketplace.js";

export interface MarketplaceRuntime {
  provider: "mock" | "facebook-marketplace";
  connector: MarketplaceConnector;
  configured: boolean;
}

export function createFacebookRuntime(env: NodeJS.ProcessEnv): MarketplaceRuntime {
  const cookieHeader = env.FACEBOOK_COOKIE_HEADER?.trim();
  const fbDtsg = env.FACEBOOK_FB_DTSG?.trim();
  const configured = Boolean(cookieHeader && fbDtsg);

  if (!configured) {
    return {
      provider: "facebook-marketplace",
      connector: new UnconfiguredFacebookConnector(),
      configured: false,
    };
  }

  const session: FacebookSession = {
    cookieHeader,
    fbDtsg,
    lsd: env.FACEBOOK_LSD?.trim() || undefined,
    jazoest: env.FACEBOOK_JAZOEST?.trim() || undefined,
    clientRevision: env.FACEBOOK_CLIENT_REVISION?.trim() || undefined,
  };

  return {
    provider: "facebook-marketplace",
    connector: new FacebookMarketplaceConnector({
      session,
      searchDocId: env.FACEBOOK_SEARCH_DOC_ID?.trim() || undefined,
      requestsPerMinute: Number(env.FACEBOOK_REQUESTS_PER_MINUTE ?? 3),
    }),
    configured: true,
  };
}

export class UnconfiguredFacebookConnector implements MarketplaceConnector {
  readonly name = "facebook-marketplace";

  async searchListings(): Promise<never> {
    throw new Error("Facebook Marketplace provider is not configured on the server.");
  }

  async getListing(): Promise<null> {
    return null;
  }
}

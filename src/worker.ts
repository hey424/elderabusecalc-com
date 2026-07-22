export interface Env { ASSETS: Fetcher; }

const LEGACY_REDIRECTS: Record<string, string> = {
  "/guide.html": "/guides/",
};

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (url.hostname.startsWith("www.")) {
      const target = new URL(request.url);
      target.protocol = "https:";
      target.hostname = url.hostname.slice(4);
      return Response.redirect(target.toString(), 301);
    }
    const legacyPath = LEGACY_REDIRECTS[url.pathname];
    if (legacyPath) {
      const target = new URL(request.url);
      target.pathname = legacyPath;
      return Response.redirect(target.toString(), 301);
    }
    return env.ASSETS.fetch(request);
  },
};

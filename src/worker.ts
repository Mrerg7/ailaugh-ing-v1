interface Env {
  ASSETS: Fetcher;
}

const DUPLICATE_PATH_REDIRECTS: Record<string, string> = {
  '/index.html': '/',
  '/index': '/',
  '/ailaughing.html': '/',
};

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.hostname === 'www.ailaugh.ing') {
      url.hostname = 'ailaugh.ing';
      return Response.redirect(url.toString(), 301);
    }

    const redirectTarget = DUPLICATE_PATH_REDIRECTS[url.pathname];
    if (redirectTarget) {
      return Response.redirect(new URL(redirectTarget, url.origin).toString(), 301);
    }

    return env.ASSETS.fetch(request);
  },
};

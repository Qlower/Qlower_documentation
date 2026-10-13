import type { Config, Context } from "@netlify/edge-functions";

const COOKIE = "doc_session";
const LOGIN_PAGE = "/login.html";
const PUBLIC_PATHS = [LOGIN_PAGE, "/login", "/img/logo-qlower.svg", "/img/favicon.png"];
const encoder = new TextEncoder();

const keys = new Map<string, Promise<CryptoKey>>();
const hmacKey = (secret: string) => {
  if (!keys.has(secret)) {
    keys.set(secret, crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["verify"]));
  }
  return keys.get(secret)!;
};

const fromBase64Url = (value: string) =>
  Uint8Array.from(atob(value.replace(/-/g, "+").replace(/_/g, "/")), (char) => char.charCodeAt(0));

const isValidSession = async (token: string | undefined, secret: string) => {
  const [header, payload, signature] = token?.split(".") ?? [];
  if (!secret || !signature) return false;
  try {
    const signed = await crypto.subtle.verify("HMAC", await hmacKey(secret), fromBase64Url(signature), encoder.encode(`${header}.${payload}`));
    const claims = signed && JSON.parse(new TextDecoder().decode(fromBase64Url(payload)));
    return Boolean(claims) && claims.scope === "doc" && claims.exp * 1000 > Date.now();
  } catch {
    return false;
  }
};

const login = async (request: Request, context: Context) => {
  if (!request.headers.get("content-type")?.startsWith("application/json")) {
    return Response.json({ error: "DOC_ACCESS_BAD_REQUEST" }, { status: 415 });
  }
  const response = await fetch(`${Netlify.env.get("QLOWER_API_URL")}/admin/partners/doc-access/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: await request.text(),
  }).catch(() => null);
  const body = (await response?.json().catch(() => null)) ?? {};
  const result = body.results ?? {};
  if (!response?.ok || !result.token) {
    return Response.json({ error: body.errors?.[0] ?? "DOC_ACCESS_DISABLED" }, { status: response?.ok ? 502 : response?.status ?? 502 });
  }
  context.cookies.set({
    name: COOKIE,
    value: result.token,
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: "Lax",
    expires: new Date(result.expires_at * 1000),
  });
  return Response.json({ ok: true });
};

export default async (request: Request, context: Context) => {
  const url = new URL(request.url);
  if (url.pathname === "/auth/login" && request.method === "POST") return login(request, context);
  if (url.pathname === "/auth/logout") {
    context.cookies.delete({ name: COOKIE, path: "/" });
    return Response.redirect(new URL(LOGIN_PAGE, url), 302);
  }
  if (PUBLIC_PATHS.includes(url.pathname)) return context.next();
  if (await isValidSession(context.cookies.get(COOKIE), Netlify.env.get("DOC_ACCESS_SECRET") ?? "")) {
    return context.next();
  }
  const loginPage = new URL(LOGIN_PAGE, url);
  loginPage.searchParams.set("next", url.pathname + url.search);
  return Response.redirect(loginPage, 302);
};

export const config: Config = { path: "/*" };

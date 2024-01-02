export const isProd = process.env.NODE_ENV === "production";
export const SITE_LANGUAGE = "en-GB";
export const BASE_URL = isProd
  ? (process.env.NEXT_PUBLIC_BASE_URL as string)
  : "http://localhost:3000";
export const COMPANY_FROM_NAME = "Ronne Vinkx";
export const COMPANY_FROM_EMAIL = "info@ronnevinkx.nl";

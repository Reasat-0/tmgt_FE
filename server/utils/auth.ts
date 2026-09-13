import { cookies } from "next/headers";

export interface AuthTokenPayload {
  accessToken: string;
  refreshToken?: string;
  expiresIn?: number; // In seconds (optional)
}

export async function setAuthCookies(tokens: AuthTokenPayload) {
  const { accessToken, refreshToken, expiresIn } = tokens;

  const cookieStore = await cookies();

  const isProduction = process.env.NODE_ENV === "production";

  // Default Expiration: Access token (15 mins), Refresh token (7 days)
  const accessTokenMaxAge = expiresIn || 15 * 60; // Default to 15 minutes if expiresIn is not provided
  const refreshTokenMaxAge = 7 * 24 * 60 * 60; // 7 days

  // 1. Set Access Token Cookie
  cookieStore.set("accessToken", accessToken, {
    name: "accessToken",
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    maxAge: accessTokenMaxAge,
  });

  // 2. Set Refresh Token Cookie (if provided)
  if (tokens.refreshToken) {
    cookieStore.set("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: "lax",
      path: "/",
      maxAge: refreshTokenMaxAge,
    });
  }
}

/**
 * Clears authentication cookies on logout
 */
export async function clearAuthCookies() {
  const cookieStore = await cookies();
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");
}

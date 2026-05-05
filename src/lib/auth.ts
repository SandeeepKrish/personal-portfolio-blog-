/**
 * auth.ts — JWT-based authentication utilities
 * Uses hardcoded credentials as specified in assignment requirements
 */
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

// Hardcoded admin credentials (as per assignment specification)
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin123";

// Secret key for JWT signing — in production, use an env variable
const SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET ?? "my-super-secret-portfolio-key-2024"
);

const COOKIE_NAME = "portfolio_auth_token";

/** Verify username and password against hardcoded credentials */
export function validateCredentials(username: string, password: string): boolean {
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
}

/** Sign a JWT token for the given username (1-day expiry) */
export async function signToken(username: string): Promise<string> {
  return await new SignJWT({ username, role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1d")
    .sign(SECRET);
}

/** Verify a JWT token; returns the payload or null if invalid */
export async function verifyToken(
  token: string
): Promise<{ username: string; role: string } | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET);
    return payload as { username: string; role: string };
  } catch {
    return null;
  }
}

/** Get the current auth token from cookies (server-side) */
export async function getAuthToken(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAME)?.value ?? null;
}

/** Check if the current request is authenticated */
export async function isAuthenticated(): Promise<boolean> {
  const token = await getAuthToken();
  if (!token) return false;
  const payload = await verifyToken(token);
  return payload !== null;
}

export { COOKIE_NAME };

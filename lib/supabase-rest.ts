import { cookies } from "next/headers";
import { getSupabaseConfig } from "./config";

type RequestOptions = {
  method?: "GET" | "POST" | "PATCH" | "DELETE";
  body?: unknown;
  token?: string;
  serviceRole?: boolean;
  prefer?: string;
};

export class SupabaseConfigError extends Error {}

export async function getSessionToken() {
  const store = await cookies();
  return store.get("san-admin-access-token")?.value ?? null;
}

export async function supabaseRequest<T>(
  path: string,
  { method = "GET", body, token, serviceRole, prefer }: RequestOptions = {},
): Promise<T> {
  const config = getSupabaseConfig();
  if (!config) {
    throw new SupabaseConfigError("Supabase is not configured.");
  }

  const authToken = serviceRole ? config.serviceRoleKey : token ?? config.anonKey;
  if (!authToken) {
    throw new SupabaseConfigError("The required Supabase server key is missing.");
  }

  const response = await fetch(`${config.url}${path}`, {
    method,
    headers: {
      apikey: config.anonKey,
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json",
      ...(prefer ? { Prefer: prefer } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
    cache: "no-store",
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Supabase request failed with ${response.status}`);
  }

  if (response.status === 204) {
    return null as T;
  }

  return (await response.json()) as T;
}

export async function requireAdminToken() {
  const token = await getSessionToken();
  if (!token) {
    throw new Error("You must be signed in.");
  }
  return token;
}

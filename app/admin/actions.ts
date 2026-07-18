"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logout() {
  const store = await cookies();
  store.delete("sam-admin-access-token");
  store.delete("sam-admin-refresh-token");
  redirect("/admin/login");
}

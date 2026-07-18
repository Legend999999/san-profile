"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logout() {
  const store = await cookies();
  store.delete("san-admin-access-token");
  store.delete("san-admin-refresh-token");
  redirect("/admin/login");
}

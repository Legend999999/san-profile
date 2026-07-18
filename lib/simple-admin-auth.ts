export const simpleAdminToken = "simple-admin-session";

export function simpleAdminConfigured() {
  return Boolean(process.env.ADMIN_USERNAME && process.env.ADMIN_PASSWORD);
}

export function verifySimpleAdminLogin(username: string, password: string) {
  return (
    simpleAdminConfigured() &&
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  );
}

export function isSimpleAdminSession(token: string | null | undefined) {
  return token === simpleAdminToken;
}

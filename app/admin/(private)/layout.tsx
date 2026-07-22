import Link from "next/link";
import { GitHubTokenPanel } from "@/components/admin/GitHubTokenPanel";
import { logout } from "../actions";

export default function AdminPrivateLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-layout">
      <aside className="sidebar">
        <Link className="brand" href="/admin">
          <span className="brand-mark">S</span>
          <span>San Admin</span>
        </Link>
        <nav className="sidebar-nav" aria-label="Admin navigation">
          <Link href="/admin">Dashboard</Link>
          <Link href="/admin/projects">Projects</Link>
          <Link href="/admin/projects/new">Add Project</Link>
          <Link href="/admin/settings">Website Settings</Link>
          <Link href="/">View Portfolio</Link>
          <form action={logout}>
            <button type="submit">Logout</button>
          </form>
        </nav>
        <GitHubTokenPanel />
      </aside>
      <main className="admin-main">{children}</main>
    </div>
  );
}

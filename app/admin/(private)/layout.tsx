import Link from "next/link";
import { logout } from "../actions";

export default function AdminPrivateLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-layout">
      <aside className="sidebar">
        <Link className="brand" href="/admin">
          <span className="brand-mark">ک</span>
          <span>کورد وێب Admin</span>
        </Link>
        <nav className="sidebar-nav" aria-label="ڕێنوێنی داشبۆرد">
          <Link href="/admin">داشبۆرد</Link>
          <Link href="/admin/projects">پڕۆژەکان</Link>
          <Link href="/admin/projects/new">زیادکردنی پڕۆژە</Link>
          <Link href="/admin/settings">ڕێکخستنەکانی ماڵپەڕ</Link>
          <Link href="/">بینینی ماڵپەڕ</Link>
          <form action={logout}>
            <button type="submit">چوونەدەرەوە</button>
          </form>
        </nav>
      </aside>
      <main className="admin-main">{children}</main>
    </div>
  );
}

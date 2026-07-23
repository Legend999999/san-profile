import { getWebsiteSettings } from "@/lib/data";
import { SettingsForm } from "@/components/admin/SettingsForm";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const settings = await getWebsiteSettings();

  return (
    <>
      <div className="admin-topbar">
        <div>
          <p className="eyebrow">ناوەڕۆکی دەستکاریکراو</p>
          <h1>ڕێکخستنەکانی ماڵپەڕ</h1>
        </div>
      </div>
      <SettingsForm settings={settings} />
    </>
  );
}

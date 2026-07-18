import { getWebsiteSettings } from "@/lib/data";
import { SettingsForm } from "@/components/admin/SettingsForm";

export default async function SettingsPage() {
  const settings = await getWebsiteSettings();

  return (
    <>
      <div className="admin-topbar">
        <div>
          <p className="eyebrow">Editable content</p>
          <h1>Website Settings</h1>
        </div>
      </div>
      <SettingsForm settings={settings} />
    </>
  );
}

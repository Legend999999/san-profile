import { ProjectForm } from "@/components/admin/ProjectForm";

export default function NewProject() {
  return (
    <>
      <div className="admin-topbar">
        <div>
          <p className="eyebrow">زیادکردنی کار</p>
          <h1>پڕۆژەی نوێ</h1>
        </div>
      </div>
      <ProjectForm />
    </>
  );
}

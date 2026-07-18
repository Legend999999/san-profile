import { ProjectForm } from "@/components/admin/ProjectForm";

export default function NewProject() {
  return (
    <>
      <div className="admin-topbar">
        <div>
          <p className="eyebrow">Add work</p>
          <h1>New Project</h1>
        </div>
      </div>
      <ProjectForm />
    </>
  );
}

import { notFound } from "next/navigation";
import { getAdminProjectById } from "@/lib/data";
import { ProjectForm } from "@/components/admin/ProjectForm";

export default async function EditProject({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await getAdminProjectById(id);
  if (!project) notFound();

  return (
    <>
      <div className="admin-topbar">
        <div>
          <p className="eyebrow">Edit work</p>
          <h1>{project.title}</h1>
        </div>
      </div>
      <ProjectForm project={project} />
    </>
  );
}

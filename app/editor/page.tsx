"use client"

import { useState } from "react"
import { EditorNavbar } from "@/components/editor/editor-navbar"
import { ProjectSidebar } from "@/components/editor/project-sidebar"
import { EditorHome } from "@/components/editor/editor-home"
import { CreateProjectDialog } from "@/components/editor/create-project-dialog"
import { RenameProjectDialog } from "@/components/editor/rename-project-dialog"
import { DeleteProjectDialog } from "@/components/editor/delete-project-dialog"
import { useProjectDialogs, MOCK_PROJECTS } from "@/hooks/use-project-dialogs"

export default function EditorPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const dialogs = useProjectDialogs()

  return (
    <div className="flex min-h-screen flex-col bg-base">
      <EditorNavbar
        isSidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
      />
      <ProjectSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        projects={MOCK_PROJECTS}
        onNewProject={dialogs.openCreate}
        onRename={dialogs.openRename}
        onDelete={dialogs.openDelete}
      />
      <main className="flex flex-1 pt-12">
        <EditorHome onNewProject={dialogs.openCreate} />
      </main>

      <CreateProjectDialog
        open={dialogs.activeDialog === "create"}
        name={dialogs.name}
        slug={dialogs.slug}
        loading={dialogs.loading}
        onNameChange={dialogs.setName}
        onSubmit={dialogs.submitCreate}
        onClose={dialogs.close}
      />

      <RenameProjectDialog
        open={dialogs.activeDialog === "rename"}
        currentName={dialogs.targetProject?.name ?? ""}
        name={dialogs.name}
        loading={dialogs.loading}
        onNameChange={dialogs.setName}
        onSubmit={dialogs.submitRename}
        onClose={dialogs.close}
      />

      <DeleteProjectDialog
        open={dialogs.activeDialog === "delete"}
        projectName={dialogs.targetProject?.name ?? ""}
        loading={dialogs.loading}
        onConfirm={dialogs.submitDelete}
        onClose={dialogs.close}
      />
    </div>
  )
}

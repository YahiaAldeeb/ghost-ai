"use client"

import { X, Plus, Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import type { MockProject } from "@/hooks/use-project-dialogs"

interface ProjectSidebarProps {
  isOpen: boolean
  onClose: () => void
  projects: MockProject[]
  onNewProject: () => void
  onRename: (project: MockProject) => void
  onDelete: (project: MockProject) => void
  className?: string
}

function ProjectItem({
  project,
  onRename,
  onDelete,
}: {
  project: MockProject
  onRename: (project: MockProject) => void
  onDelete: (project: MockProject) => void
}) {
  return (
    <div className="group flex items-center justify-between rounded-xl px-3 py-2 hover:bg-elevated">
      <span className="truncate text-sm text-copy-primary">{project.name}</span>
      {project.isOwned && (
        <div className="flex shrink-0 items-center gap-0.5 opacity-0 transition-opacity group-hover:opacity-100">
          <Button
            variant="ghost"
            size="icon-xs"
            onClick={() => onRename(project)}
            aria-label={`Rename ${project.name}`}
          >
            <Pencil className="h-3.5 w-3.5 text-copy-muted" />
          </Button>
          <Button
            variant="ghost"
            size="icon-xs"
            onClick={() => onDelete(project)}
            aria-label={`Delete ${project.name}`}
          >
            <Trash2 className="h-3.5 w-3.5 text-copy-muted" />
          </Button>
        </div>
      )}
    </div>
  )
}

export function ProjectSidebar({
  isOpen,
  onClose,
  projects,
  onNewProject,
  onRename,
  onDelete,
  className,
}: ProjectSidebarProps) {
  const ownedProjects = projects.filter((p) => p.isOwned)
  const sharedProjects = projects.filter((p) => !p.isOwned)

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={cn(
          "fixed top-12 left-0 z-50 flex h-[calc(100vh-3rem)] w-72 flex-col border-r border-surface-border bg-surface transition-transform duration-200 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full",
          className
        )}
      >
        <div className="flex items-center justify-between border-b border-surface-border px-4 py-3">
          <h2 className="text-sm font-medium text-copy-primary">Projects</h2>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <X className="h-4 w-4 text-copy-muted" />
          </Button>
        </div>

        <div className="flex flex-1 flex-col overflow-hidden">
          <Tabs defaultValue="my-projects" className="flex flex-1 flex-col">
            <TabsList className="mx-4 mt-3 w-auto">
              <TabsTrigger value="my-projects">My Projects</TabsTrigger>
              <TabsTrigger value="shared">Shared</TabsTrigger>
            </TabsList>

            <TabsContent value="my-projects" className="flex-1 overflow-y-auto px-2 py-2">
              {ownedProjects.length === 0 ? (
                <p className="px-2 py-4 text-center text-sm text-copy-muted">
                  No projects yet
                </p>
              ) : (
                <div className="flex flex-col gap-0.5">
                  {ownedProjects.map((project) => (
                    <ProjectItem
                      key={project.id}
                      project={project}
                      onRename={onRename}
                      onDelete={onDelete}
                    />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="shared" className="flex-1 overflow-y-auto px-2 py-2">
              {sharedProjects.length === 0 ? (
                <p className="px-2 py-4 text-center text-sm text-copy-muted">
                  No shared projects
                </p>
              ) : (
                <div className="flex flex-col gap-0.5">
                  {sharedProjects.map((project) => (
                    <ProjectItem
                      key={project.id}
                      project={project}
                      onRename={onRename}
                      onDelete={onDelete}
                    />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>

        <div className="border-t border-surface-border p-4">
          <Button className="w-full gap-2" size="default" onClick={onNewProject}>
            <Plus className="h-4 w-4" />
            New Project
          </Button>
        </div>
      </aside>
    </>
  )
}
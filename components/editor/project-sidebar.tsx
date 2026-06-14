"use client"

import { X, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

interface ProjectSidebarProps {
  isOpen: boolean
  onClose: () => void
  className?: string
}

export function ProjectSidebar({
  isOpen,
  onClose,
  className,
}: ProjectSidebarProps) {
  return (
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

          <TabsContent value="my-projects" className="flex-1 px-4 py-6">
            <p className="text-center text-sm text-copy-muted">
              No projects yet
            </p>
          </TabsContent>

          <TabsContent value="shared" className="flex-1 px-4 py-6">
            <p className="text-center text-sm text-copy-muted">
              No shared projects
            </p>
          </TabsContent>
        </Tabs>
      </div>

      <div className="border-t border-surface-border p-4">
        <Button className="w-full gap-2" size="default">
          <Plus className="h-4 w-4" />
          New Project
        </Button>
      </div>
    </aside>
  )
}

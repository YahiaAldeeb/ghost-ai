"use client"

import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

interface EditorHomeProps {
  onNewProject: () => void
}

export function EditorHome({ onNewProject }: EditorHomeProps) {
  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-xl font-medium text-copy-primary">
          Create a project or open an existing one
        </h1>
        <p className="text-sm text-copy-muted">
          Start a new architecture workspace, or choose a project from the sidebar.
        </p>
        <Button onClick={onNewProject} className="mt-2 gap-2">
          <Plus className="h-4 w-4" />
          New Project
        </Button>
      </div>
    </div>
  )
}

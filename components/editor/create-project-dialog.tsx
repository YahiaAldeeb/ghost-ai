"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface CreateProjectDialogProps {
  open: boolean
  name: string
  slug: string
  loading: boolean
  onNameChange: (value: string) => void
  onSubmit: () => void
  onClose: () => void
}

export function CreateProjectDialog({
  open,
  name,
  slug,
  loading,
  onNameChange,
  onSubmit,
  onClose,
}: CreateProjectDialogProps) {
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Project</DialogTitle>
          <DialogDescription>
            Give your project a name. The slug is generated automatically.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            onSubmit()
          }}
          className="flex flex-col gap-3"
        >
          <div className="flex flex-col gap-1.5">
            <label htmlFor="project-name" className="text-sm text-copy-secondary">
              Project name
            </label>
            <Input
              id="project-name"
              placeholder="My Project"
              value={name}
              onChange={(e) => onNameChange(e.target.value)}
              autoFocus
            />
          </div>

          {slug && (
            <p className="text-xs text-copy-muted">
              Slug: <span className="font-mono text-copy-secondary">{slug}</span>
            </p>
          )}

          <DialogFooter>
            <Button
              type="submit"
              disabled={!name.trim() || loading}
            >
              {loading ? "Creating…" : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

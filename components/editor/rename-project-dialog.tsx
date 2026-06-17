"use client"

import { useRef, useEffect } from "react"
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

interface RenameProjectDialogProps {
  open: boolean
  currentName: string
  name: string
  loading: boolean
  onNameChange: (value: string) => void
  onSubmit: () => void
  onClose: () => void
}

export function RenameProjectDialog({
  open,
  currentName,
  name,
  loading,
  onNameChange,
  onSubmit,
  onClose,
}: RenameProjectDialogProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => {
        inputRef.current?.focus()
        inputRef.current?.select()
      })
    }
  }, [open])

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rename Project</DialogTitle>
          <DialogDescription>
            Currently named <span className="font-medium text-copy-secondary">{currentName}</span>
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
            <label htmlFor="rename-input" className="text-sm text-copy-secondary">
              New name
            </label>
            <Input
              ref={inputRef}
              id="rename-input"
              value={name}
              onChange={(e) => onNameChange(e.target.value)}
            />
          </div>

          <DialogFooter>
            <Button
              type="submit"
              disabled={!name.trim() || loading}
            >
              {loading ? "Renaming…" : "Rename"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

"use client"

import { PanelLeftOpen, PanelLeftClose } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface EditorNavbarProps {
  isSidebarOpen: boolean
  onToggleSidebar: () => void
  className?: string
}

export function EditorNavbar({
  isSidebarOpen,
  onToggleSidebar,
  className,
}: EditorNavbarProps) {
  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-40 flex h-12 items-center border-b border-surface-border bg-surface",
        className
      )}
    >
      <div className="flex flex-1 items-center px-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleSidebar}
          aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
        >
          {isSidebarOpen ? (
            <PanelLeftClose className="h-5 w-5 text-copy-secondary" />
          ) : (
            <PanelLeftOpen className="h-5 w-5 text-copy-secondary" />
          )}
        </Button>
      </div>

      <div className="flex flex-1 items-center justify-center" />

      <div className="flex flex-1 items-center justify-end px-3" />
    </nav>
  )
}

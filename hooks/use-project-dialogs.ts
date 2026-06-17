"use client"

import { useState, useCallback } from "react"

export interface MockProject {
  id: string
  name: string
  slug: string
  isOwned: boolean
}

export const MOCK_PROJECTS: MockProject[] = [
  { id: "1", name: "E-Commerce Platform", slug: "e-commerce-platform", isOwned: true },
  { id: "2", name: "Chat Service", slug: "chat-service", isOwned: true },
  { id: "3", name: "Team Dashboard", slug: "team-dashboard", isOwned: false },
]

type DialogType = "create" | "rename" | "delete" | null

function toSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
}

export function useProjectDialogs() {
  const [activeDialog, setActiveDialog] = useState<DialogType>(null)
  const [targetProject, setTargetProject] = useState<MockProject | null>(null)
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)

  const slug = toSlug(name)

  const openCreate = useCallback(() => {
    setName("")
    setTargetProject(null)
    setActiveDialog("create")
  }, [])

  const openRename = useCallback((project: MockProject) => {
    setName(project.name)
    setTargetProject(project)
    setActiveDialog("rename")
  }, [])

  const openDelete = useCallback((project: MockProject) => {
    setTargetProject(project)
    setActiveDialog("delete")
  }, [])

  const close = useCallback(() => {
    setActiveDialog(null)
    setTargetProject(null)
    setName("")
    setLoading(false)
  }, [])

  const submitCreate = useCallback(() => {
    if (!name.trim()) return
    setLoading(true)
    setTimeout(() => {
      close()
    }, 400)
  }, [name, close])

  const submitRename = useCallback(() => {
    if (!name.trim() || !targetProject) return
    setLoading(true)
    setTimeout(() => {
      close()
    }, 400)
  }, [name, targetProject, close])

  const submitDelete = useCallback(() => {
    if (!targetProject) return
    setLoading(true)
    setTimeout(() => {
      close()
    }, 400)
  }, [targetProject, close])

  return {
    activeDialog,
    targetProject,
    name,
    slug,
    loading,
    setName,
    openCreate,
    openRename,
    openDelete,
    close,
    submitCreate,
    submitRename,
    submitDelete,
  }
}

"use client"

import { useState, useCallback, useEffect, useRef } from "react"


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
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const clearPending = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }, [])
  const slug = toSlug(name)
  const openCreate = useCallback(() => {
    clearPending()
    setLoading(false)
    setName("")
    setTargetProject(null)
    setActiveDialog("create")
  }, [clearPending])
  const openRename = useCallback((project: MockProject) => {
    clearPending()
    setLoading(false)
    setName(project.name)
    setTargetProject(project)
    setActiveDialog("rename")
  }, [clearPending])
  const openDelete = useCallback((project: MockProject) => {
    clearPending()
    setLoading(false)
    setTargetProject(project)
    setActiveDialog("delete")
  }, [clearPending])
  const close = useCallback(() => {
    clearPending()
    setActiveDialog(null)
    setTargetProject(null)
    setName("")
    setLoading(false)
  }, [clearPending])
  useEffect(() => () => clearPending(), [clearPending])
  const scheduleClose = useCallback(() => {
    clearPending()
    timeoutRef.current = setTimeout(() => {
      timeoutRef.current = null
      close()
    }, 400)
  }, [clearPending, close])
  const submitCreate = useCallback(() => {
    if (loading || !name.trim()) return
    setLoading(true)
    scheduleClose()
  }, [name, loading, scheduleClose])
  const submitRename = useCallback(() => {
    if (loading || !name.trim() || !targetProject) return
    setLoading(true)
    scheduleClose()
  }, [name, targetProject, loading, scheduleClose])
  const submitDelete = useCallback(() => {
    if (loading || !targetProject) return
    setLoading(true)
    scheduleClose()
  }, [targetProject, loading, scheduleClose])
}

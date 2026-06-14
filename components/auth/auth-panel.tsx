import { Sparkles, Share2, FileText } from "lucide-react"

const features = [
  {
    icon: Sparkles,
    title: "AI Architecture Generation",
    description:
      "Describe your system, AI maps it to nodes and edges on a live canvas.",
  },
  {
    icon: Share2,
    title: "Real-time Collaboration",
    description:
      "Live cursors, presence indicators, and shared node editing across your team.",
  },
  {
    icon: FileText,
    title: "Instant Spec Generation",
    description:
      "Export a complete Markdown technical spec directly from the canvas graph.",
  },
]

export function AuthPanel() {
  return (
    <div className="hidden lg:flex lg:w-1/2 flex-col bg-surface">
      <div className="flex items-center gap-2.5 px-8 pt-8">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand">
          <span className="text-sm font-bold text-base">G</span>
        </div>
        <span className="text-sm font-semibold text-copy-primary">
          Ghost AI
        </span>
      </div>

      <div className="flex flex-1 flex-col justify-center px-12">
        <h1 className="text-3xl font-bold leading-tight text-copy-primary mb-4">
          Design systems at the
          <br />
          speed of thought.
        </h1>
        <p className="text-sm leading-relaxed text-copy-muted mb-10 max-w-md">
          Describe your architecture in plain English. Ghost AI maps it to a
          shared canvas your whole team can refine in real time.
        </p>

        <div className="space-y-6">
          {features.map((f) => (
            <div key={f.title} className="flex items-start gap-3.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent-dim">
                <f.icon className="h-4.5 w-4.5 text-brand" />
              </div>
              <div>
                <p className="text-sm font-semibold text-copy-primary">
                  {f.title}
                </p>
                <p className="text-sm text-copy-muted mt-0.5">{f.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

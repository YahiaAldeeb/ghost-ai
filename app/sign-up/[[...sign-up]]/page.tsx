import { SignUp } from "@clerk/nextjs"
import { AuthPanel } from "@/components/auth/auth-panel"

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen bg-base">
      <AuthPanel />
      <div className="flex w-full lg:w-1/2 items-center justify-center p-8">
        <SignUp fallbackRedirectUrl="/editor" />
      </div>
    </div>
  )
}

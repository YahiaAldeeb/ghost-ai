import { SignIn } from "@clerk/nextjs"
import { AuthPanel } from "@/components/auth/auth-panel"

export default function SignInPage() {
  return (
    <div className="flex min-h-screen bg-base">
      <AuthPanel />
      <div className="flex w-full lg:w-1/2 items-center justify-center p-8">
        <SignIn fallbackRedirectUrl="/editor" />
      </div>
    </div>
  )
}

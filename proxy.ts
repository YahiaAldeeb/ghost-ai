import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"

const toRoutePattern = (value: string | undefined, fallback: string) => {
  const raw = value?.trim()
  if (!raw) return `${fallback}(.*)`
  try {
    const parsed = new URL(raw, "http://localhost")
    const path = parsed.pathname || fallback
    return `${path}(.*)`
  } catch {
    return `${fallback}(.*)`
  }
}
const isPublicRoute = createRouteMatcher([
  "/",
  toRoutePattern(process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL, "/sign-in"),
  toRoutePattern(process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL, "/sign-up"),
])

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) await auth.protect()
})

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
}

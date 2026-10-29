import { SignIn } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = { title: "دخول" };

// There is no sign-up: the Clerk instance is Invite-only, so this page is only
// for the app developer. The form follows the page's light/dark theme through
// the `color-scheme` that globals.css sets.
export default function SignInPage() {
  return (
    <div className="auth-page">
      <Suspense>
        <SignIn forceRedirectUrl="/admin" />
      </Suspense>
    </div>
  );
}

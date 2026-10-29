import "server-only";
import { auth, currentUser } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";

// True only for the app developer: signed in, and the primary email is verified
// and equals ADMIN_EMAIL from the environment (never written in the code).
export async function isAdmin() {
  const { isAuthenticated } = await auth();
  if (!isAuthenticated) return false;
  const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const email = (await currentUser())?.primaryEmailAddress;
  return Boolean(
    adminEmail &&
    email &&
    email.verification?.status === "verified" &&
    email.emailAddress.trim().toLowerCase() === adminEmail,
  );
}

// For pages: signed-out visitors go to sign-in, anyone else who isn't the
// developer gets a 404 and never sees the data.
export async function requireAdmin() {
  await auth.protect();
  if (!(await isAdmin())) notFound();
}

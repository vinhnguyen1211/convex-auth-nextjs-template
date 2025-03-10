import { isAuthenticatedNextjs } from "@convex-dev/auth/nextjs/server";

export async function GET() {
  const isAuthenticated = await isAuthenticatedNextjs();
  return Response.json(
    { someData: isAuthenticated },
    { status: isAuthenticated ? 200 : 403 },
  );
}
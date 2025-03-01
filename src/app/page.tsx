
import { api } from '../../convex/_generated/api';
import { fetchQuery } from "convex/nextjs";
import { convexAuthNextjsToken } from "@convex-dev/auth/nextjs/server";
import SignInForm from './SignInForm';

export default async function Home() {

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <SignInForm />
    </main>
  );
}
import { Password } from "@convex-dev/auth/providers/Password";

import { convexAuth } from "@convex-dev/auth/server";
 
export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [Password({
    validatePasswordRequirements: (password: string) => {
      if (password.length < 8) {
        return "Password must be at least 8 characters long";
      }
      return null;
    }
  })],
});
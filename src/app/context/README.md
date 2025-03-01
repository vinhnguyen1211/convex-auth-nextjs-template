# Authentication Context

This directory contains a simple authentication context for the application. It provides a way to manage authentication state and actions throughout the application without modifying existing files.

## Files

- `AuthContext.tsx`: Contains the main authentication context, provider, and hook.
- `AuthWrapper.tsx`: A simple wrapper component that uses the AuthProvider.

## How to Use

### 1. Wrap your components with the AuthWrapper

You can wrap any component with the AuthWrapper to provide authentication context:

```tsx
import { AuthWrapper } from './context/AuthWrapper';
import YourComponent from './components/YourComponent';

export default function SomePage() {
  return (
    <AuthWrapper>
      <YourComponent />
    </AuthWrapper>
  );
}
```

### 2. Use the useAuth hook in your components

```tsx
import { useAuth } from './context/AuthContext';

export default function YourComponent() {
  const { isAuthenticated, isLoading, user, signIn, signOut } = useAuth();

  // Now you can use these values and functions
  return (
    <div>
      {isAuthenticated ? (
        <button onClick={signOut}>Sign Out</button>
      ) : (
        <button onClick={() => signIn('password', formData)}>Sign In</button>
      )}
    </div>
  );
}
```

### 3. Example Component

See `components/AuthStatus.tsx` for an example of how to use the authentication context.

## Authentication State

The authentication context provides the following state:

- `isAuthenticated`: Boolean indicating if the user is authenticated
- `isLoading`: Boolean indicating if the authentication state is loading
- `user`: The user object if authenticated, null otherwise
- `signIn`: Function to sign in a user
- `signOut`: Function to sign out a user

## Integration with Convex

This authentication context is built on top of Convex authentication and uses the following from Convex:

- `useAuthToken`: Hook to get the authentication token
- `useAuthActions`: Hook to get authentication actions (signIn, signOut)
- `useQuery`: Hook to query the user data from the Convex backend 
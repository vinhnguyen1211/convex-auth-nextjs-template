'use client';

import { useAuth } from '../context/AuthContext';

export default function AuthStatus() {
  const { isAuthenticated, isLoading, user, signOut } = useAuth();

  if (isLoading) {
    return <div className="text-gray-500">Loading authentication status...</div>;
  }

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold mb-2">Authentication Status</h2>
      <p className="mb-2">
        Status: <span className={isAuthenticated ? "text-green-600 font-bold" : "text-red-600 font-bold"}>
          {isAuthenticated ? 'Authenticated' : 'Not Authenticated'}
        </span>
      </p>
      {isAuthenticated && user && (
        <div className="mb-2">
          <p>User ID: {user._id}</p>
          <p>Email: {user.email}</p>
        </div>
      )}
      {isAuthenticated && (
        <button
          onClick={() => signOut()}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
        >
          Sign Out
        </button>
      )}
    </div>
  );
} 
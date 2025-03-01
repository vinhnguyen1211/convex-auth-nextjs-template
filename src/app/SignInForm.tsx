'use client';

import { useEffect, useState } from 'react';
import { useMutation } from 'convex/react';
import { useAuthActions, useAuthToken } from "@convex-dev/auth/react";
import { api } from '../../convex/_generated/api';
import { useAuth } from './context/AuthContext';

export default function SignInForm() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { signIn, signOut } = useAuthActions();
  const { isAuthenticated, user, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    const formData = new FormData(e.currentTarget as HTMLFormElement);
    formData.set('flow', isSignUp ? 'signUp' : 'signIn');
    console.log(' handleSubmit -> formData:', formData.get('email'));
    console.log(' handleSubmit -> formData:', formData.get('password'));
    void signIn("password", formData,);
  };

  return (
    <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
      {(isAuthenticated && user) ? (
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Welcome, {user.name || user.email}
          </h2>
          <div className="mt-6 text-center">
            <button onClick={() => signOut()}>Sign out</button>
          </div>
        </div>
      ) : (
        <>
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              {isSignUp ? 'Create an account' : 'Sign in to your account'}
            </h2>
          </div>
          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded">
              {error}
            </div>
          )}
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email" className="sr-only">Email address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {isSignUp ? 'Sign up' : 'Sign in'}
              </button>
            </div>

            <div className="text-center">
              <button
                type="button"
                className="text-indigo-600 hover:text-indigo-500"
                onClick={() => setIsSignUp(!isSignUp)}
              >
                {isSignUp
                  ? 'Already have an account? Sign in'
                  : "Don't have an account? Sign up"}
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}
import { FormEvent, useState } from 'react';
import { Navigate, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ApiError } from '../api/fakeStoreApi';

export default function LoginPage() {
  const { user, login } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // If already logged in
  if (user) {
    const redirectTo =
      (location.state as { from?: string } | null)?.from ?? '/';

    return <Navigate to={redirectTo} replace />;
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError(null);

    if (!username.trim() || !password.trim()) {
      setError('Please enter username and password.');
      return;
    }

    setSubmitting(true);

    try {
      // Login using AuthContext
      await login(username.trim(), password);

      navigate('/', { replace: true });
    } catch (err) {
      setError(
        err instanceof ApiError
          ? err.message
          : 'Invalid username or password.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-12 sm:px-6">

      <div className="rounded-2xl border border-ink-100 bg-white p-8 shadow-card">

        {/* Heading */}
        <div className="text-center">
          <h1 className="font-display text-2xl font-bold text-ink">
            Welcome back
          </h1>

          <p className="mt-2 text-sm text-ink-400">
            Log in to continue shopping
          </p>
        </div>

        {/* Login Form */}
        <form
          onSubmit={handleSubmit}
          className="mt-6 flex flex-col gap-4"
        >

          {/* Username */}
          <div>
            <label
              htmlFor="username"
              className="mb-1 block text-sm font-medium text-ink-500"
            >
              Username
            </label>

            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              autoComplete="username"
              required
              className="w-full rounded-xl border border-ink-100 bg-white px-4 py-3 text-sm outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-medium text-ink-500"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              autoComplete="current-password"
              required
              className="w-full rounded-xl border border-ink-100 bg-white px-4 py-3 text-sm outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
            />
          </div>

          {/* Error */}
          {error && (
            <p
              className="rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-600"
              role="alert"
            >
              {error}
            </p>
          )}

          {/* Login Button */}
          <button
            type="submit"
            disabled={submitting}
            className="mt-2 w-full rounded-full bg-ink py-3 text-sm font-semibold text-white transition hover:bg-amber-500 hover:text-ink disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Register */}
        <p className="mt-6 text-center text-sm text-ink-400">
          Don't have an account?{' '}
          <Link
            to="/register"
            className="font-semibold text-amber-600 hover:text-amber-700 hover:underline"
          >
            Register
          </Link>
        </p>

      </div>
    </div>
  );
}
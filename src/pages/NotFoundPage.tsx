import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-4 text-center">
      <p className="font-display text-6xl font-bold text-ink-100">404</p>
      <h1 className="mt-2 font-display text-2xl font-bold text-ink">Page not found</h1>
      <p className="mt-2 text-ink-400">The page you're looking for doesn't exist or has moved.</p>
      <Link
        to="/"
        className="mt-6 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white hover:bg-ink-700"
      >
        Back to shop
      </Link>
    </div>
  );
}

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div
      className="mx-auto flex max-w-md flex-col items-center gap-4 rounded-2xl border border-ink-100 bg-white px-6 py-10 text-center shadow-card"
      role="alert"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-2xl text-red-500">
        !
      </div>
      <div>
        <p className="font-display text-lg font-semibold text-ink">Something went wrong</p>
        <p className="mt-1 text-sm text-ink-400">{message}</p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="rounded-full bg-ink px-5 py-2 text-sm font-semibold text-white transition hover:bg-ink-700"
        >
          Try again
        </button>
      )}
    </div>
  );
}

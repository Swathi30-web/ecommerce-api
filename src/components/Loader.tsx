interface LoaderProps {
  label?: string;
}

export default function Loader({ label = 'Loading' }: LoaderProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-24" role="status" aria-live="polite">
      <span className="h-10 w-10 animate-spin rounded-full border-4 border-ink-100 border-t-amber-400" />
      <p className="text-sm font-medium text-ink-400">{label}…</p>
    </div>
  );
}

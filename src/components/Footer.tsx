export default function Footer() {
  return (
    <footer className="mt-16 border-t border-ink-100 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 text-center text-sm text-ink-400 sm:px-6">
        <p>Built with React, TypeScript & Tailwind CSS — data from the Fake Store API.</p>
        <p className="mt-1">© {new Date().getFullYear()} Marketplace. For demo purposes only.</p>
      </div>
    </footer>
  );
}

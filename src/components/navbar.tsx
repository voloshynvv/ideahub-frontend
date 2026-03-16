import { Link } from "@tanstack/react-router";

export const Navbar = () => {
  return (
    <header className="flex items-center justify-between gap-4 py-6">
      <div>
        <Link to="/" className="text-2xl font-bold">
          IdeasHub
        </Link>
        <p className="text-muted-foreground text-sm">
          Thoughts worth thinking about.
        </p>
      </div>
      {/* TODO: add dark mode toggle */}
      <div>darkmode</div>
    </header>
  );
};

export default function Navbar() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/20 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="text-xl font-semibold tracking-tight">
          VisiWeal
        </div>

        <nav className="hidden gap-8 md:flex text-sm text-white/70">
          <a href="#">Home</a>
          <a href="#">Services</a>
          <a href="#">About</a>
          <a href="#">Insights</a>
          <a href="#">Contact</a>
        </nav>

        <button className="rounded-full bg-teal-500 px-5 py-2 text-sm font-medium text-black transition hover:bg-teal-400">
          Book a Strategic Consultation
        </button>
      </div>
    </header>
  );
}
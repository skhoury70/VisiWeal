import { Container } from "@/components/ui/container";

export default function Navbar() {
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-border bg-surface/80 backdrop-blur-lg">
      <Container className="flex items-center justify-between py-4">
        <span className="text-xl font-semibold tracking-tight text-text-primary">
          VisiWeal
        </span>

        <div className="hidden items-center gap-8 text-sm text-text-secondary md:flex">
          <a href="#" className="transition-colors hover:text-text-primary">Services</a>
          <a href="#" className="transition-colors hover:text-text-primary">About</a>
          <a href="#" className="transition-colors hover:text-text-primary">Contact</a>
        </div>
      </Container>
    </nav>
  );
}

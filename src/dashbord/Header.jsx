import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="border-b border-primary/10 bg-pink-100 shadow-md">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        
        {/* Logo & Brand Name */}
        <div className="flex items-center gap-4">
          <img src="/logo.png" alt="Sarthi Logo" className="w-12 h-12" />
          <Link to="/" className="text-3xl font-bold text-primary">
            Sarthi
          </Link>
        </div>

        {/* Navigation Menu */}
        <nav className="flex space-x-6">
          <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/notifications" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            Notifications
          </Link>
          <Link to="/profile" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            Profile
          </Link>
          <Link to="/support" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            Support
          </Link>
        </nav>
      </div>
    </header>
  );
}

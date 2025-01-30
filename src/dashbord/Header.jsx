import Link from "next/link"

export function Header() {
  return (
    <header className="border-b border-primary/10 bg-background">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-primary">
          sarthi
        </Link>
        <nav className="flex space-x-6">
          <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            home
          </Link>
          <Link href="/notifications" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            notifications
          </Link>
          <Link href="/profile" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            profile
          </Link>
          <Link href="/support" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            support
          </Link>
        </nav>
      </div>
    </header>
  )
}



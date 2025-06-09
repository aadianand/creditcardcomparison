import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">CardCompare India</h3>
            <p className="text-muted-foreground">
              Find and compare the best credit cards from major Indian banks with our AI-powered search.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/compare" className="text-muted-foreground hover:text-primary transition-colors">
                  Compare Cards
                </Link>
              </li>
              <li>
                <Link href="/banks" className="text-muted-foreground hover:text-primary transition-colors">
                  Banks
                </Link>
              </li>
              <li>
                <Link href="/chat" className="text-muted-foreground hover:text-primary transition-colors">
                  AI Assistant
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Disclaimer</h3>
            <p className="text-muted-foreground text-sm">
              This is a demo application. Card information may not be up to date. Please verify all details with the
              respective banks before applying.
            </p>
          </div>
        </div>
        <div className="mt-8 pt-4 border-t text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} CardCompare India. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

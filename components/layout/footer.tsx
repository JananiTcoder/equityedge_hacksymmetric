import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Educational Disclaimer */}
        <div className="mb-8 p-4 rounded-[var(--radius-lg)] bg-[var(--color-surface-subtle)] border border-[var(--color-border)]">
          <p className="text-[var(--text-body-sm)] text-[var(--color-text-muted)]">
            <span className="font-medium text-[var(--color-text-primary)]">Educational Disclaimer:</span>{" "}
            EquityEdge is for educational purposes only. We do not provide investment advice,
            stock recommendations, or financial guidance. Always consult with a qualified
            financial advisor before making investment decisions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="text-xl font-bold text-[var(--color-text-primary)]">
              <span className="text-[var(--color-accent)]">Equity</span>
              <span>Edge</span>
            </Link>
            <p className="mt-2 text-[var(--text-body-sm)] text-[var(--color-text-muted)] max-w-md">
              Learn to read companies, not tips. Build your financial literacy and make
              confident investment decisions based on fundamentals.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-[var(--color-text-primary)] mb-3">Explore</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/market-statistics"
                  className="text-[var(--text-body-sm)] text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors"
                >
                  Market Statistics
                </Link>
              </li>
              <li>
                <Link
                  href="/company/search"
                  className="text-[var(--text-body-sm)] text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors"
                >
                  Search Companies
                </Link>
              </li>
              <li>
                <Link
                  href="/learn"
                  className="text-[var(--text-body-sm)] text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors"
                >
                  Learning Hub
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-[var(--color-text-primary)] mb-3">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/privacy"
                  className="text-[var(--text-body-sm)] text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-[var(--text-body-sm)] text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-[var(--color-border)]">
          <p className="text-[var(--text-body-xs)] text-[var(--color-text-muted)] text-center">
            © {new Date().getFullYear()} EquityEdge. All rights reserved.
            Data sourced from public filings.
          </p>
        </div>
      </div>
    </footer>
  );
}

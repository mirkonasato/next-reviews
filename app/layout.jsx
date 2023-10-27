import Link from 'next/link';
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col px-4 py-2 min-h-screen">
        <header>
          <nav>
            <ul className="flex gap-2">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/reviews">Reviews</Link>
              </li>
              <li>
                <Link href="/about" prefetch={false}>About</Link>
              </li>
            </ul>
          </nav>
        </header>
        <main className="grow py-3">
          {children}
        </main>
        <footer className="border-t py-3 text-center text-xs">
          Game data and images courtesy
          of <a href="https://rawg.io/" target="_blank">RAWG</a>
        </footer>
      </body>
    </html>
  );
}

import Link from "next/link"

export function Footer() {
  return (
    <footer className="w-full py-6 text-center text-sm text-muted-foreground bg-card/90 backdrop-blur-sm border-t border-border mt-8">
      <p>
        This project was built for a bounty campaign granting Venta & Superteam the right to feature, maintain, and
        extend work with attribution. Made with love{" "}
        <Link
          href="https://x.com/1noobstar"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          @1noobstar
        </Link>
      </p>
    </footer>
  )
}

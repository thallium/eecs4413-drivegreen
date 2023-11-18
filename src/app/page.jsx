import Link from 'next/link';

const linkStyle = {
  fontSize: '2rem',
  margin: "1rem",
  textDecoration: "underline",
  color: 'blue'
};

export default async function Home() {
  return (
    <main className="min-h-screen flex-col items-center justify-between p-24 space-y-6">
      <div className="z-10 w-full items-center justify-between font-mono text-sm lg:flex">
        <Link href="/vehicles/" style={linkStyle}>
          1.Vehicles page
        </Link>
        <Link href="/shoppingCart/" style={linkStyle}>
          2.ShoppingCart page
        </Link>
        <Link href="/order/" style={linkStyle}>
          3.Order page
        </Link>
      </div>
      <div className="z-10 w-full items-center justify-between font-mono text-sm lg:flex">
        <Link href="/admin/" className="text-cyan-500 underline text-xl">
          Admin dashboard
        </Link>
      </div>
    </main>
  );
}

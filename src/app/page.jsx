import Link from 'next/link';
import Hero from './components/Home/Hero';
import ListHotdeal from './components/Home/HotDeal';

const linkStyle = {
  fontSize: '2rem',
  margin: "1rem",
  textDecoration: "underline",
  color: 'blue'
};

export default async function Home() {

  return (
    <main className="min-h-screen flex-col items-center justify-between p-4 space-y-6">
      <Hero />
      <ListHotdeal />
      <div className="z-10 w-full items-center justify-between font-mono text-sm lg:flex">
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

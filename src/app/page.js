import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        Read <Link href="/viewRoute1/">this Route1 page!</Link>
        <br></br>
        Read <Link href="/viewRoute2/">this Route2 page!</Link>
      </div>
    </main>
  )
}

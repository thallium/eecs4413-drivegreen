import Link from 'next/link';
import { prisma } from './backend/db/dbClient';

export default async function Home() {
  let vehicles = await prisma.vehicle.findMany();
  return (
    <main className="min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        Read <Link href="/viewRoute1/">this Route1 page!</Link>
        <br></br>
        Read <Link href="/viewRoute2/">this Route2 page!</Link>
        <br></br>
        <Link href="/vehicles/">Vehicles page</Link>
      </div>
      
    </main>
  )
}

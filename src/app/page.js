import Link from 'next/link';
import { prisma } from './backend/db/dbClient';

const linkStyle = {
  fontSize: '2rem',
  margin: "1rem",
  textDecoration: "none",
  color: 'blue'
};

export default async function Home() {
  let vehicles = await prisma.vehicle.findMany();
  return (
    <main className="min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <Link href="/vehicles/" style={linkStyle}>Vehicles page</Link>
        <br></br>
      </div>
      
    </main>
  )
}

import Link from 'next/link';
import { useRouter } from 'next/router'

export default function AddVehicle() {
  const router = useRouter()

  const handleSubmit = async () => {
    
  }
  
  return (
    <>
      <h1>First Route</h1>
      <h2>
        <Link href="/">Back to home</Link>
      </h2>
    </>
  );
}
import Link from "next/link";

function Hero() {
  return (
    <div className="hero bg-base-300">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <img
          src="/HomeCar.jpg"
          className="max-w-sm rounded-lg shadow-2xl"
        />
        <div>
          <h1 className="text-5xl font-bold">Welcome to DriveGreen!</h1>
          <p className="py-6">
            View hot deals below, or browse the whole catalogue by clicking below button.
          </p>
          <Link href="/vehicles/" className="btn btn-primary">All Vehicles</Link>
        </div>
      </div>
    </div>
  );
}

export default Hero;

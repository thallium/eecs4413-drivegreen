import Hero from './components/Home/Hero';
import ListHotdeal from './components/Home/HotDeal';


export default function Home() {

  return (
    <main className="min-h-screen flex-col items-center justify-between p-4 space-y-6">
      <Hero />
      <ListHotdeal />
    </main>
  );
}

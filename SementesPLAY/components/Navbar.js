import { UserIcon, HomeIcon } from '@heroicons/react/24/outline';

export default function Navbar() {
  return (
    <nav className="w-full flex justify-center items-center py-4 bg-glass backdrop-blur-md border-b border-primary">
      <div className="flex gap-8 items-center">
        <a href="/" className="flex items-center gap-2 text-primary font-gamer text-xl">
          <HomeIcon className="w-6 h-6" />
          Início
        </a>
        <a href="#destaques" className="text-white/80 hover:text-primary transition">Destaques</a>
        <a href="#cidades" className="text-white/80 hover:text-primary transition">Cidades</a>
        <a href="#criadores" className="text-white/80 hover:text-primary transition">Criadores</a>
        <button className="ml-8 flex items-center gap-2 bg-primary text-secondary px-4 py-2 rounded-lg font-bold shadow hover:scale-105 transition">
          <UserIcon className="w-5 h-5" />
          Login
        </button>
      </div>
    </nav>
  );
} 
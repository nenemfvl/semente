import { UserIcon, HomeIcon, BellIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useAuth } from './AuthProvider';

export default function Navbar() {
  const { user } = useAuth();

  return (
    <nav className="w-full flex justify-center items-center py-4 bg-glass backdrop-blur-md border-b border-primary">
      <div className="flex gap-6 items-center">
        <Link href="/" className="flex items-center gap-2 text-primary font-gamer text-xl">
          <HomeIcon className="w-6 h-6" />
          Início
        </Link>
        <Link href="/feed" className="text-white/80 hover:text-primary transition">Feed</Link>
        <Link href="/notificacoes" className="flex items-center gap-1 text-white/80 hover:text-primary transition">
          <BellIcon className="w-5 h-5" /> Notificações
        </Link>
        <Link href="/suporte" className="flex items-center gap-1 text-white/80 hover:text-primary transition">
          <ChatBubbleLeftRightIcon className="w-5 h-5" /> Suporte
        </Link>
        {user ? (
          <>
            <Link href="/painel" className="flex items-center gap-2 bg-primary text-secondary px-4 py-2 rounded-lg font-bold shadow hover:scale-105 transition">
              <UserIcon className="w-5 h-5" /> Painel
            </Link>
            <button onClick={() => { window.location.href = '/api/logout'; }} className="text-white/60 hover:text-primary transition ml-2">Sair</button>
          </>
        ) : (
          <>
            <Link href="/login" className="flex items-center gap-2 bg-primary text-secondary px-4 py-2 rounded-lg font-bold shadow hover:scale-105 transition">
              <UserIcon className="w-5 h-5" /> Login
            </Link>
            <Link href="/cadastro" className="text-primary hover:underline ml-2">Cadastro</Link>
          </>
        )}
      </div>
    </nav>
  );
} 
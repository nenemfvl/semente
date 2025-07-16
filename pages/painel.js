import { useEffect, useState } from 'react';
import { useAuth } from '../components/AuthProvider';
import { db } from '../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Painel() {
  const { user } = useAuth();
  const [perfil, setPerfil] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      const fetchPerfil = async () => {
        setLoading(true);
        const ref = doc(db, 'usuarios', user.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          const data = snap.data();
          setPerfil(data);
          // Bloquear se não aceitou os termos
          if (!data.aceiteTermos) {
            router.replace('/termos');
          }
        }
        setLoading(false);
      };
      fetchPerfil();
    } else {
      setLoading(false);
    }
  }, [user, router]);

  if (loading) return <div className="text-center text-white mt-10">Carregando...</div>;
  if (!user) return <div className="text-center text-white mt-10">Faça login para acessar o painel.</div>;
  if (!perfil) return <div className="text-center text-white mt-10">Perfil não encontrado.</div>;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-gamer">
      <div className="bg-glass p-8 rounded-xl shadow-2xl w-full max-w-2xl backdrop-blur-lg border border-primary">
        <h2 className="text-2xl font-gamer text-primary mb-6 text-center">Painel do Usuário</h2>
        <div className="mb-4 text-white/90 text-lg text-center">Bem-vindo, {perfil.nome || perfil.email}!</div>
        <div className="mb-4 text-white/80 text-center">Papel: <span className="font-bold text-primary">{perfil.papel}</span></div>
        <div className="flex flex-col gap-3 items-center mb-6">
          <Link href="/perfil" className="bg-primary text-secondary px-4 py-2 rounded-lg font-bold shadow hover:scale-105 transition">Editar Perfil</Link>
          {/* Opções dinâmicas conforme papel */}
          {perfil.papel === 'usuario' && (
            <>
              <Link href="/solicitar-criador" className="text-primary hover:underline">Quero ser Criador de Conteúdo</Link>
              <Link href="/solicitar-cidade" className="text-primary hover:underline">Quero ser Dono de Cidade</Link>
            </>
          )}
          {perfil.papel === 'criador' && (
            <Link href="/vincular-cidade" className="text-primary hover:underline">Vincular-se a uma Cidade</Link>
          )}
          {perfil.papel === 'dono_cidade' && (
            <Link href="/aprovar-vinculos" className="text-primary hover:underline">Aprovar Vínculos de Jogadores/Criadores</Link>
          )}
          {perfil.papel === 'admin' && (
            <Link href="/admin" className="text-primary hover:underline">Painel Administrativo</Link>
          )}
        </div>
        <div className="text-white/60 text-sm text-center">Última atualização: {perfil.atualizadoEm ? new Date(perfil.atualizadoEm.seconds ? perfil.atualizadoEm.seconds * 1000 : perfil.atualizadoEm).toLocaleString('pt-BR') : '-'}</div>
      </div>
    </main>
  );
} 
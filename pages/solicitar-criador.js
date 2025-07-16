import { useAuth } from '../components/AuthProvider';
import { db } from '../lib/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import Link from 'next/link';

export default function SolicitarCriador() {
  const { user } = useAuth();
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSolicitar = async (e) => {
    e.preventDefault();
    setMsg('');
    setLoading(true);
    try {
      const ref = doc(db, 'usuarios', user.uid);
      await updateDoc(ref, {
        papel: 'criador_pendente',
        atualizadoEm: new Date(),
      });
      setMsg('Solicitação enviada! Aguarde aprovação do admin.');
    } catch (err) {
      setMsg('Erro ao solicitar. Tente novamente.');
    }
    setLoading(false);
  };

  if (!user) return <div className="text-center text-white mt-10">Faça login para solicitar papel de criador.</div>;

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-gamer">
      <form onSubmit={handleSolicitar} className="bg-glass p-8 rounded-xl shadow-2xl w-full max-w-md backdrop-blur-lg border border-primary">
        <h2 className="text-2xl font-gamer text-primary mb-6 text-center">Solicitar Papel de Criador</h2>
        <p className="mb-4 text-white/80 text-center">Ao solicitar, seu perfil será avaliado por um admin. Você receberá uma notificação após a aprovação.</p>
        {msg && <div className="mb-2 text-center text-primary">{msg}</div>}
        <button type="submit" className="w-full bg-primary text-secondary font-bold py-2 rounded-lg shadow hover:scale-105 transition" disabled={loading}>
          {loading ? 'Enviando...' : 'Solicitar'}</button>
        <div className="flex justify-center text-sm mt-4">
          <Link href="/painel" className="text-primary hover:underline">Voltar ao painel</Link>
        </div>
      </form>
    </main>
  );
} 
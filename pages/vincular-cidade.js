import { useAuth } from '../components/AuthProvider';
import { db } from '../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useState } from 'react';
import Link from 'next/link';

export default function VincularCidade() {
  const { user } = useAuth();
  const [cidadeId, setCidadeId] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVincular = async (e) => {
    e.preventDefault();
    setMsg('');
    setLoading(true);
    try {
      await addDoc(collection(db, 'vinculos'), {
        usuario: user.uid,
        criador: user.uid,
        cidade: cidadeId,
        tipo: 'criador_cidade',
        status: 'pendente',
        solicitadoEm: new Date(),
      });
      setMsg('Solicitação de vínculo enviada! Aguarde aprovação do dono da cidade.');
    } catch (err) {
      setMsg('Erro ao solicitar vínculo.');
    }
    setLoading(false);
  };

  if (!user) return <div className="text-center text-white mt-10">Faça login para solicitar vínculo.</div>;

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-gamer">
      <form onSubmit={handleVincular} className="bg-glass p-8 rounded-xl shadow-2xl w-full max-w-md backdrop-blur-lg border border-primary">
        <h2 className="text-2xl font-gamer text-primary mb-6 text-center">Vincular-se a uma Cidade</h2>
        <input
          type="text"
          placeholder="ID da Cidade"
          className="w-full mb-4 px-4 py-2 rounded bg-secondary text-white focus:outline-none focus:ring-2 focus:ring-primary"
          value={cidadeId}
          onChange={e => setCidadeId(e.target.value)}
          required
        />
        {msg && <div className="mb-2 text-center text-primary">{msg}</div>}
        <button type="submit" className="w-full bg-primary text-secondary font-bold py-2 rounded-lg shadow hover:scale-105 transition" disabled={loading}>
          {loading ? 'Enviando...' : 'Solicitar Vínculo'}
        </button>
        <div className="flex justify-center text-sm mt-4">
          <Link href="/painel" className="text-primary hover:underline">Voltar ao painel</Link>
        </div>
      </form>
    </main>
  );
} 
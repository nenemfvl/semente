import { useAuth } from '../components/AuthProvider';
import { db } from '../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useState } from 'react';

export default function Suporte() {
  const { user } = useAuth();
  const [mensagem, setMensagem] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEnviar = async (e) => {
    e.preventDefault();
    setMsg('');
    setLoading(true);
    try {
      await addDoc(collection(db, 'suporte'), {
        usuario: user ? user.uid : null,
        mensagem,
        status: 'pendente',
        data: new Date(),
      });
      setMsg('Mensagem enviada! Em breve entraremos em contato.');
      setMensagem('');
    } catch (err) {
      setMsg('Erro ao enviar mensagem.');
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-gamer">
      <form onSubmit={handleEnviar} className="bg-glass p-8 rounded-xl shadow-2xl w-full max-w-md backdrop-blur-lg border border-primary">
        <h2 className="text-2xl font-gamer text-primary mb-6 text-center">Suporte / Contato</h2>
        <textarea
          placeholder="Descreva sua dúvida ou problema..."
          className="w-full mb-4 px-4 py-2 rounded bg-secondary text-white focus:outline-none focus:ring-2 focus:ring-primary min-h-[120px]"
          value={mensagem}
          onChange={e => setMensagem(e.target.value)}
          required
        />
        {msg && <div className="mb-2 text-center text-primary">{msg}</div>}
        <button type="submit" className="w-full bg-primary text-secondary font-bold py-2 rounded-lg shadow hover:scale-105 transition" disabled={loading}>
          {loading ? 'Enviando...' : 'Enviar'}
        </button>
      </form>
    </main>
  );
} 
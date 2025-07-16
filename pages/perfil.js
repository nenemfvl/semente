import { useEffect, useState } from 'react';
import { useAuth } from '../components/AuthProvider';
import { db } from '../lib/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

export default function Perfil() {
  const { user } = useAuth();
  const [nome, setNome] = useState('');
  const [darkMode, setDarkMode] = useState(true);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    if (user) {
      const fetchPerfil = async () => {
        setLoading(true);
        const ref = doc(db, 'usuarios', user.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setNome(snap.data().nome || '');
          setDarkMode(snap.data().preferencias?.darkMode ?? true);
          setStatus(snap.data().status || '');
        }
        setLoading(false);
      };
      fetchPerfil();
    }
  }, [user]);

  const handleSalvar = async (e) => {
    e.preventDefault();
    setMsg('');
    setLoading(true);
    try {
      const ref = doc(db, 'usuarios', user.uid);
      await updateDoc(ref, {
        nome,
        preferencias: { darkMode },
        atualizadoEm: new Date(),
      });
      setMsg('Perfil atualizado com sucesso!');
    } catch (err) {
      setMsg('Erro ao atualizar perfil.');
    }
    setLoading(false);
  };

  if (!user) return <div className="text-center text-white mt-10">Faça login para editar seu perfil.</div>;

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-gamer">
      <form onSubmit={handleSalvar} className="bg-glass p-8 rounded-xl shadow-2xl w-full max-w-md backdrop-blur-lg border border-primary">
        <h2 className="text-2xl font-gamer text-primary mb-6 text-center">Meu Perfil</h2>
        <input
          type="text"
          placeholder="Nome"
          className="w-full mb-4 px-4 py-2 rounded bg-secondary text-white focus:outline-none focus:ring-2 focus:ring-primary"
          value={nome}
          onChange={e => setNome(e.target.value)}
          required
        />
        <label className="flex items-center mb-4 text-white/80">
          <input
            type="checkbox"
            checked={darkMode}
            onChange={e => setDarkMode(e.target.checked)}
            className="mr-2 accent-primary"
          />
          Usar tema escuro (dark)
        </label>
        <div className="mb-4 text-white/60 text-sm">Status: {status}</div>
        {msg && <div className="mb-2 text-center text-primary">{msg}</div>}
        <button type="submit" className="w-full bg-primary text-secondary font-bold py-2 rounded-lg shadow hover:scale-105 transition" disabled={loading}>
          {loading ? 'Salvando...' : 'Salvar'}
        </button>
      </form>
    </main>
  );
} 
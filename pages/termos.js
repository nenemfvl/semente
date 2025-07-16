import { useEffect, useState } from 'react';
import { useAuth } from '../components/AuthProvider';
import { db } from '../lib/firebase';
import { doc, updateDoc } from 'firebase/firestore';

// Mock do texto dos termos (substituir por fetch do Firestore depois)
const termosMock = `Ao usar o SementesPLAY, você concorda com os Termos de Uso e Política de Privacidade.\n\n- Não é permitido spam, abuso ou uso indevido da plataforma.\n- Respeite outros usuários, criadores e cidades.\n- O descumprimento pode resultar em banimento.\n\nLeia os termos completos na versão mais recente.`;

export default function Termos() {
  const { user } = useAuth();
  const [termos, setTermos] = useState('');
  const [aceitou, setAceitou] = useState(false);
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTermos(termosMock);
    // Verificar se usuário já aceitou
    const checkAceite = async () => {
      if (user) {
        const ref = doc(db, 'usuarios', user.uid);
        const snap = await import('firebase/firestore').then(fb => fb.getDoc(ref));
        if (snap.exists() && snap.data().aceiteTermos) {
          setAceitou(true);
        }
      }
    };
    checkAceite();
  }, [user]);

  const handleAceitar = async () => {
    setLoading(true);
    setMsg('');
    try {
      const ref = doc(db, 'usuarios', user.uid);
      await updateDoc(ref, { aceiteTermos: new Date() });
      setAceitou(true);
      setMsg('Termos aceitos com sucesso!');
    } catch {
      setMsg('Erro ao registrar aceite.');
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-gamer">
      <div className="bg-glass p-8 rounded-xl shadow-2xl w-full max-w-2xl backdrop-blur-lg border border-primary">
        <h2 className="text-2xl font-gamer text-primary mb-6 text-center">Termos de Uso</h2>
        <pre className="whitespace-pre-wrap text-white/90 mb-4">{termos}</pre>
        {user && !aceitou && (
          <button onClick={handleAceitar} className="w-full bg-primary text-secondary font-bold py-2 rounded-lg shadow hover:scale-105 transition mb-2" disabled={loading}>
            {loading ? 'Registrando...' : 'Aceitar Termos'}
          </button>
        )}
        {msg && <div className="text-center text-primary mt-2">{msg}</div>}
        {user && aceitou && <div className="text-center text-green-400 mt-2">Você já aceitou os termos.</div>}
      </div>
    </main>
  );
} 
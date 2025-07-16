import { useAuth } from '../components/AuthProvider';
import { db } from '../lib/firebase';
import { collection, query, where, orderBy, getDocs, updateDoc, doc } from 'firebase/firestore';
import { useEffect, useState } from 'react';

export default function Notificacoes() {
  const { user } = useAuth();
  const [notificacoes, setNotificacoes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const fetchNotificacoes = async () => {
        setLoading(true);
        const q = query(collection(db, 'notificacoes'), where('usuario', '==', user.uid), orderBy('data', 'desc'));
        const querySnapshot = await getDocs(q);
        const lista = [];
        querySnapshot.forEach(docu => {
          lista.push({ id: docu.id, ...docu.data() });
        });
        setNotificacoes(lista);
        setLoading(false);
        // Marcar como lidas
        lista.forEach(async n => {
          if (!n.lida) await updateDoc(doc(db, 'notificacoes', n.id), { lida: true });
        });
      };
      fetchNotificacoes();
    }
  }, [user]);

  if (!user) return <div className="text-center text-white mt-10">Faça login para ver suas notificações.</div>;

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-gamer">
      <div className="bg-glass p-8 rounded-xl shadow-2xl w-full max-w-2xl backdrop-blur-lg border border-primary">
        <h2 className="text-2xl font-gamer text-primary mb-6 text-center">Notificações</h2>
        {loading ? <div className="text-white text-center">Carregando...</div> : (
          notificacoes.length === 0 ? <div className="text-white/80 text-center">Nenhuma notificação.</div> : (
            <ul className="space-y-4">
              {notificacoes.map(n => (
                <li key={n.id} className="bg-secondary rounded p-4 text-white/90">
                  <div className="font-bold text-primary mb-1">{n.tipo.replace('_', ' ').toUpperCase()}</div>
                  <div>{n.mensagem}</div>
                  <div className="text-xs text-white/60 mt-1">{n.data ? new Date(n.data.seconds ? n.data.seconds * 1000 : n.data).toLocaleString('pt-BR') : '-'}</div>
                </li>
              ))}
            </ul>
          )
        )}
      </div>
    </main>
  );
} 
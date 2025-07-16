import { useEffect, useState } from 'react';
import { db } from '../lib/firebase';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';

export default function Feed() {
  const [atividades, setAtividades] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAtividades = async () => {
      setLoading(true);
      const q = query(collection(db, 'atividades'), orderBy('data', 'desc'), limit(20));
      const querySnapshot = await getDocs(q);
      const lista = [];
      querySnapshot.forEach(docu => {
        lista.push({ id: docu.id, ...docu.data() });
      });
      setAtividades(lista);
      setLoading(false);
    };
    fetchAtividades();
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-gamer">
      <div className="bg-glass p-8 rounded-xl shadow-2xl w-full max-w-2xl backdrop-blur-lg border border-primary">
        <h2 className="text-2xl font-gamer text-primary mb-6 text-center">Feed de Atividades</h2>
        {loading ? <div className="text-white text-center">Carregando...</div> : (
          atividades.length === 0 ? <div className="text-white/80 text-center">Nenhuma atividade recente.</div> : (
            <ul className="space-y-4">
              {atividades.map(a => (
                <li key={a.id} className="bg-secondary rounded p-4 text-white/90">
                  <div className="font-bold text-primary mb-1">{a.tipo.replace('_', ' ').toUpperCase()}</div>
                  <div>{a.descricao}</div>
                  <div className="text-xs text-white/60 mt-1">{a.data ? new Date(a.data.seconds ? a.data.seconds * 1000 : a.data).toLocaleString('pt-BR') : '-'}</div>
                </li>
              ))}
            </ul>
          )
        )}
      </div>
    </main>
  );
} 
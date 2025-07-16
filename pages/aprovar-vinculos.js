import { useAuth } from '../components/AuthProvider';
import { db } from '../lib/firebase';
import { collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';

export default function AprovarVinculos() {
  const { user } = useAuth();
  const [vinculos, setVinculos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    if (user) {
      const fetchVinculos = async () => {
        setLoading(true);
        // Buscar cidade vinculada ao usuário
        const userDoc = await getDocs(query(collection(db, 'usuarios'), where('uid', '==', user.uid)));
        let cidadeId = '';
        userDoc.forEach(docu => {
          cidadeId = docu.data().cidadeVinculada;
        });
        if (!cidadeId) {
          setVinculos([]);
          setLoading(false);
          return;
        }
        // Buscar vínculos pendentes para essa cidade
        const q = query(collection(db, 'vinculos'), where('cidade', '==', cidadeId), where('status', '==', 'pendente'));
        const querySnapshot = await getDocs(q);
        const lista = [];
        querySnapshot.forEach(docu => {
          lista.push({ id: docu.id, ...docu.data() });
        });
        setVinculos(lista);
        setLoading(false);
      };
      fetchVinculos();
    }
  }, [user]);

  const aprovar = async (id) => {
    setMsg('');
    try {
      await updateDoc(doc(db, 'vinculos', id), {
        status: 'aprovado',
        aprovadoEm: new Date(),
      });
      setMsg('Vínculo aprovado!');
      setVinculos(vinculos.filter(v => v.id !== id));
    } catch {
      setMsg('Erro ao aprovar vínculo.');
    }
  };

  if (!user) return <div className="text-center text-white mt-10">Faça login para aprovar vínculos.</div>;

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-gamer">
      <div className="bg-glass p-8 rounded-xl shadow-2xl w-full max-w-2xl backdrop-blur-lg border border-primary">
        <h2 className="text-2xl font-gamer text-primary mb-6 text-center">Aprovar Vínculos</h2>
        {msg && <div className="mb-2 text-center text-primary">{msg}</div>}
        {loading ? <div className="text-white text-center">Carregando...</div> : (
          vinculos.length === 0 ? <div className="text-white/80 text-center">Nenhum vínculo pendente.</div> : (
            <ul className="space-y-4">
              {vinculos.map(v => (
                <li key={v.id} className="bg-secondary rounded p-4 flex justify-between items-center text-white/90">
                  <span>Criador: {v.criador} | Cidade: {v.cidade}</span>
                  <button onClick={() => aprovar(v.id)} className="bg-primary text-secondary px-4 py-1 rounded font-bold hover:scale-105 transition">Aprovar</button>
                </li>
              ))}
            </ul>
          )
        )}
      </div>
    </main>
  );
} 
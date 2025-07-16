import { useAuth } from '../components/AuthProvider';
import { db } from '../lib/firebase';
import { collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';

export default function Admin() {
  const { user } = useAuth();
  const [pendentes, setPendentes] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    if (user) {
      const fetchPendentes = async () => {
        setLoading(true);
        // Buscar solicitações pendentes
        const q = query(collection(db, 'usuarios'), where('papel', 'in', ['criador_pendente', 'dono_cidade_pendente']));
        const querySnapshot = await getDocs(q);
        const lista = [];
        querySnapshot.forEach(docu => {
          lista.push({ id: docu.id, ...docu.data() });
        });
        setPendentes(lista);
        // Buscar todos os usuários
        const all = await getDocs(collection(db, 'usuarios'));
        const listaAll = [];
        all.forEach(docu => {
          listaAll.push({ id: docu.id, ...docu.data() });
        });
        setUsuarios(listaAll);
        setLoading(false);
      };
      fetchPendentes();
    }
  }, [user, msg]);

  const aprovar = async (id, papel) => {
    setMsg('');
    try {
      await updateDoc(doc(db, 'usuarios', id), {
        papel: papel.replace('_pendente', ''),
        status: 'ativo',
        aprovadoEm: new Date(),
      });
      setMsg('Solicitação aprovada!');
      setPendentes(pendentes.filter(u => u.id !== id));
    } catch {
      setMsg('Erro ao aprovar solicitação.');
    }
  };

  if (!user) return <div className="text-center text-white mt-10">Faça login como admin para acessar o painel.</div>;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-gamer">
      <div className="bg-glass p-8 rounded-xl shadow-2xl w-full max-w-3xl backdrop-blur-lg border border-primary">
        <h2 className="text-2xl font-gamer text-primary mb-6 text-center">Painel Administrativo</h2>
        {msg && <div className="mb-2 text-center text-primary">{msg}</div>}
        <h3 className="text-lg text-white/90 mb-2">Solicitações Pendentes</h3>
        {loading ? <div className="text-white text-center">Carregando...</div> : (
          pendentes.length === 0 ? <div className="text-white/80 text-center mb-4">Nenhuma solicitação pendente.</div> : (
            <ul className="space-y-4 mb-6">
              {pendentes.map(u => (
                <li key={u.id} className="bg-secondary rounded p-4 flex justify-between items-center text-white/90">
                  <span>{u.nome || u.email} — {u.papel.replace('_pendente', '').replace('criador', 'Criador de Conteúdo').replace('dono_cidade', 'Dono de Cidade')}</span>
                  <button onClick={() => aprovar(u.id, u.papel)} className="bg-primary text-secondary px-4 py-1 rounded font-bold hover:scale-105 transition">Aprovar</button>
                </li>
              ))}
            </ul>
          )
        )}
        <h3 className="text-lg text-white/90 mb-2">Todos os Usuários</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-white/80 text-sm">
            <thead>
              <tr>
                <th className="px-2 py-1">Nome/E-mail</th>
                <th className="px-2 py-1">Papel</th>
                <th className="px-2 py-1">Status</th>
                <th className="px-2 py-1">Criado em</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map(u => (
                <tr key={u.id} className="border-b border-primary/20">
                  <td className="px-2 py-1">{u.nome || u.email}</td>
                  <td className="px-2 py-1">{u.papel}</td>
                  <td className="px-2 py-1">{u.status}</td>
                  <td className="px-2 py-1">{u.criadoEm ? new Date(u.criadoEm.seconds ? u.criadoEm.seconds * 1000 : u.criadoEm).toLocaleDateString('pt-BR') : '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
} 
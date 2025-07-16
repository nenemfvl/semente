import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../lib/firebase';
import { doc, setDoc } from 'firebase/firestore';
import Link from 'next/link';

export default function Cadastro() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [aceite, setAceite] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCadastro = async (e) => {
    e.preventDefault();
    setError('');
    if (password !== confirm) {
      setError('As senhas não coincidem.');
      return;
    }
    if (!aceite) {
      setError('Você precisa aceitar os termos de uso.');
      return;
    }
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, 'usuarios', userCredential.user.uid), {
        uid: userCredential.user.uid,
        email,
        papel: 'usuario',
        status: 'ativo',
        preferencias: { darkMode: true },
        criadoEm: new Date(),
        atualizadoEm: new Date(),
        aceiteTermos: new Date(),
        cidadeVinculada: '',
        criadorVinculado: ''
      });
    } catch (err) {
      setError('Erro ao criar conta. Tente outro e-mail.');
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-gamer">
      <form onSubmit={handleCadastro} className="bg-glass p-8 rounded-xl shadow-2xl w-full max-w-md backdrop-blur-lg border border-primary">
        <h2 className="text-2xl font-gamer text-primary mb-6 text-center">Criar Conta</h2>
        <input
          type="email"
          placeholder="E-mail"
          className="w-full mb-4 px-4 py-2 rounded bg-secondary text-white focus:outline-none focus:ring-2 focus:ring-primary"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          className="w-full mb-4 px-4 py-2 rounded bg-secondary text-white focus:outline-none focus:ring-2 focus:ring-primary"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirmar Senha"
          className="w-full mb-4 px-4 py-2 rounded bg-secondary text-white focus:outline-none focus:ring-2 focus:ring-primary"
          value={confirm}
          onChange={e => setConfirm(e.target.value)}
          required
        />
        <label className="flex items-center mb-4 text-white/80">
          <input
            type="checkbox"
            checked={aceite}
            onChange={e => setAceite(e.target.checked)}
            className="mr-2 accent-primary"
            required
          />
          Li e aceito os <Link href="/termos" className="text-primary hover:underline">termos de uso</Link>.
        </label>
        {error && <div className="text-red-400 mb-2 text-center">{error}</div>}
        <button type="submit" className="w-full bg-primary text-secondary font-bold py-2 rounded-lg shadow hover:scale-105 transition mb-2" disabled={loading}>
          {loading ? 'Criando...' : 'Criar Conta'}
        </button>
        <div className="flex justify-center text-sm mt-2">
          <Link href="/login" className="text-primary hover:underline">Já tenho conta</Link>
        </div>
      </form>
    </main>
  );
} 
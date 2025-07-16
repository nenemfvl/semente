import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/firebase';
import Link from 'next/link';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError('E-mail ou senha inválidos.');
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-gamer">
      <form onSubmit={handleLogin} className="bg-glass p-8 rounded-xl shadow-2xl w-full max-w-md backdrop-blur-lg border border-primary">
        <h2 className="text-2xl font-gamer text-primary mb-6 text-center">Entrar</h2>
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
        {error && <div className="text-red-400 mb-2 text-center">{error}</div>}
        <button type="submit" className="w-full bg-primary text-secondary font-bold py-2 rounded-lg shadow hover:scale-105 transition mb-2" disabled={loading}>
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
        <div className="flex justify-between text-sm mt-2">
          <Link href="/cadastro" className="text-primary hover:underline">Criar conta</Link>
          <Link href="/recuperar" className="text-primary hover:underline">Esqueci a senha</Link>
        </div>
      </form>
    </main>
  );
} 
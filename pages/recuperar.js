import { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../lib/firebase';
import Link from 'next/link';

export default function Recuperar() {
  const [email, setEmail] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRecuperar = async (e) => {
    e.preventDefault();
    setMensagem('');
    setError('');
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setMensagem('E-mail de recuperação enviado!');
    } catch (err) {
      setError('Erro ao enviar e-mail. Verifique o endereço.');
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-gamer">
      <form onSubmit={handleRecuperar} className="bg-glass p-8 rounded-xl shadow-2xl w-full max-w-md backdrop-blur-lg border border-primary">
        <h2 className="text-2xl font-gamer text-primary mb-6 text-center">Recuperar Senha</h2>
        <input
          type="email"
          placeholder="E-mail"
          className="w-full mb-4 px-4 py-2 rounded bg-secondary text-white focus:outline-none focus:ring-2 focus:ring-primary"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        {mensagem && <div className="text-green-400 mb-2 text-center">{mensagem}</div>}
        {error && <div className="text-red-400 mb-2 text-center">{error}</div>}
        <button type="submit" className="w-full bg-primary text-secondary font-bold py-2 rounded-lg shadow hover:scale-105 transition mb-2" disabled={loading}>
          {loading ? 'Enviando...' : 'Enviar e-mail'}
        </button>
        <div className="flex justify-center text-sm mt-2">
          <Link href="/login" className="text-primary hover:underline">Voltar ao login</Link>
        </div>
      </form>
    </main>
  );
} 
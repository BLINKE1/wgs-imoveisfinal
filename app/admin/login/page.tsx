'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    setLoading(false);

    if (error) {
      setError('Credenciais inválidas.');
      return;
    }

    router.push('/admin');
    router.refresh();
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-hero px-6 text-white">
      <div className="w-full max-w-md rounded-[32px] border border-white/10 bg-black/65 p-8 shadow-gold backdrop-blur-xl">
        <p className="text-sm uppercase tracking-[0.3em] text-brand-200">WGS IMÓVEIS</p>
        <h1 className="mt-4 text-3xl font-bold">Entrar na área do corretor</h1>
        <p className="mt-3 text-sm text-white/60">Use seu e-mail e senha cadastrados no Supabase Auth.</p>

        <form onSubmit={handleLogin} className="mt-8 space-y-4">
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none focus:border-brand-300"
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none focus:border-brand-300"
          />
          {error && <p className="text-sm text-red-300">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-brand-400 px-5 py-3 font-semibold text-black transition hover:bg-brand-300 disabled:opacity-60"
          >
            {loading ? 'Entrando...' : 'Acessar painel'}
          </button>
        </form>
      </div>
    </main>
  );
}

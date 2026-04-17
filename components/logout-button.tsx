'use client';

import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export function LogoutButton() {
  const router = useRouter();

  return (
    <button
      onClick={async () => {
        const supabase = createClient();
        await supabase.auth.signOut();
        router.push('/admin/login');
        router.refresh();
      }}
      className="rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-white/80 transition hover:border-brand-300 hover:text-brand-100"
    >
      Sair
    </button>
  );
}

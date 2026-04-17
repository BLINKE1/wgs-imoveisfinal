export function Footer() {
  return (
    <footer id="contato" className="border-t border-white/10 bg-black">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-14 lg:grid-cols-3 lg:px-8">
        <div>
          <p className="text-lg font-semibold tracking-[0.22em] text-brand-200">WGS IMÓVEIS</p>
          <p className="mt-3 text-sm leading-7 text-white/65">
            Atendimento profissional para venda, locação e captação de imóveis com apresentação de alto nível.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white">Contato</p>
          <p className="mt-3 text-sm text-white/65">WhatsApp: (42) 99999-9999</p>
          <p className="mt-2 text-sm text-white/65">E-mail: contato@wgsimoveis.com.br</p>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white">Institucional</p>
          <p className="mt-3 text-sm text-white/65">CRECI 34163 J</p>
          <p className="mt-2 text-sm text-white/65">Site desenvolvido em Next.js, Supabase e Vercel.</p>
        </div>
      </div>
    </footer>
  );
}

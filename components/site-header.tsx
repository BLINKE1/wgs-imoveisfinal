import Link from 'next/link';
import { Building2, Phone } from 'lucide-react';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <Link href="/" className="flex items-center gap-3 text-white">
          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-brand-300/40 bg-brand-700/30 shadow-gold">
            <Building2 className="h-5 w-5 text-brand-200" />
          </div>
          <div>
            <p className="text-lg font-semibold tracking-[0.28em] text-brand-200">WGS IMÓVEIS</p>
            <p className="text-xs uppercase tracking-[0.2em] text-white/60">CRECI 34163 J</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-white/80 md:flex">
          <Link href="#imoveis" className="transition hover:text-brand-200">Imóveis</Link>
          <Link href="#sobre" className="transition hover:text-brand-200">Sobre</Link>
          <Link href="#contato" className="transition hover:text-brand-200">Contato</Link>
          <Link
            href="/admin"
            className="rounded-full border border-brand-300/40 px-4 py-2 text-brand-100 transition hover:bg-brand-400/10"
          >
            Área do corretor
          </Link>
        </nav>

        <a
          href="https://wa.me/5542999999999"
          className="inline-flex items-center gap-2 rounded-full bg-brand-400 px-4 py-2 text-sm font-semibold text-black transition hover:bg-brand-300"
        >
          <Phone className="h-4 w-4" /> WhatsApp
        </a>
      </div>
    </header>
  );
}

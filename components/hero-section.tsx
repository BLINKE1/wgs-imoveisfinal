import Link from 'next/link';
import { ArrowRight, BadgeCheck, Building, MapPin } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-hero">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-28">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-300/25 bg-brand-300/10 px-4 py-2 text-sm font-medium text-brand-100">
            <BadgeCheck className="h-4 w-4" /> Atendimento consultivo com padrão premium
          </span>
          <h1 className="mt-6 text-4xl font-bold leading-tight text-white md:text-6xl">
            Imóveis selecionados para quem valoriza localização, segurança e bom investimento.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-white/72">
            A WGS Imóveis apresenta imóveis residenciais e comerciais com curadoria profissional,
            atendimento direto e uma vitrine elegante para gerar mais visitas e mais negócios.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="#imoveis"
              className="inline-flex items-center gap-2 rounded-full bg-brand-400 px-6 py-3 font-semibold text-black transition hover:bg-brand-300"
            >
              Ver imóveis <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="#contato"
              className="rounded-full border border-white/15 px-6 py-3 font-semibold text-white transition hover:border-brand-200 hover:text-brand-100"
            >
              Falar com corretor
            </Link>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              ['+150', 'Atendimentos personalizados'],
              ['Curadoria', 'Imóveis com apresentação profissional'],
              ['Vercel + Supabase', 'Estrutura moderna e escalável']
            ].map(([title, subtitle]) => (
              <div key={title} className="rounded-3xl border border-white/10 bg-white/5 p-4 shadow-soft">
                <p className="text-xl font-semibold text-brand-100">{title}</p>
                <p className="mt-2 text-sm text-white/65">{subtitle}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 rounded-[32px] bg-brand-400/10 blur-3xl" />
          <div className="relative rounded-[32px] border border-brand-300/20 bg-white/5 p-6 shadow-gold backdrop-blur">
            <div className="rounded-[28px] border border-white/10 bg-black/65 p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                  <Building className="h-8 w-8 text-brand-200" />
                  <p className="mt-4 text-lg font-semibold text-white">Captação com padrão visual forte</p>
                  <p className="mt-2 text-sm text-white/60">Landing page pensada para gerar autoridade e confiança.</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                  <MapPin className="h-8 w-8 text-brand-200" />
                  <p className="mt-4 text-lg font-semibold text-white">Destaque regional</p>
                  <p className="mt-2 text-sm text-white/60">Informações claras para facilitar a decisão do comprador.</p>
                </div>
              </div>
              <div className="mt-4 rounded-3xl border border-brand-300/20 bg-gradient-to-r from-brand-500/20 to-brand-200/10 p-5">
                <p className="text-sm uppercase tracking-[0.25em] text-brand-200">Assinatura visual</p>
                <p className="mt-2 text-2xl font-semibold text-white">Preto profundo + dourado sofisticado</p>
                <p className="mt-2 text-sm leading-7 text-white/70">Paleta baseada na identidade da marca para passar elegância, estabilidade e alto padrão.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

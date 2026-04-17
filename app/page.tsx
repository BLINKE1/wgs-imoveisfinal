import { ShieldCheck, Sparkles, TrendingUp } from 'lucide-react';
import { Footer } from '@/components/footer';
import { HeroSection } from '@/components/hero-section';
import { PropertyCard } from '@/components/property-card';
import { SiteHeader } from '@/components/site-header';
import { getFeaturedProperties } from '@/lib/queries';

export default async function HomePage() {
  const properties = await getFeaturedProperties();

  return (
    <main className="bg-black text-white">
      <SiteHeader />
      <HeroSection />

      <section id="imoveis" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-brand-200">Portfólio em destaque</p>
            <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">Imóveis com apresentação profissional e foco em conversão</h2>
          </div>
          <p className="max-w-xl text-white/65">
            Cards elegantes, leitura rápida dos principais atributos e páginas individuais prontas para divulgação.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </section>

      <section id="sobre" className="border-y border-white/10 bg-white/5">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 py-20 lg:grid-cols-3 lg:px-8">
          <Feature title="Autoridade visual" text="Uso consistente do dourado com fundo preto para reforçar percepção de valor." icon={<Sparkles className="h-6 w-6" />} />
          <Feature title="Estrutura confiável" text="Next.js no front-end, Supabase no banco e autenticação, Vercel no deploy." icon={<ShieldCheck className="h-6 w-6" />} />
          <Feature title="Captação organizada" text="Painel para corretores cadastrarem imóveis e manterem o catálogo sempre atualizado." icon={<TrendingUp className="h-6 w-6" />} />
        </div>
      </section>

      <Footer />
    </main>
  );
}

function Feature({ title, text, icon }: { title: string; text: string; icon: React.ReactNode }) {
  return (
    <div className="rounded-[28px] border border-white/10 bg-black/40 p-8 shadow-soft">
      <div className="inline-flex rounded-2xl bg-brand-400/15 p-3 text-brand-200">{icon}</div>
      <h3 className="mt-5 text-xl font-semibold text-white">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-white/65">{text}</p>
    </div>
  );
}

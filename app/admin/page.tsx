import { LogoutButton } from '@/components/logout-button';
import { PropertyForm } from '@/components/property-form';
import { createClient } from '@/lib/supabase/server';
import { formatCurrency } from '@/lib/utils';

interface Property {
  id: string; // ou number, dependendo do seu banco
  title: string;
  // adicione outros campos que você usa, como 'price', 'address', etc.
}
const [properties, setProperties] = useState<Property[]>([]);

export default async function AdminPage() {
  const supabase = createClient();
  const { data: properties } = await supabase
    .from('properties')
    .select('id,title,price,status,city,created_at')
    .order('created_at', { ascending: false })
    .limit(20);

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-soft md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-brand-200">Painel administrativo</p>
            <h1 className="mt-3 text-3xl font-bold">Cadastro de imóveis</h1>
            <p className="mt-3 text-white/65">Área restrita para corretores manterem o catálogo atualizado.</p>
          </div>
          <LogoutButton />
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <PropertyForm />

          <section className="rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-soft">
            <h2 className="text-xl font-semibold">Últimos imóveis cadastrados</h2>
            <div className="mt-6 space-y-4">
              {properties?.length ? (
                properties.map((property) => (
                  <div key={property.id} className="rounded-3xl border border-white/10 bg-black/30 p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-semibold text-white">{property.title}</p>
                        <p className="mt-1 text-sm text-white/55">{property.city}</p>
                      </div>
                      <span className="rounded-full border border-brand-300/20 px-3 py-1 text-xs uppercase tracking-[0.18em] text-brand-100">
                        {property.status}
                      </span>
                    </div>
                    <p className="mt-4 text-brand-100">{formatCurrency(property.price)}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-white/55">Nenhum imóvel encontrado ainda.</p>
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Bath, BedDouble, CarFront, ChevronLeft, Expand, MapPin } from 'lucide-react';
import Link from 'next/link';
import { Footer } from '@/components/footer';
import { SiteHeader } from '@/components/site-header';
import { getPropertyBySlug } from '@/lib/queries';
import { formatCurrency, formatPurpose } from '@/lib/utils';

export default async function PropertyDetailsPage({ params }: { params: { slug: string } }) {
  const property = await getPropertyBySlug(params.slug);

  if (!property) notFound();

  return (
    <main className="bg-black text-white">
      <SiteHeader />
      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-brand-100">
          <ChevronLeft className="h-4 w-4" /> Voltar
        </Link>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <div className="relative h-[420px] overflow-hidden rounded-[32px] border border-white/10">
              <Image src={property.cover_image} alt={property.title} fill className="object-cover" />
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {property.image_urls.slice(1).map((image, index) => (
                <div key={image + index} className="relative h-56 overflow-hidden rounded-[28px] border border-white/10">
                  <Image src={image} alt={`${property.title} ${index + 1}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>

          <aside className="rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-soft">
            <span className="rounded-full bg-brand-400 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-black">
              {formatPurpose(property.purpose)}
            </span>
            <h1 className="mt-5 text-3xl font-bold">{property.title}</h1>
            <p className="mt-3 flex items-center gap-2 text-white/70"><MapPin className="h-4 w-4 text-brand-200" /> {property.neighborhood}, {property.city}</p>
            <p className="mt-6 text-4xl font-bold text-brand-100">{formatCurrency(property.price)}</p>
            <p className="mt-6 text-sm leading-7 text-white/70">{property.description}</p>

            <div className="mt-8 grid grid-cols-2 gap-3 text-sm text-white/75">
              <Info icon={<BedDouble className="h-4 w-4" />} label={`${property.bedrooms} quartos`} />
              <Info icon={<Bath className="h-4 w-4" />} label={`${property.bathrooms} banheiros`} />
              <Info icon={<CarFront className="h-4 w-4" />} label={`${property.parking_spaces} vagas`} />
              <Info icon={<Expand className="h-4 w-4" />} label={`${property.area} m²`} />
            </div>

            <div className="mt-8 rounded-[28px] border border-brand-300/20 bg-black/35 p-5">
              <p className="text-sm text-white/60">Tipo</p>
              <p className="mt-1 text-white">{property.property_type}</p>
              <p className="mt-4 text-sm text-white/60">Status</p>
              <p className="mt-1 text-white">{property.status}</p>
            </div>

            <a
              href="https://wa.me/5542999999999"
              className="mt-8 inline-flex w-full justify-center rounded-full bg-brand-400 px-6 py-3 font-semibold text-black transition hover:bg-brand-300"
            >
              Falar com corretor
            </a>
          </aside>
        </div>
      </section>
      <Footer />
    </main>
  );
}

function Info({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-black/30 px-3 py-3">
      <span className="text-brand-200">{icon}</span>
      <span>{label}</span>
    </div>
  );
}

import Image from 'next/image';
import Link from 'next/link';
import { Bath, BedDouble, CarFront, Expand, MapPin } from 'lucide-react';
import { Property } from '@/types/database';
import { formatCurrency, formatPurpose } from '@/lib/utils';

export function PropertyCard({ property }: { property: Property }) {
  return (
    <article className="overflow-hidden rounded-[28px] border border-white/10 bg-white/5 shadow-soft transition hover:-translate-y-1 hover:border-brand-300/40">
      <div className="relative h-64">
        <Image
          src={property.cover_image}
          alt={property.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
        <div className="absolute left-4 top-4 rounded-full bg-brand-400 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-black">
          {formatPurpose(property.purpose)}
        </div>
        {property.featured && (
          <div className="absolute right-4 top-4 rounded-full border border-brand-200/30 bg-black/60 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-brand-100">
            Destaque
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold text-white">{property.title}</h3>
            <p className="mt-2 flex items-center gap-2 text-sm text-white/60">
              <MapPin className="h-4 w-4 text-brand-200" /> {property.neighborhood}, {property.city}
            </p>
          </div>
          <p className="text-right text-xl font-bold text-brand-100">{formatCurrency(property.price)}</p>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 text-sm text-white/70 lg:grid-cols-4">
          <Info icon={<BedDouble className="h-4 w-4" />} label={`${property.bedrooms} quartos`} />
          <Info icon={<Bath className="h-4 w-4" />} label={`${property.bathrooms} banheiros`} />
          <Info icon={<CarFront className="h-4 w-4" />} label={`${property.parking_spaces} vagas`} />
          <Info icon={<Expand className="h-4 w-4" />} label={`${property.area} m²`} />
        </div>

        <p className="mt-5 line-clamp-2 text-sm leading-7 text-white/60">{property.description}</p>

        <Link
          href={`/imoveis/${property.slug}`}
          className="mt-6 inline-flex rounded-full border border-brand-300/40 px-5 py-3 text-sm font-semibold text-brand-100 transition hover:bg-brand-400/10"
        >
          Ver detalhes
        </Link>
      </div>
    </article>
  );
}

function Info({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-black/30 px-3 py-2">
      <span className="text-brand-200">{icon}</span>
      <span>{label}</span>
    </div>
  );
}

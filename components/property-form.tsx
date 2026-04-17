'use client';

import { useMemo, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, UploadCloud } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { slugify } from '@/lib/utils';

const propertySchema = z.object({
  title: z.string().min(5),
  description: z.string().min(30),
  price: z.coerce.number().min(1),
  purpose: z.enum(['venda', 'aluguel']),
  property_type: z.string().min(2),
  city: z.string().min(2),
  neighborhood: z.string().min(2),
  address: z.string().optional(),
  bedrooms: z.coerce.number().min(0),
  bathrooms: z.coerce.number().min(0),
  parking_spaces: z.coerce.number().min(0),
  area: z.coerce.number().min(1),
  condo_fee: z.coerce.number().nullable().optional(),
  iptu: z.coerce.number().nullable().optional(),
  featured: z.boolean().default(false),
  status: z.enum(['disponivel', 'reservado', 'vendido', 'alugado'])
});

type PropertyFormData = z.infer<typeof propertySchema>;

export function PropertyForm() {
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);
  const [uploading, setUploading] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);
  const [files, setFiles] = useState<FileList | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<PropertyFormData>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      purpose: 'venda',
      status: 'disponivel',
      featured: false,
      bedrooms: 0,
      bathrooms: 0,
      parking_spaces: 0
    }
  });

  const uploadImages = async () => {
    if (!files?.length) return [] as string[];

    setUploading(true);
    const uploadedUrls: string[] = [];

    for (const file of Array.from(files)) {
      const fileName = `${Date.now()}-${slugify(file.name)}`;
      const { error } = await supabase.storage.from('property-images').upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      });

      if (error) {
        setUploading(false);
        throw error;
      }

      const { data } = supabase.storage.from('property-images').getPublicUrl(fileName);
      uploadedUrls.push(data.publicUrl);
    }

    setUploading(false);
    return uploadedUrls;
  };

  const onSubmit = handleSubmit(async (values) => {
    setMessage(null);

    startTransition(async () => {
      try {
        const imageUrls = await uploadImages();
        const slug = slugify(values.title);
        const { data: authData } = await supabase.auth.getUser();
        const { error } = await supabase.from('properties').insert({
          ...values,
          slug,
          broker_id: authData.user?.id ?? null,
          address: values.address || null,
          condo_fee: Number.isFinite(values.condo_fee as number) ? values.condo_fee ?? null : null,
          iptu: Number.isFinite(values.iptu as number) ? values.iptu ?? null : null,
          cover_image: imageUrls[0] ?? 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1200&q=80',
          image_urls: imageUrls
        });

        if (error) throw error;
        setMessage('Imóvel cadastrado com sucesso.');
        reset();
        setFiles(null);
        router.refresh();
      } catch (error) {
        const text = error instanceof Error ? error.message : 'Erro ao cadastrar imóvel.';
        setMessage(text);
      }
    });
  });

  return (
    <form onSubmit={onSubmit} className="space-y-6 rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-soft">
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Título" error={errors.title?.message}><input {...register('title')} className={inputClass} /></Field>
        <Field label="Tipo" error={errors.property_type?.message}><input {...register('property_type')} className={inputClass} /></Field>
        <Field label="Cidade" error={errors.city?.message}><input {...register('city')} className={inputClass} /></Field>
        <Field label="Bairro" error={errors.neighborhood?.message}><input {...register('neighborhood')} className={inputClass} /></Field>
        <Field label="Endereço"><input {...register('address')} className={inputClass} /></Field>
        <Field label="Preço" error={errors.price?.message}><input type="number" {...register('price')} className={inputClass} /></Field>
        <Field label="Finalidade">
          <select {...register('purpose')} className={inputClass}><option value="venda">Venda</option><option value="aluguel">Aluguel</option></select>
        </Field>
        <Field label="Status">
          <select {...register('status')} className={inputClass}>
            <option value="disponivel">Disponível</option>
            <option value="reservado">Reservado</option>
            <option value="vendido">Vendido</option>
            <option value="alugado">Alugado</option>
          </select>
        </Field>
        <Field label="Quartos"><input type="number" {...register('bedrooms')} className={inputClass} /></Field>
        <Field label="Banheiros"><input type="number" {...register('bathrooms')} className={inputClass} /></Field>
        <Field label="Vagas"><input type="number" {...register('parking_spaces')} className={inputClass} /></Field>
        <Field label="Área (m²)"><input type="number" {...register('area')} className={inputClass} /></Field>
        <Field label="Condomínio"><input type="number" {...register('condo_fee')} className={inputClass} /></Field>
        <Field label="IPTU"><input type="number" {...register('iptu')} className={inputClass} /></Field>
      </div>

      <Field label="Descrição" error={errors.description?.message}>
        <textarea {...register('description')} rows={5} className={`${inputClass} min-h-[140px]`} />
      </Field>

      <div className="rounded-3xl border border-dashed border-brand-300/30 bg-black/30 p-5">
        <label className="flex cursor-pointer items-center gap-3 text-sm text-white/80">
          <UploadCloud className="h-5 w-5 text-brand-200" />
          Selecionar imagens do imóvel
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(event) => setFiles(event.target.files)}
          />
        </label>
        <p className="mt-2 text-xs text-white/50">Bucket esperado no Supabase: property-images</p>
      </div>

      <label className="flex items-center gap-3 text-sm text-white/80">
        <input type="checkbox" {...register('featured')} className="h-4 w-4 rounded border-white/20 bg-transparent" />
        Marcar como destaque na landing page
      </label>

      {message && <p className="text-sm text-brand-100">{message}</p>}

      <button
        type="submit"
        disabled={isPending || uploading}
        className="inline-flex items-center gap-2 rounded-full bg-brand-400 px-6 py-3 font-semibold text-black transition hover:bg-brand-300 disabled:opacity-60"
      >
        {(isPending || uploading) && <Loader2 className="h-4 w-4 animate-spin" />}
        Salvar imóvel
      </button>
    </form>
  );
}

function Field({
  label,
  error,
  children
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium text-white/85">{label}</span>
      {children}
      {error && <span className="text-xs text-red-300">{error}</span>}
    </label>
  );
}

const inputClass =
  'w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-brand-300';

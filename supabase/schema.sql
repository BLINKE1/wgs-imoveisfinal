create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  role text not null default 'broker' check (role in ('admin', 'broker')),
  created_at timestamptz not null default now()
);

create table if not exists public.properties (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  description text not null,
  price numeric(12,2) not null,
  purpose text not null check (purpose in ('venda', 'aluguel')),
  property_type text not null,
  city text not null,
  neighborhood text not null,
  address text,
  bedrooms integer not null default 0,
  bathrooms integer not null default 0,
  parking_spaces integer not null default 0,
  area numeric(10,2) not null,
  condo_fee numeric(10,2),
  iptu numeric(10,2),
  featured boolean not null default false,
  status text not null default 'disponivel' check (status in ('disponivel', 'reservado', 'vendido', 'alugado')),
  cover_image text not null,
  image_urls text[] not null default '{}',
  broker_id uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, role)
  values (new.id, new.raw_user_meta_data ->> 'full_name', coalesce(new.raw_user_meta_data ->> 'role', 'broker'));
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger set_properties_updated_at
  before update on public.properties
  for each row execute procedure public.set_updated_at();

alter table public.profiles enable row level security;
alter table public.properties enable row level security;

create policy "Public can read available properties"
  on public.properties for select
  using (true);

create policy "Brokers can read own profile"
  on public.profiles for select
  to authenticated
  using (auth.uid() = id);

create policy "Brokers can insert properties"
  on public.properties for insert
  to authenticated
  with check (auth.uid() = broker_id or broker_id is null);

create policy "Brokers can update own properties"
  on public.properties for update
  to authenticated
  using (auth.uid() = broker_id or broker_id is null)
  with check (auth.uid() = broker_id or broker_id is null);

insert into storage.buckets (id, name, public)
values ('property-images', 'property-images', true)
on conflict (id) do nothing;

create policy "Public can view property images"
  on storage.objects for select
  using (bucket_id = 'property-images');

create policy "Authenticated can upload property images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'property-images');

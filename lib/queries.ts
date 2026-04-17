import { cache } from 'react';
import { createClient } from '@/lib/supabase/server';
import { mockProperties } from '@/lib/mock-data';
import { Property } from '@/types/database';

const hasSupabaseEnv = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export const getFeaturedProperties = cache(async (): Promise<Property[]> => {
  if (!hasSupabaseEnv) return mockProperties.filter((item) => item.featured);

  const supabase = createClient();
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .eq('status', 'disponivel')
    .order('featured', { ascending: false })
    .order('created_at', { ascending: false })
    .limit(6);

  if (error || !data?.length) return mockProperties.filter((item) => item.featured);
  return data;
});

export const getAllProperties = cache(async (): Promise<Property[]> => {
  if (!hasSupabaseEnv) return mockProperties;

  const supabase = createClient();
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .order('featured', { ascending: false })
    .order('created_at', { ascending: false });

  if (error || !data?.length) return mockProperties;
  return data;
});

export const getPropertyBySlug = cache(async (slug: string): Promise<Property | null> => {
  if (!hasSupabaseEnv) return mockProperties.find((item) => item.slug === slug) ?? null;

  const supabase = createClient();
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !data) return mockProperties.find((item) => item.slug === slug) ?? null;
  return data;
});

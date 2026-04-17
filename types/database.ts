export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      properties: {
        Row: {
          id: string;
          title: string;
          slug: string;
          description: string;
          price: number;
          purpose: 'venda' | 'aluguel';
          property_type: string;
          city: string;
          neighborhood: string;
          address: string | null;
          bedrooms: number;
          bathrooms: number;
          parking_spaces: number;
          area: number;
          condo_fee: number | null;
          iptu: number | null;
          featured: boolean;
          status: 'disponivel' | 'reservado' | 'vendido' | 'alugado';
          cover_image: string;
          image_urls: string[];
          broker_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          description: string;
          price: number;
          purpose: 'venda' | 'aluguel';
          property_type: string;
          city: string;
          neighborhood: string;
          address?: string | null;
          bedrooms?: number;
          bathrooms?: number;
          parking_spaces?: number;
          area: number;
          condo_fee?: number | null;
          iptu?: number | null;
          featured?: boolean;
          status?: 'disponivel' | 'reservado' | 'vendido' | 'alugado';
          cover_image: string;
          image_urls?: string[];
          broker_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['properties']['Insert']>;
      };
      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          role: 'admin' | 'broker';
          phone: string | null;
          created_at: string;
        };
        Insert: {
          id: string;
          full_name?: string | null;
          role?: 'admin' | 'broker';
          phone?: string | null;
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>;
      };
    };
  };
};

export type Property = Database['public']['Tables']['properties']['Row'];

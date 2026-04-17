import { Property } from '@/types/database';

export const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Casa de alto padrão no centro',
    slug: 'casa-alto-padrao-centro',
    description: 'Imóvel com acabamento premium, área gourmet e excelente localização para famílias que buscam conforto e segurança.',
    price: 1450000,
    purpose: 'venda',
    property_type: 'Casa',
    city: 'Guarapuava',
    neighborhood: 'Centro',
    address: 'Rua Exemplo, 120',
    bedrooms: 4,
    bathrooms: 3,
    parking_spaces: 2,
    area: 280,
    condo_fee: null,
    iptu: 1800,
    featured: true,
    status: 'disponivel',
    cover_image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1200&q=80',
    image_urls: [
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1200&q=80'
    ],
    broker_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Apartamento sofisticado com varanda',
    slug: 'apartamento-sofisticado-varanda',
    description: 'Apartamento moderno, ideal para quem deseja morar bem, com ótima incidência solar e ambientes integrados.',
    price: 780000,
    purpose: 'venda',
    property_type: 'Apartamento',
    city: 'Guarapuava',
    neighborhood: 'Batel',
    address: 'Av. Exemplo, 400',
    bedrooms: 3,
    bathrooms: 2,
    parking_spaces: 2,
    area: 124,
    condo_fee: 650,
    iptu: 1300,
    featured: true,
    status: 'disponivel',
    cover_image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
    image_urls: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80'
    ],
    broker_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '3',
    title: 'Sala comercial pronta para uso',
    slug: 'sala-comercial-pronta-uso',
    description: 'Excelente opção para profissionais e empresas que procuram visibilidade e praticidade no dia a dia.',
    price: 4500,
    purpose: 'aluguel',
    property_type: 'Comercial',
    city: 'Guarapuava',
    neighborhood: 'Centro',
    address: 'Rua XV, 90',
    bedrooms: 0,
    bathrooms: 1,
    parking_spaces: 1,
    area: 58,
    condo_fee: 420,
    iptu: null,
    featured: false,
    status: 'disponivel',
    cover_image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80',
    image_urls: [
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80'
    ],
    broker_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

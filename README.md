# WGS Imóveis

Projeto completo em Next.js com landing page, página de detalhes do imóvel, painel administrativo para corretores, autenticação e banco no Supabase.

## 1. Instalação

```bash
npm install
cp .env.example .env.local
npm run dev
```

## 2. Variáveis de ambiente

Preencha no `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_SITE_URL=
```

## 3. Supabase

1. Crie um projeto no Supabase.
2. Rode o SQL do arquivo `supabase/schema.sql` no SQL Editor.
3. Em **Authentication > Users**, crie os usuários dos corretores.
4. Ao criar um usuário, adicione `full_name` e `role` no metadata, se quiser.
5. Confirme que o bucket `property-images` foi criado.

## 4. Estrutura principal

- `app/page.tsx`: landing page.
- `app/imoveis/[slug]/page.tsx`: detalhe do imóvel.
- `app/admin/login/page.tsx`: login.
- `app/admin/page.tsx`: cadastro de imóveis.
- `components/property-form.tsx`: formulário com upload de imagens.
- `supabase/schema.sql`: schema e políticas.

## 5. Deploy na Vercel

1. Suba o projeto para GitHub.
2. Importe na Vercel.
3. Configure as mesmas variáveis do `.env.local` no painel da Vercel.
4. Faça o deploy.

## 6. Ajustes recomendados

- Trocar WhatsApp e e-mail nos componentes `site-header.tsx` e `footer.tsx`.
- Substituir dados mockados pelos imóveis reais no Supabase.
- Adicionar edição e exclusão no painel se quiser ampliar o CRUD.
- Instalar domínio próprio e apontar na Vercel.

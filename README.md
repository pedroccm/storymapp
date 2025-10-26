# 🎬 StoryMapp - Next.js

Projeto StoryMapp migrado para Next.js com TypeScript e Tailwind CSS.

## 🚀 Como Rodar

```bash
npm run dev
```

Acesse: http://localhost:3000

## 📁 Estrutura

- `/app` - Páginas Next.js (App Router)
- `/components` - Componentes React
- `/lib` - Configurações (Supabase)
- `/public` - Assets (fontes, imagens)
- `/_olds` - Projeto HTML original

## 🔧 Tecnologias

- **Next.js 15** - Framework React
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **Supabase** - Banco de dados
- **FF Clan Pro** - Fonte personalizada

## 📝 Projeto Original

O projeto HTML original está em `/_olds/`

## ⚙️ Configuração

1. Instale as dependências:
```bash
npm install
```

2. Configure as variáveis de ambiente no arquivo `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=sua_url_do_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anon
```

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

## ✨ Funcionalidades

- ✅ Formulário de cadastro com validações completas
- ✅ Máscaras automáticas (CEP, telefone, data)
- ✅ Validação de idade (13-150 anos)
- ✅ Proteção anti-bot (honeypot)
- ✅ Rate limiting (3s entre envios)
- ✅ Integração com Supabase
- ✅ Animações suaves no card de sucesso
- ✅ Design responsivo
- ✅ Fonte personalizada FF Clan Pro

## 📦 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria build de produção
- `npm start` - Inicia o servidor de produção
- `npm run lint` - Executa o linter

**Status:** ✅ Migração completa para Next.js concluída!

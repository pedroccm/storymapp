# 🚀 Como Configurar o Deploy no Netlify

## 📋 Passos para Configurar as Variáveis de Ambiente

### 1. Acesse o Painel do Netlify
- Faça login em https://app.netlify.com
- Selecione seu site **storymapp**

### 2. Configure as Variáveis de Ambiente

1. Vá em **Site settings** (configurações do site)
2. No menu lateral, clique em **Environment variables**
3. Clique no botão **Add a variable**

### 3. Adicione as Variáveis

Adicione estas duas variáveis:

#### Variável 1:
- **Key:** `NEXT_PUBLIC_SUPABASE_URL`
- **Value:** `https://hgtxafvkplgwxxwkviyo.supabase.co`

#### Variável 2:
- **Key:** `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Value:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhndHhhZnZrcGxnd3h4d2t2aXlvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE0NzcxODcsImV4cCI6MjA3NzA1MzE4N30.h-15e72WkbKg3pXs4nM5sIiX46DpxIXHGZWHOIAShBU`

### 4. Faça o Deploy

Depois de configurar as variáveis:

1. Vá em **Deploys** no menu superior
2. Clique em **Trigger deploy** → **Deploy site**

Ou simplesmente faça um novo push para o GitHub que o Netlify irá fazer deploy automaticamente!

## ✅ Verificar o Build

O build deve completar com sucesso agora. Você pode acompanhar em tempo real na aba **Deploys**.

### O que o Netlify vai fazer:

1. ✅ Clonar o repositório do GitHub
2. ✅ Instalar dependências (`npm install`)
3. ✅ Carregar as variáveis de ambiente
4. ✅ Fazer build do Next.js (`npm run build`)
5. ✅ Publicar o site

## 🎯 URL do Site

Após o deploy, seu site estará disponível em:
- URL padrão: `https://[seu-site].netlify.app`
- Você pode configurar um domínio customizado depois

---

## 🔒 Nota de Segurança

As chaves `NEXT_PUBLIC_*` são seguras para serem expostas no frontend porque:
- São protegidas por RLS (Row Level Security) no Supabase
- Só permitem operações que você configurou nas políticas do banco
- A chave ANON só pode fazer INSERT na tabela `cadastros_comunidade`

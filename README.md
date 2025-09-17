# ChatBot RAG - Aplicação React com Supabase

Uma aplicação moderna de ChatBot com sistema RAG (Retrieval-Augmented Generation), autenticação JWT e backend integrado ao Supabase.

## 🚀 Tecnologias Utilizadas

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Build**: Vite
- **Deploy**: Google Cloud Platform (GCP)
- **Containerização**: Docker

## 📋 Pré-requisitos

- Node.js 18+
- npm ou yarn
- Conta Google Cloud Platform
- Projeto Supabase configurado

## 🛠️ Instalação e Configuração Local

1. **Clone o repositório**
   ```bash
   git clone <url-do-repositorio>
   cd chatbot-rag
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**
   
   Crie um arquivo `.env` na raiz do projeto:
   ```env
   VITE_SUPABASE_PROJECT_ID="nozxgiyyucuuzpoptjtb"
   VITE_SUPABASE_PUBLISHABLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5venhnaXl5dWN1dXpwb3B0anRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc1NDMzODQsImV4cCI6MjA3MzExOTM4NH0.A95UbDgt3ho9pJvJ4RODP0VUgAUoD-gHR7DE531KUhw"
   VITE_SUPABASE_URL="https://nozxgiyyucuuzpoptjtb.supabase.co"
   ```

4. **Execute em modo de desenvolvimento**
   ```bash
   npm run dev
   ```

## 🗄️ Banco de Dados

O projeto utiliza Supabase com PostgreSQL. A migração automática cria:

- **Tabela `profiles`**: Dados adicionais dos usuários
- **RLS (Row Level Security)**: Políticas de segurança implementadas
- **Triggers**: Criação automática de perfis e atualização de timestamps
- **Autenticação JWT**: Sistema completo de auth

### Schema Principal

```sql
-- Tabela de perfis dos usuários
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

## 🎨 Sistema de Design

O projeto implementa um design system robusto com:

- **Cores semânticas**: HSL com suporte a dark/light mode
- **Gradientes customizados**: Primary, hero, elegant
- **Shadows elegantes**: Com efeitos de profundidade
- **Animações suaves**: Fade-in, pulse-glow
- **Componentes UI**: Baseados em shadcn/ui

## 🚀 Deploy no Google Cloud Platform

### 1. Deploy Rápido (Recomendado)

```bash
# Torne o script executável
chmod +x deploy-gcp.sh

# Execute o deploy
./deploy-gcp.sh [SEU-PROJECT-ID]
```

### 2. Preparação Manual do Ambiente GCP

```bash
# Instale o Google Cloud CLI
curl https://sdk.cloud.google.com | bash
exec -l $SHELL

# Faça login e configure o projeto
gcloud auth login
gcloud config set project [SEU-PROJECT-ID]

# Habilite as APIs necessárias
gcloud services enable cloudbuild.googleapis.com
gcloud services enable run.googleapis.com
gcloud services enable containerregistry.googleapis.com
```

### 3. Build e Deploy Manual

```bash
# Build da aplicação
npm run build

# Build da imagem Docker
docker build -t gcr.io/[PROJECT-ID]/chatbot-rag .

# Push para Container Registry
docker push gcr.io/[PROJECT-ID]/chatbot-rag

# Deploy no Cloud Run
gcloud run deploy chatbot-rag \
  --image gcr.io/[PROJECT-ID]/chatbot-rag \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --port 8080 \
  --memory 512Mi \
  --cpu 1
```

### 4. Deploy Automático com Cloud Build

```bash
# Configurar trigger de CI/CD
gcloud builds submit --config cloudbuild.yaml .

# Ou conectar ao repositório Git para deploy automático
gcloud builds triggers create github \
  --repo-name=[REPO-NAME] \
  --repo-owner=[GITHUB-USERNAME] \
  --branch-pattern="^main$" \
  --build-config=cloudbuild.yaml
```

### 5. Configuração de Domínio Personalizado

```bash
# Mapear domínio customizado
gcloud run domain-mappings create \
  --service chatbot-rag \
  --domain [SEU-DOMINIO.com] \
  --region us-central1
```

## 📊 Monitoramento e Logs

- **Cloud Logging**: Logs automáticos disponíveis no GCP Console
- **Cloud Monitoring**: Métricas de performance e uptime
- **Health Check**: Endpoint `/health` para verificação de status

## 🔧 Comandos Úteis

```bash
# Desenvolvimento
npm run dev          # Servidor de desenvolvimento
npm run build        # Build para produção
npm run preview      # Preview do build local

# Docker
docker build -t chatbot-rag .
docker run -p 8080:8080 chatbot-rag

# GCP
gcloud run logs tail chatbot-rag --region=us-central1
gcloud run services describe chatbot-rag --region=us-central1
```

## 🛡️ Segurança

- **RLS**: Row Level Security implementada no Supabase
- **JWT**: Tokens seguros com refresh automático
- **HTTPS**: Forçado em produção via Cloud Run
- **Headers de Segurança**: CSP, HSTS, XSS Protection configurados

## 📱 Features Implementadas

- ✅ Autenticação completa (Login/Signup)
- ✅ Dashboard responsivo
- ✅ Sistema de profiles
- ✅ Dark/Light mode
- ✅ Componentes UI reutilizáveis
- ✅ Notificações toast
- ✅ Validação de formulários
- ✅ Deploy automatizado GCP

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Suporte

Para questões e suporte, abra uma issue no repositório ou entre em contato através dos canais de comunicação do projeto.

---

**Desenvolvido com ❤️ usando React, TypeScript e Supabase**

## 🔗 Links Úteis

- **Projeto Lovable**: https://lovable.dev/projects/6ed3ccdf-d0b2-45cd-9293-ce80074c5d76
- **Supabase Dashboard**: https://supabase.com/dashboard/project/nozxgiyyucuuzpoptjtb
- **Google Cloud Console**: https://console.cloud.google.com
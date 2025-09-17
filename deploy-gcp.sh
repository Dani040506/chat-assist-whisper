#!/bin/bash

# Script de deploy automatizado para Google Cloud Platform
# Uso: ./deploy-gcp.sh [PROJECT-ID]

set -e

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Verificar se PROJECT_ID foi fornecido
if [ -z "$1" ]; then
    echo -e "${RED}❌ Erro: PROJECT_ID não fornecido${NC}"
    echo "Uso: ./deploy-gcp.sh [PROJECT-ID]"
    exit 1
fi

PROJECT_ID=$1
IMAGE_NAME="gcr.io/$PROJECT_ID/chatbot-rag"
SERVICE_NAME="chatbot-rag"
REGION="us-central1"

echo -e "${YELLOW}🚀 Iniciando deploy para GCP...${NC}"
echo -e "${YELLOW}📋 Projeto: $PROJECT_ID${NC}"
echo -e "${YELLOW}🐳 Imagem: $IMAGE_NAME${NC}"

# Verificar se está logado no gcloud
if ! gcloud auth list --filter=status:ACTIVE --format="value(account)" | grep -q "@"; then
    echo -e "${RED}❌ Erro: Não está logado no Google Cloud${NC}"
    echo "Execute: gcloud auth login"
    exit 1
fi

# Configurar projeto
echo -e "${YELLOW}⚙️  Configurando projeto...${NC}"
gcloud config set project $PROJECT_ID

# Habilitar APIs necessárias
echo -e "${YELLOW}🔧 Habilitando APIs necessárias...${NC}"
gcloud services enable cloudbuild.googleapis.com
gcloud services enable run.googleapis.com
gcloud services enable containerregistry.googleapis.com

# Build da aplicação
echo -e "${YELLOW}📦 Fazendo build da aplicação...${NC}"
npm ci
npm run build

# Build da imagem Docker
echo -e "${YELLOW}🐳 Construindo imagem Docker...${NC}"
docker build -t $IMAGE_NAME:latest .

# Push para Container Registry
echo -e "${YELLOW}📤 Enviando imagem para Container Registry...${NC}"
docker push $IMAGE_NAME:latest

# Deploy no Cloud Run
echo -e "${YELLOW}🚢 Fazendo deploy no Cloud Run...${NC}"
gcloud run deploy $SERVICE_NAME \
    --image $IMAGE_NAME:latest \
    --platform managed \
    --region $REGION \
    --allow-unauthenticated \
    --port 8080 \
    --memory 512Mi \
    --cpu 1 \
    --max-instances 10 \
    --set-env-vars NODE_ENV=production \
    --quiet

# Obter URL do serviço
SERVICE_URL=$(gcloud run services describe $SERVICE_NAME --platform managed --region $REGION --format 'value(status.url)')

echo -e "${GREEN}✅ Deploy concluído com sucesso!${NC}"
echo -e "${GREEN}🌐 URL do serviço: $SERVICE_URL${NC}"
echo -e "${GREEN}📊 Logs: gcloud run logs tail $SERVICE_NAME --region=$REGION${NC}"

# Verificar saúde do serviço
echo -e "${YELLOW}🔍 Verificando saúde do serviço...${NC}"
if curl -s "${SERVICE_URL}/health" > /dev/null; then
    echo -e "${GREEN}✅ Serviço está funcionando!${NC}"
else
    echo -e "${YELLOW}⚠️  Aguarde alguns segundos para o serviço inicializar${NC}"
fi

echo -e "${GREEN}🎉 Deploy finalizado! Acesse: $SERVICE_URL${NC}"
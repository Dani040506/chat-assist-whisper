#!/usr/bin/env node

/**
 * Script de verificação de saúde da aplicação
 * Verifica se todos os componentes estão funcionando corretamente
 */

const fs = require('fs');
const path = require('path');

const COLORS = {
  GREEN: '\x1b[32m',
  RED: '\x1b[31m',
  YELLOW: '\x1b[33m',
  BLUE: '\x1b[34m',
  RESET: '\x1b[0m',
  BOLD: '\x1b[1m'
};

function log(message, color = COLORS.RESET) {
  console.log(`${color}${message}${COLORS.RESET}`);
}

function checkFileExists(filePath, description) {
  try {
    if (fs.existsSync(filePath)) {
      log(`✅ ${description}: ${filePath}`, COLORS.GREEN);
      return true;
    } else {
      log(`❌ ${description}: ${filePath} (NÃO ENCONTRADO)`, COLORS.RED);
      return false;
    }
  } catch (error) {
    log(`❌ Erro ao verificar ${description}: ${error.message}`, COLORS.RED);
    return false;
  }
}

function checkEnvironmentVariables() {
  log(`\n${COLORS.BOLD}📋 Verificando variáveis de ambiente...${COLORS.RESET}`);
  
  const envFile = '.env';
  if (!fs.existsSync(envFile)) {
    log(`❌ Arquivo .env não encontrado`, COLORS.RED);
    return false;
  }

  const envContent = fs.readFileSync(envFile, 'utf8');
  const requiredVars = [
    'VITE_SUPABASE_PROJECT_ID',
    'VITE_SUPABASE_PUBLISHABLE_KEY',
    'VITE_SUPABASE_URL'
  ];

  let allVarsPresent = true;
  
  for (const varName of requiredVars) {
    if (envContent.includes(varName)) {
      log(`✅ ${varName}`, COLORS.GREEN);
    } else {
      log(`❌ ${varName} não encontrado`, COLORS.RED);
      allVarsPresent = false;
    }
  }

  return allVarsPresent;
}

function checkPackageJson() {
  log(`\n${COLORS.BOLD}📦 Verificando package.json...${COLORS.RESET}`);
  
  try {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    
    const requiredDeps = [
      'react',
      'react-dom',
      'typescript',
      '@supabase/supabase-js',
      'tailwindcss',
      'vite'
    ];

    let allDepsPresent = true;

    for (const dep of requiredDeps) {
      const version = packageJson.dependencies?.[dep] || packageJson.devDependencies?.[dep];
      if (version) {
        log(`✅ ${dep}: ${version}`, COLORS.GREEN);
      } else {
        log(`❌ ${dep} não encontrado`, COLORS.RED);
        allDepsPresent = false;
      }
    }

    return allDepsPresent;
  } catch (error) {
    log(`❌ Erro ao ler package.json: ${error.message}`, COLORS.RED);
    return false;
  }
}

function checkProjectStructure() {
  log(`\n${COLORS.BOLD}📁 Verificando estrutura do projeto...${COLORS.RESET}`);
  
  const criticalFiles = [
    ['src/App.tsx', 'Componente principal'],
    ['src/main.tsx', 'Ponto de entrada'],
    ['src/index.css', 'Estilos principais'],
    ['src/pages/Index.tsx', 'Página inicial'],
    ['src/pages/Auth.tsx', 'Página de autenticação'],
    ['src/hooks/useAuth.tsx', 'Hook de autenticação'],
    ['src/integrations/supabase/client.ts', 'Cliente Supabase'],
    ['tailwind.config.ts', 'Configuração Tailwind'],
    ['vite.config.ts', 'Configuração Vite'],
    ['index.html', 'Template HTML']
  ];

  let allFilesExist = true;

  for (const [filePath, description] of criticalFiles) {
    if (!checkFileExists(filePath, description)) {
      allFilesExist = false;
    }
  }

  return allFilesExist;
}

function checkDeployFiles() {
  log(`\n${COLORS.BOLD}🚀 Verificando arquivos de deploy...${COLORS.RESET}`);
  
  const deployFiles = [
    ['Dockerfile', 'Configuração Docker'],
    ['nginx.conf', 'Configuração Nginx'],
    ['app.yaml', 'Configuração Google App Engine'],
    ['cloudbuild.yaml', 'Configuração Cloud Build'],
    ['.dockerignore', 'Exclusões Docker'],
    ['.gcloudignore', 'Exclusões GCloud'],
    ['deploy-gcp.sh', 'Script de deploy automatizado']
  ];

  let allFilesExist = true;

  for (const [filePath, description] of deployFiles) {
    if (!checkFileExists(filePath, description)) {
      allFilesExist = false;
    }
  }

  return allFilesExist;
}

function main() {
  log(`${COLORS.BOLD}${COLORS.BLUE}🔍 ChatBot RAG - Verificação de Saúde${COLORS.RESET}\n`);
  
  const checks = [
    checkEnvironmentVariables(),
    checkPackageJson(),
    checkProjectStructure(),
    checkDeployFiles()
  ];

  const allPassed = checks.every(check => check);

  log(`\n${COLORS.BOLD}📊 Resumo da Verificação:${COLORS.RESET}`);
  
  if (allPassed) {
    log(`🎉 Todas as verificações passaram! O projeto está pronto para deploy.`, COLORS.GREEN);
    log(`\n${COLORS.BOLD}Próximos passos:${COLORS.RESET}`);
    log(`1. Execute: ${COLORS.YELLOW}npm install${COLORS.RESET}`);
    log(`2. Execute: ${COLORS.YELLOW}npm run build${COLORS.RESET}`);
    log(`3. Para deploy no GCP: ${COLORS.YELLOW}./deploy-gcp.sh [PROJECT-ID]${COLORS.RESET}`);
  } else {
    log(`❌ Algumas verificações falharam. Corrija os problemas antes do deploy.`, COLORS.RED);
    process.exit(1);
  }
}

main();
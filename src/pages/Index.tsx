import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Bot, Database, Settings, TrendingUp, Users, FileText, Zap } from "lucide-react";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { ChatBotStatus } from "@/components/dashboard/ChatBotStatus";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import heroImage from "@/assets/chatbot-hero.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-gradient-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-primary rounded-xl shadow-glow">
                <Bot className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">ChatBot RAG</h1>
                <p className="text-sm text-muted-foreground">WhatsApp AI Assistant</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-success/20 text-success hover:bg-success/30">
                <div className="w-2 h-2 bg-success rounded-full mr-2 animate-pulse" />
                Online
              </Badge>
              <Button variant="default" className="bg-gradient-primary shadow-primary">
                <Settings className="w-4 h-4 mr-2" />
                Configurações
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="space-y-8">
          {/* Welcome Section */}
          <div 
            className="relative text-center py-16 bg-gradient-card rounded-2xl shadow-card animate-fade-in overflow-hidden"
            style={{
              backgroundImage: `linear-gradient(rgba(34, 20, 14, 0.85), rgba(34, 20, 14, 0.85)), url(${heroImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-4xl font-bold text-foreground mb-4">
                Bem-vindo ao seu Chatbot RAG
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Sistema inteligente de atendimento via WhatsApp com integração OpenAI
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" className="bg-gradient-success shadow-primary hover:shadow-glow">
                  <Zap className="w-5 h-5 mr-2" />
                  Configurar Bot
                </Button>
                <Button variant="outline" size="lg" className="border-primary/30 hover:bg-primary/10">
                  <FileText className="w-5 h-5 mr-2" />
                  Documentação
                </Button>
              </div>
            </div>
          </div>

          {/* Status do ChatBot */}
          <ChatBotStatus />

          {/* Cards de Estatísticas */}
          <StatsCards />

          {/* Ações Rápidas */}
          <QuickActions />

          {/* Grid com informações adicionais */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <RecentActivity />
            
            <Card className="bg-gradient-card shadow-card border-border animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center text-foreground">
                  <Database className="w-5 h-5 mr-2 text-primary" />
                  Base de Conhecimento
                </CardTitle>
                <CardDescription>
                  Gerencie os documentos para o sistema RAG
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-5 h-5 text-info" />
                    <div>
                      <p className="font-medium text-foreground">FAQ Geral</p>
                      <p className="text-sm text-muted-foreground">Última atualização: há 2 dias</p>
                    </div>
                  </div>
                  <Badge variant="secondary">Ativo</Badge>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-5 h-5 text-warning" />
                    <div>
                      <p className="font-medium text-foreground">Manual de Produto</p>
                      <p className="text-sm text-muted-foreground">Última atualização: há 1 semana</p>
                    </div>
                  </div>
                  <Badge variant="outline">Pendente</Badge>
                </div>

                <Button variant="outline" className="w-full">
                  <FileText className="w-4 h-4 mr-2" />
                  Adicionar Documento
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
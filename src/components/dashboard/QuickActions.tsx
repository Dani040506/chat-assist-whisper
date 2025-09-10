import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bot, Database, Settings, MessageSquare, FileText, Zap, Key, Users } from "lucide-react";

export const QuickActions = () => {
  const actions = [
    {
      title: "Configurar OpenAI",
      description: "Adicionar sua API Key da OpenAI",
      icon: Key,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Carregar Documentos",
      description: "Upload de arquivos para o sistema RAG",
      icon: FileText,
      color: "text-info",
      bgColor: "bg-info/10",
    },
    {
      title: "Configurar WhatsApp",
      description: "Conectar com a API do WhatsApp",
      icon: MessageSquare,
      color: "text-success",
      bgColor: "bg-success/10",
    },
    {
      title: "Personalizar Bot",
      description: "Definir persona e estilo de resposta",
      icon: Bot,
      color: "text-warning",
      bgColor: "bg-warning/10",
    },
    {
      title: "Gerenciar Usuários",
      description: "Controle de acesso e permissões",
      icon: Users,
      color: "text-destructive",
      bgColor: "bg-destructive/10",
    },
    {
      title: "Configurações Avançadas",
      description: "Parâmetros técnicos e otimizações",
      icon: Settings,
      color: "text-muted-foreground",
      bgColor: "bg-muted/20",
    },
  ];

  return (
    <Card className="bg-gradient-card shadow-card border-border animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center text-foreground">
          <Zap className="w-5 h-5 mr-2 text-primary" />
          Ações Rápidas
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant="ghost"
              className="h-auto p-4 justify-start hover:bg-secondary/50 group"
            >
              <div className="flex items-start space-x-3 w-full">
                <div className={`p-2 rounded-lg ${action.bgColor} group-hover:scale-110 transition-transform`}>
                  <action.icon className={`w-5 h-5 ${action.color}`} />
                </div>
                <div className="text-left flex-1 min-w-0">
                  <h3 className="font-medium text-foreground text-sm">{action.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1 truncate">
                    {action.description}
                  </p>
                </div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
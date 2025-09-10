import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bot, Zap, AlertCircle, CheckCircle, Clock } from "lucide-react";

export const ChatBotStatus = () => {
  return (
    <Card className="bg-gradient-card shadow-card border-border animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-foreground">
          <div className="flex items-center">
            <Bot className="w-5 h-5 mr-2 text-primary" />
            Status do ChatBot
          </div>
          <Badge variant="secondary" className="bg-success/20 text-success">
            <div className="w-2 h-2 bg-success rounded-full mr-2 animate-pulse-glow" />
            Operacional
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* OpenAI Status */}
          <div className="flex items-center space-x-3 p-4 bg-secondary/50 rounded-lg">
            <div className="p-2 bg-success/10 rounded-lg">
              <CheckCircle className="w-5 h-5 text-success" />
            </div>
            <div>
              <h3 className="font-medium text-foreground">OpenAI API</h3>
              <p className="text-sm text-muted-foreground">Conectada</p>
            </div>
          </div>

          {/* WhatsApp Status */}
          <div className="flex items-center space-x-3 p-4 bg-secondary/50 rounded-lg">
            <div className="p-2 bg-warning/10 rounded-lg">
              <AlertCircle className="w-5 h-5 text-warning" />
            </div>
            <div>
              <h3 className="font-medium text-foreground">WhatsApp API</h3>
              <p className="text-sm text-muted-foreground">Configuração Pendente</p>
            </div>
          </div>

          {/* Database Status */}
          <div className="flex items-center space-x-3 p-4 bg-secondary/50 rounded-lg">
            <div className="p-2 bg-info/10 rounded-lg">
              <Clock className="w-5 h-5 text-info" />
            </div>
            <div>
              <h3 className="font-medium text-foreground">Base de Dados</h3>
              <p className="text-sm text-muted-foreground">Sincronizando</p>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
          <div className="flex items-start space-x-3">
            <Zap className="w-5 h-5 text-primary mt-0.5" />
            <div className="flex-1">
              <h4 className="font-medium text-foreground mb-1">Próximos Passos</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Para ativar completamente seu chatbot, você precisa conectar ao Supabase e configurar as integrações.
              </p>
              <Button size="sm" className="bg-gradient-primary shadow-primary">
                Conectar Supabase
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, User, Clock, CheckCircle } from "lucide-react";

export const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      type: "message",
      user: "João Silva",
      message: "Pergunta sobre horário de funcionamento",
      time: "há 5 min",
      status: "resolved",
    },
    {
      id: 2,
      type: "message",
      user: "Maria Santos",
      message: "Solicitação de suporte técnico",
      time: "há 12 min",
      status: "pending",
    },
    {
      id: 3,
      type: "message",
      user: "Pedro Costa",
      message: "Informações sobre produtos",
      time: "há 23 min",
      status: "resolved",
    },
    {
      id: 4,
      type: "message",
      user: "Ana Oliveira",
      message: "Dúvida sobre preços",
      time: "há 1h",
      status: "resolved",
    },
  ];

  return (
    <Card className="bg-gradient-card shadow-card border-border animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center text-foreground">
          <Clock className="w-5 h-5 mr-2 text-primary" />
          Atividade Recente
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start space-x-3 p-3 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-colors"
            >
              <div className="p-2 bg-primary/10 rounded-lg">
                <MessageSquare className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center space-x-2">
                    <User className="w-3 h-3 text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground">
                      {activity.user}
                    </span>
                  </div>
                  <Badge
                    variant={activity.status === "resolved" ? "secondary" : "outline"}
                    className={
                      activity.status === "resolved"
                        ? "bg-success/20 text-success"
                        : "bg-warning/20 text-warning"
                    }
                  >
                    {activity.status === "resolved" ? (
                      <CheckCircle className="w-3 h-3 mr-1" />
                    ) : (
                      <Clock className="w-3 h-3 mr-1" />
                    )}
                    {activity.status === "resolved" ? "Resolvido" : "Pendente"}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground truncate">
                  {activity.message}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {activity.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
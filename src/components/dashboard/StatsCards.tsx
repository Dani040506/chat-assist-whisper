import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Users, TrendingUp, Clock } from "lucide-react";

export const StatsCards = () => {
  const stats = [
    {
      title: "Conversas Hoje",
      value: "247",
      change: "+12%",
      icon: MessageSquare,
      color: "text-primary",
    },
    {
      title: "Usuários Ativos",
      value: "1,234",
      change: "+8%",
      icon: Users,
      color: "text-info",
    },
    {
      title: "Taxa de Resolução",
      value: "94%",
      change: "+5%",
      icon: TrendingUp,
      color: "text-success",
    },
    {
      title: "Tempo Médio",
      value: "2.3s",
      change: "-15%",
      icon: Clock,
      color: "text-warning",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="bg-gradient-card shadow-card border-border animate-fade-in hover:shadow-glow transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stat.value}</div>
            <p className="text-xs text-muted-foreground">
              <span className={`font-medium ${stat.change.startsWith('+') ? 'text-success' : 'text-warning'}`}>
                {stat.change}
              </span>{" "}
              desde o último mês
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
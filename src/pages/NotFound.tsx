import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Bot, Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center max-w-md mx-auto px-6">
        <div className="flex justify-center mb-6">
          <div className="flex items-center justify-center w-20 h-20 bg-gradient-primary rounded-2xl shadow-glow">
            <Bot className="w-10 h-10 text-primary-foreground" />
          </div>
        </div>
        <h1 className="mb-4 text-6xl font-bold text-foreground">404</h1>
        <h2 className="mb-4 text-2xl font-semibold text-foreground">Página não encontrada</h2>
        <p className="mb-8 text-muted-foreground">
          Ops! A página que você está procurando não existe ou foi movida.
        </p>
        <Button asChild className="bg-gradient-primary shadow-primary">
          <a href="/">
            <Home className="w-4 h-4 mr-2" />
            Voltar ao Dashboard
          </a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;

import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, Router as WouterRouter } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { InteractionProvider } from "./contexts/InteractionContext";
import Home from "./pages/Home";

// Get base path from Vite config for GitHub Pages compatibility
const base = import.meta.env.BASE_URL.replace(/\/$/, '') || '';

function Routes() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <InteractionProvider>
          <TooltipProvider>
            <Toaster />
            <WouterRouter base={base}>
              <Routes />
            </WouterRouter>
          </TooltipProvider>
        </InteractionProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;

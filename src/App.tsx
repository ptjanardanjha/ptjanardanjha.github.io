import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";
import { PoojaList } from "./components/PoojaList";
import { PoojaDetail } from "./components/PoojaDetail";
import { RequestStatusPage } from "./components/RequestStatusPage";
import HtmlEditorPage from "./components/HtmlEditorPage";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Set dark mode by default for spiritual theme
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/request-status" element={<RequestStatusPage />} />
            <Route path="/html-editor" element={<HtmlEditorPage />} />

            <Route path="/pooja-list" element={<PoojaList />} />  {/* ⬅️ new route */}
            <Route path="/pooja-detail/:name" element={<PoojaDetail />} /> {/* ⬅️ NEW */}

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;

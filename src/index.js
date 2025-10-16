import "./i18n";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import { AppProvider } from "./contexts/AppContext";
import { registerServiceWorker } from "./registerServiceWorker";
import { AuthProvider } from "./contexts/AuthContext";
import { BlogPostsProvider } from "./contexts/BlogsContext";
import { QueryClient, QueryClientProvider } from "react-query";

// Call the registerServiceWorker function to register the service worker
registerServiceWorker();
const root = ReactDOM.createRoot(document.getElementById("root"));
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <BlogPostsProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </BlogPostsProvider>
      </AppProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

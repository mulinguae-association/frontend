import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import { AppProvider } from "./contexts/AppContext";
import { registerServiceWorker } from "./registerServiceWorker";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import { AuthProvider } from "./contexts/AuthContext";
import { BlogPostsProvider } from "./contexts/BlogsContext";
import { QueryClient, QueryClientProvider } from 'react-query';

// Call the registerServiceWorker function to register the service worker
registerServiceWorker();
const root = ReactDOM.createRoot(document.getElementById("root"));
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			retry: 1
		}
	}
});

root.render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<AppProvider>
				<BlogPostsProvider>
					<AuthProvider>
						<I18nextProvider i18n={i18n}>
							<BrowserRouter>
								<App />
								<ToastContainer />
							</BrowserRouter>
						</I18nextProvider>
					</AuthProvider>
				</BlogPostsProvider>
			</AppProvider>
		</QueryClientProvider>
	</React.StrictMode>
);

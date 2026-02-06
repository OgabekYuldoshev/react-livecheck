import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { I18nProvider } from "@/context/i18n-context";
import { App } from "./App";

createRoot(document.getElementById("root") as HTMLElement).render(
	<StrictMode>
		<I18nProvider>
			<App />
		</I18nProvider>
	</StrictMode>,
);

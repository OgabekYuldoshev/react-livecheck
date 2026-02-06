import type { ReactNode } from "react";
import ApiReference from "@/pages/ApiReference";
import ComponentsUseLiveness from "@/pages/ComponentsUseLiveness";
import Configuration from "@/pages/Configuration";
import Examples from "@/pages/Examples";
import Faq from "@/pages/Faq";
import Installation from "@/pages/Installation";
import Introduction from "@/pages/Introduction";
import QuickStart from "@/pages/QuickStart";
import Usage from "@/pages/Usage";

export interface RouteConfig {
	path: string;
	element: ReactNode;
	labelKey: string;
}

export const routes: RouteConfig[] = [
	{ path: "/", element: <Introduction />, labelKey: "nav.introduction" },
	{ path: "/installation", element: <Installation />, labelKey: "nav.installation" },
	{ path: "/quick-start", element: <QuickStart />, labelKey: "nav.quickStart" },
	{ path: "/usage", element: <Usage />, labelKey: "nav.usage" },
	{ path: "/api-reference", element: <ApiReference />, labelKey: "nav.apiReference" },
	{
		path: "/components/use-liveness",
		element: <ComponentsUseLiveness />,
		labelKey: "nav.useLiveness",
	},
	{ path: "/examples", element: <Examples />, labelKey: "nav.examples" },
	{ path: "/configuration", element: <Configuration />, labelKey: "nav.configuration" },
	{ path: "/faq", element: <Faq />, labelKey: "nav.faq" },
];

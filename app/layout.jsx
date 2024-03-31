import "@styles/globals.css";

import Nav from "@components/Nav";
import Provider from "@components/Provider";
import { Suspense } from "react";
import Loading from "./loading";

export const metadata = {
	title: "Consolepia",
	description: "Discover & Share AI Prompts",
	icons: { icon: "/assets/images/logo.svg" },
};

const RootLayout = ({ children }) => {
	return (
		<html>
			<body>
				<Provider>
					<div className="main">
						<div className="gradient" />
					</div>
					<main className="app">
						<Nav />
						<Suspense fallback={<Loading />}>{children}</Suspense>
					</main>
				</Provider>
			</body>
		</html>
	);
};

export default RootLayout;

import { Nunito } from "next/font/google";

import type { Metadata } from "next";

import "./globals.css";

const font = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "VeeSurve Experiances",
	description: "Event Managment| Travel| Holidays",
	icons: [
		{
			url: "/images/logo.png",
			href: "/images/logo.png",
		},
	],
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>
				<div className={font.className}>{children}</div>;
			</body>
		</html>
	);
}

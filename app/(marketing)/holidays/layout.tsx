import { Nunito } from "next/font/google";

// import "./globals.css"

import Navbar from "@/app/components/navbar/Navbar";

import RegisterModal from "@/app/components/modals/RegisterModal";
import ToasterProvider from "@/app/providors/ToasterProvider";
import LoginModal from "@/app/components/modals/LoginModal";
import getCurrentUser from "@/app/actions/getCurrentUser";
import RentModal from "@/app/components/modals/RentModel";
import PhoneModel from "@/app/components/modals/PhoneModel";
import SearchModel from "@/app/components/modals/SearchModel";

const font = Nunito({ subsets: ["latin"] });

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const currentUser = await getCurrentUser();
	const destinationE = {
		flag: "IN",
		label: "India",
		latlng: [20, 77],
		region: "Asia",
		value: "IN",
	};

	return (
		<>
			<ToasterProvider />
			<SearchModel />
			<RegisterModal />
			<LoginModal />
			<PhoneModel />
			<RentModal
				packageName={""}
				description={""}
				destination={destinationE}
				citiesCovered={""}
				departureCity={""}
				nights={0}
				days={0}
				hotelStar={0}
				price={0}
				keyHighlights={[]}
				itinerary={[]}
				exclusions={[]}
				tnc={[]}
				category={""}
			/>
			<Navbar currentUser={currentUser} />
			<div className="pb-20 pt-28">{children}</div>
		</>
	);
}

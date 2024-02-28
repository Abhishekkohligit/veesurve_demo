import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
import EmptyState from "@/app/components/EmptyState";
import LisitingClient from "./ListingClient";
import getReservations from "@/app/actions/getReservations";
import { SafeListings } from "@/app/types";

interface IParams {
	listingId?: string;
}

const LisitingPage = async ({ params }: { params: IParams }) => {
	const listing = await getListingById(params);
	// let updatedListing;
	// if (listing?.user.emailVerified === undefined) {
	// 	updatedListing = {
	// 		...listing,
	// 		user: {
	// 			...listing?.user,
	// 			emailVerified: null,
	// 		},
	// 	};
	// } else {
	// 	updatedListing = {
	// 		...listing,
	// 		user: {
	// 			...listing?.user,
	// 			// emailVerified: listing?.user.emailVerified as string,
	// 		},
	// 	};
	// }

	const reservations = await getReservations(params);
	const currentUser = await getCurrentUser();

	if (!listing) {
		return <EmptyState />;
	}
	return (
		<LisitingClient
			currentUser={currentUser!}
			listing={listing}
			reservations={reservations}
		/>
	);
};

export default LisitingPage;

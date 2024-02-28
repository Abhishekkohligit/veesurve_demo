import EmptyState from "@/app/components/EmptyState";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getFavoritelistings from "@/app/actions/getFavoriteListings";
import { FavoritesClient } from "./FavoritesClient";


const ListingPage = async () => {
	const listings = await getFavoritelistings();
	const currentUser = await getCurrentUser();

	if (listings.length === 0) {
		return (
			<EmptyState
				title="No favorites found"
				subtitle="Looks like you've not favorited enything yet "
			/>
		);
	}

	return <FavoritesClient currentUser={currentUser} listings={listings} />;
};

export default ListingPage;

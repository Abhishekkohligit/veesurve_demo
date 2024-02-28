import getCurrentUser from "@/app/actions/getCurrentUser";
import getListings, { IListingsParams } from "@/app/actions/getListings";
import Container from "@/app/components/Container";
import EmptyState from "@/app/components/EmptyState";
import ListingCard from "@/app/components/listings/ListingCard";
import { SafeListings } from "@/app/types";

interface HomeProps {
	searchParams: IListingsParams;
}

const Home = async ({ searchParams }: HomeProps) => {
	const listings = await getListings(searchParams);
	const currentUser = await getCurrentUser();
	// console.log(listings);

	// const isEmpty = true;
	if (listings.length === 0) {
		return (
			<div>
				<EmptyState showReset />
			</div>
		);
	}
	return (
		<Container>
			<div className=" pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
				{listings.map((listing: SafeListings) => {
					return (
						<ListingCard
							currentUser={currentUser}
							key={listing.id}
							data={listing}
						/>
					);
				})}
			</div>
		</Container>
	);
};

export default Home;

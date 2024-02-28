import EmptyState from "@/app/components/EmptyState";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getReservations from "@/app/actions/getReservations";
import TripsClient from "./TripsClient";

// FIXME: showing all users, resolve thsi
const TripsPage = async () => {
	const currentUser = await getCurrentUser();

	console.log(currentUser?.id);

	if (!currentUser) {
		return <EmptyState title="Unauthorised" subtitle="Please Login" />;
	}

	const reservations = await getReservations({ userId: currentUser.id });

	console.log(reservations);

	if (reservations.length === 0) {
		return (
			<EmptyState
				title="No Trips Found"
				subtitle="You haven't reserved a trip yet"
			/>
		);
	}

	return <TripsClient reservations={reservations} currentUser={currentUser} />;
};

export default TripsPage;

"use client";

import Container from "@/app/components/Container";
import ListingInfo from "@/app/components/listings/LisitingInfo";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingReservation from "@/app/components/listings/ListingReservation";

import { catagories } from "@/app/components/navbar/Catagories";
import useLoginModal from "@/app/hooks/useLoginModel";
import usePhModel from "@/app/hooks/usePhModel";
// import useLoginModal2 from "@/app/hooks/useLoginModel2";

import { SafeListings, SafeUser, safeReservations } from "@/app/types";

import axios from "axios";

import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Range } from "react-date-range";
import { toast } from "react-hot-toast";

const initialDateRange = {
	startDate: new Date(),
	endDate: new Date(),
	key: "selection",
};

interface ListingClientProps {
	reservations?: safeReservations[];
	listing: SafeListings & {
		user: SafeUser;
	};
	currentUser: SafeUser;
}

const LisitingClient: React.FC<ListingClientProps> = ({
	listing,
	currentUser,
	reservations = [],
}) => {
	const loginModel = useLoginModal();
	// const phoneModel = usePhModel();
	const router = useRouter();

	const disableDates = useMemo(() => {
		let dates: Date[] = [];

		reservations.forEach((reservation) => {
			const dateRange = eachDayOfInterval({
				start: new Date(reservation.startDate),
				end: new Date(reservation.endDate),
			});
			dates = [...dates, ...dateRange];
		});

		return dates;
	}, [reservations]);

	const [isLoading, setIsLoading] = useState(false);
	const [totalPrice, setTotalPrice] = useState(listing.price);
	const [dateRange, setDateRange] = useState<Range>(initialDateRange);
	const [adult, setAdult] = useState(1);
	const [kid, setKid] = useState(0);
	const [baby, setBaby] = useState(0);

	// const reseravtionCreate = async () => {
	// 	await axios
	// 		.post("/api/reservations", {
	// 			totalPrice,
	// 			startDate: dateRange.startDate,
	// 			endDate: dateRange.endDate,
	// 			listingId: listing?.id,
	// 		})
	// 		.then(() => {
	// 			toast.success("Reserved");
	// 			setDateRange(initialDateRange);
	// 			router.push("/trips");
	// 		})
	// 		.catch(() => {
	// 			toast.error("Something went wrong");
	// 		})
	// 		.finally(() => {
	// 			setIsLoading(false);
	// 		});
	// };

	// const onSubmitButton = useCallback(() => {}, []);

	const onCreateReservation = useCallback(async () => {
		if (!currentUser) {
			return loginModel.onOpen();
		}

		setIsLoading(true);

		// if (!currentUser.phone) {
		// 	return phoneModel.onOpen();
		// }

		axios
			.post("/api/reservations", {
				totalPrice,
				startDate: dateRange.startDate,
				endDate: dateRange.endDate,
				listingId: listing?.id,
				adult: adult,
				kid: kid,
				baby: baby,
			})
			.then(() => {
				toast.success("Reserved");
				setDateRange(initialDateRange);
				router.push("/holidays/trips");
			})
			.catch(() => {
				toast.error("Something went wrong");
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, [
		totalPrice,
		dateRange,
		listing?.id,
		router,
		currentUser,
		loginModel,
		adult,
		kid,
		baby,
		// phoneModel,
	]);

	useEffect(() => {
		if (dateRange.startDate && dateRange.endDate) {
			const dayCount = differenceInCalendarDays(
				dateRange.endDate,
				dateRange.startDate
			);

			if (dayCount >= listing.days) {
				setTotalPrice(listing.price + 0.01);
			} else {
				setTotalPrice(listing.price);
			}
		}
	}, [dateRange, listing.price, listing.days]);

	const category = useMemo(() => {
		return catagories.find((item) => item.label === listing.category);
	}, [listing.category]);

	return (
		<Container>
			<div className="mx-auto max-w-screen-lg">
				<div className="flex flex-col gap-6">
					<ListingHead
						title={listing.packageName}
						imageSrc={listing.imageSrc}
						locationValue={listing.locationValue}
						id={listing.id}
						currentUser={currentUser}
					/>
					<div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
						<ListingInfo
							user={listing.user}
							category={category}
							description={listing.description}
							days={listing.days}
							nights={listing.nights}
							locactionValue={listing.locationValue}
							flights={listing.flights!}
							visaRequired={listing.visaRequired!}
							id={listing.id}
							data={listing}
						/>
						<div className="order-first mb-10 md:order-last md:col-span-3">
							<ListingReservation
								price={listing.price}
								totalPrice={totalPrice}
								onChangeDate={(value) => setDateRange(value)}
								dateRange={dateRange}
								onSubmit={onCreateReservation}
								disabled={isLoading}
								disabledDates={disableDates}
								adult={adult}
								kid={kid}
								baby={baby}
								onChangeAdult={(value) => setAdult(value)}
								onChangeKid={(value) => setKid(value)}
								onChangeBaby={(value) => setBaby(value)}
							/>
						</div>
					</div>
				</div>
			</div>
		</Container>
	);
};

export default LisitingClient;

"use client";

import useCountries from "@/app/hooks/useCountries";
import { SafeListings, SafeUser, safeReservations } from "@/app/types";
// import { Listing, Reservation } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { format } from "date-fns";
import Image from "next/image";
import HeartButton from "@/app/components/HeartButton";
import Button from "@/app/components/Button";

// import dynamic from "next/dynamic";

import {
	MdFlight,
	MdNightlight,
	MdOutlineDirectionsBusFilled,
} from "react-icons/md";
import { FaStar, FaSun, FaBreadSlice, FaBinoculars } from "react-icons/fa";
import { BsFillBuildingsFill } from "react-icons/bs";
import { GiMeal } from "react-icons/gi";
import { TbBrandVisa } from "react-icons/tb";

interface ListingCardProps {
	data: SafeListings;
	reservation?: safeReservations;
	onAction?: (id: string) => void;
	disabled?: boolean;
	actionLabel?: string;
	actionId?: string;
	currentUser?: SafeUser | null;
	userDetails?: boolean;
	reservationDetails?: boolean;
}

const ListingCard: React.FC<ListingCardProps> = ({
	data,
	reservation,
	onAction,
	disabled,
	actionLabel,
	actionId = "",
	currentUser,
	userDetails,
	reservationDetails,
}) => {
	const router = useRouter();
	const { getByValue } = useCountries();
	const location = getByValue(data.locationValue);

	const handleCancel = useCallback(
		(e: React.MouseEvent<HTMLButtonElement>) => {
			e.stopPropagation();
			if (disabled) {
				return;
			}
			onAction?.(actionId);
		},
		[onAction, actionId, disabled]
	);

	const price = useMemo(() => {
		if (reservation) {
			return reservation.totalPrice;
		}
		return data.price;
	}, [reservation, data.price]);

	let INR = new Intl.NumberFormat("en-IN", {
		style: "currency",
		currency: "INR",
		maximumSignificantDigits: 5,
	});

	const reservationDate = useMemo(() => {
		if (!reservation) {
			return null;
		}
		const start = new Date(reservation.startDate);
		const end = new Date(reservation.endDate);

		return `${format(start, "PP")} - ${format(end, "PP")}`;
	}, [reservation]);

	return (
		<div
			onClick={() => router.push(`/holidays/listings/${data.id}`)}
			className="col-span-1 cursor-pointer group"
		>
			<div className="flex flex-col gap-2 w-full h-[700px] rounded-lg text-md ">
				<div className="w-full aspect-square relative overflow-hidden rounded-xl">
					<Image
						fill
						// sizes="(max-width):768px 25vw,(max-width:1200px) 25vw,25vw"
						src={data.imageSrc}
						alt="Listing"
						className="object-cover h-full w-full group-hover:scale-110 transition"
					/>
					<div className="absolute top-3 right-3">
						<HeartButton listingId={data.id} currentUser={currentUser} />
					</div>
				</div>
				<div className="font-extrabold flex justify-center">
					{data.packageName}
				</div>
				<div className="font-semibold text-lg">
					{location?.region}, {location?.label}
				</div>
				<div className="font-light text-neutral-500">
					{reservationDate || data.category}
				</div>
				<div className="font-semibold text-neutral-500 uppercase">
					{data.citiesCovered}
				</div>
				<div className="flex flex-row items-center justify-start gap-2">
					<div className=" flex flex-row items-center justify-start">
						<MdNightlight style={{ color: "blue" }} />
						{data.nights}
						<label>N </label>
					</div>
					<div className=" flex flex-row items-center justify-start gap-1">
						<FaSun style={{ color: "blue" }} />
						{data.days}
						<label>D </label>
					</div>
				</div>

				<div className="flex flex-row items-center justify-start ">
					<div className=" flex flex-row items-center justify-start mr-2">
						{data.flights && <MdFlight size={20} style={{ color: "green" }} />}
					</div>
					<div className=" flex flex-row items-center justify-start mr-2">
						{data.visaRequired && (
							<div className="flex flex-row items-center justify-center gap-1">
								<TbBrandVisa size={35} style={{ color: "green" }} />
							</div>
						)}
					</div>

					<div className=" flex flex-row items-center justify-start gap-1 ">
						<BsFillBuildingsFill style={{ color: "blue" }} />
						{data.hotelStar}
						<FaStar size={12} style={{ color: "blue" }} />
					</div>
				</div>

				<div className="flex flex-row gap-2 justify-start ">
					<div
						id="meals"
						className=" flex flex-col items-center justify-start mr-2"
					>
						<div>
							<div className=" flex flex-row items-center justify-start mr-2">
								{data.veg && (
									<div className="flex flex-row items-center justify-center gap-1">
										<span className="font-semibold text-green-700">VEG </span>{" "}
									</div>
								)}
							</div>
							<div className=" flex flex-row items-center justify-start mr-2">
								{data.nonVeg && (
									<div className="flex flex-row items-center justify-center gap-1">
										<span className="font-semibold text-red-800">Non-VEG </span>{" "}
									</div>
								)}
							</div>
							<div className=" flex flex-row items-center justify-start mr-2">
								{data.jainVeg && (
									<div className="flex flex-row items-center justify-center gap-1">
										<span className="font-semibold text-green-700">
											Jain VEG{" "}
										</span>{" "}
									</div>
								)}
							</div>
						</div>
					</div>
					<div>
						<div className="flex flex-col items-center justify-start ">
							<div className=" flex flex-row items-center justify-start mr-2">
								{data.breakfast && (
									<div className="flex flex-row items-center justify-center gap-1">
										<span className="text-green-700">Breakfast </span>
										<FaBreadSlice style={{ color: "green" }} />
									</div>
								)}
							</div>

							<div className=" flex flex-row items-center justify-start mr-2">
								{data.lunch && (
									<div className="flex flex-row items-center justify-center gap-1">
										<span className="text-green-700">Lunch </span>
										<GiMeal style={{ color: "green" }} />
									</div>
								)}
							</div>

							<div className=" flex flex-row items-center justify-start mr-2">
								{data.dinner && (
									<div className="flex flex-row items-center justify-center gap-1">
										<span className="text-green-700">Dinner </span>
										<GiMeal style={{ color: "green" }} />
									</div>
								)}
							</div>
						</div>
					</div>
				</div>

				<div className="flex flex-row items-center justify-start">
					<div className=" flex flex-row items-center justify-start mr-2">
						{data.sightseeing && (
							<div className="flex flex-row items-center justify-center gap-1">
								<span className="text-green-700">Sightseeing </span>
								<FaBinoculars style={{ color: "green" }} />
							</div>
						)}
					</div>

					<div className=" flex flex-row items-center justify-start mr-2">
						{data.transfers && (
							<div className="flex flex-row items-center justify-center gap-1">
								<span className="text-green-700">Transfers </span>
								<MdOutlineDirectionsBusFilled style={{ color: "green" }} />
							</div>
						)}
					</div>
				</div>
				<div className="flex flex-row items-center gap-1">
					<div className="font-semibold flex items-start justify-center">
						{INR.format(price)}
					</div>
					{!reservation && <div className="font-light">Per Person</div>}
				</div>

				<div className="font-semibold flex items-start justify-center">
					{userDetails && (
						<div className="font-semibold flex flex-col gap-1 justify-between">
							<div>{currentUser?.name}</div>
							<div>{currentUser?.phone}</div>
							<div>{currentUser?.email}</div>
						</div>
					)}
				</div>
				<div className="font-semibold flex items-start justify-center flex-col">
					{reservationDetails && reservation && (
						<>
							<div className="font-semibold flex flex-row gap-1 justify-between">
								<div>Adult:{reservation?.adult}</div>
								<div>Kids:{reservation?.kid}</div>
								<div>Baby:{reservation?.baby}</div>
							</div>

							<div>
								{reservation.isArchived && (
									<p className="text-red-500">THIS IS CANCELLED</p>
								)}
							</div>
						</>
					)}
				</div>
				{onAction && actionLabel && (
					<Button
						disabled={disabled}
						small
						label={actionLabel}
						onClick={handleCancel}
					/>
				)}
			</div>
		</div>
	);
};

export default ListingCard;

"use client";

import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";
import Heading from "@/app/components/Heading";
import Image from "next/image";
import HeartButton from "@/app/components/HeartButton";

interface ListingHeadProps {
	title: string;
	locationValue: string;
	imageSrc: string;
	id: string;
	currentUser?: SafeUser | null;
}

const ListingHead: React.FC<ListingHeadProps> = ({
	title,
	locationValue,
	imageSrc,
	id,
	currentUser,
}) => {
	const { getByValue } = useCountries();
	const location = getByValue(locationValue);

	return (
		<>
			<Heading
				title={title}
				subtitle={`${location?.region}, ${location?.label}`}
			/>
			<div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
				<Image
					alt="Image"
					src={imageSrc}
					fill
					className="w-full object-cover"
				/>
				<div className="right-5 top-5 absolute">
					<HeartButton listingId={id} currentUser={currentUser} />
				</div>
			</div>
		</>
	);
};

export default ListingHead;

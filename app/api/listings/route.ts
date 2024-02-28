import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		return NextResponse.error();
	}

	const body = await request.json();

	const {
		category,
		packageName,
		destination,
		description,
		citiesCovered,
		departureCity,
		nights,
		days,
		flights,
		visaRequired,
		hotelStar,
		breakfast,
		lunch,
		dinner,
		veg,
		nonVeg,
		jainVeg,
		sightseeing,
		transfers,
		hotel,
		price,
		emi,
		emiMonths,
		keyHighlights,
		itinerary,
		// inclusions,
		exclusions,
		tnc,
		imageSrc,
	} = body;

	// let keyHighlightInput:string[] =

	// const iti = {
	// 	title: "untitled",
	// 	narration: ["1", "2"],
	// 	inclusion: ["1", "2"],
	// };

	const changeBool = (value: string) => {
		if (value === "true") {
			return true;
		}
		if (value === "false") {
			return false;
		}
	};

	const listing = await prisma.listing.create({
		data: {
			category: category,
			packageName,
			description,
			destination: destination.label,
			citiesCovered,
			departureCity,
			nights,
			days,
			// flights: JSON.parse(flights),
			flights: changeBool(flights),

			visaRequired: changeBool(visaRequired),
			hotelStar: parseInt(hotelStar, 10),
			breakfast: changeBool(breakfast),
			lunch: changeBool(lunch),
			dinner: changeBool(dinner),
			sightseeing: changeBool(sightseeing),
			veg: changeBool(veg),
			nonVeg: changeBool(nonVeg),
			jainVeg: changeBool(jainVeg),
			transfers: changeBool(transfers),
			price:parseInt(price, 10),
			emi: changeBool(emi),
			emiMonths:parseInt(emiMonths,10),
			keyHighlights,
			itinerary,
			exclusions,
			tnc,
			imageSrc,
			hotel,
			locationValue: destination.value,
			userId: currentUser.id,
		},
	});

	return NextResponse.json(listing);
}

import prisma from "@/app/libs/prismadb";

export interface IListingsParams {
	userId?: string;
	startDate?: string;
	endDate?: string;
	locationValue?: string;
	category?: string;
	flights?: boolean;
	veg?: boolean;
	jainVeg?: boolean;
	priceLow?: number;
	priceHigh?: number;
}

const changeBool = (value: boolean) => {
	if (value === true) {
		return "true";
	}
	if (value === false) {
		return "false";
	}
};
export default async function getListings(params: IListingsParams) {
	try {
		const {
			userId,
			startDate,
			endDate,
			locationValue,
			flights,
			category,
			veg,
			jainVeg,
			priceLow,
			priceHigh,
		} = params;

		let query: any = {};
		if (userId) {
			query.userId = userId;
		}
		if (category) {
			query.category = category;
		}
		if (locationValue) {
			query.locationValue = locationValue;
		}
		if (flights) {
			query.flights = changeBool(flights);
		}
		if (veg) {
			query.veg = changeBool(veg);
		}
		if (jainVeg) {
			query.jainVeg = changeBool(jainVeg);
		}
		if (priceLow) {
			query.price = {
				gte: +priceLow,
			};
		}
		if (priceHigh) {
			query.price = {
				lte: +priceHigh,
			};
		}

		// if (priceLow && priceHigh) {
		// 	query.price = {
		// 		lte: +priceHigh,
		// 		gte: +priceLow,
		// 	};
		// }

		const listings = await prisma.listing.findMany({
			where: query,
			orderBy: {
				price: "asc",
			},
		});

		// console.log(query);
		const safeListings: any = listings.map((listing) => ({
			...listing,
			createdAt: listing.createdAt.toISOString(),
		}));

		return safeListings;
	} catch (error: any) {
		throw new Error(error);
	}
}

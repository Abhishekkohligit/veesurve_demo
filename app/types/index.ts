import { Listing, Reservation, User } from "@prisma/client";

export type SafeListings = Omit<Listing, "createdAt"> & {
	createdAt: string;
};

export type SafeUser = Omit<User, "createdAt" | "updatedAt"> & {
	createdAt: string;
	updatedAt: string;
	// emailVerified: string | null;
};

export type safeReservations = Omit<
	Reservation,
	"createdAt" | "startDate" | "endDate" | "listing"
> & {
	createdAt: string;
	startDate: string;
	endDate: string;
	listing: SafeListings;
};

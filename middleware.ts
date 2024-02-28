export { default } from "next-auth/middleware";

export const config = {
	matcher: [
		"/holidays/trips",
		"/holidays/favorites",
		"/holidays/reservations",
		"/holidays/properties",
	],
};

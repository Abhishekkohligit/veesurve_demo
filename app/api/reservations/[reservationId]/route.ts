import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";


interface IParams {
	reservationId?: string;
}

export async function DELETE(
	request: Request,
	{ params }: { params: IParams }
) {
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		return NextResponse.error();
	}

	const { reservationId } = params;
console.log(reservationId)

	if (!reservationId || typeof reservationId !== "string") {
		throw new Error("Invalid ID");
	}

	const reservation = await prisma.reservation.updateMany({
		where: {
			id: reservationId,
			OR: [{ userId: currentUser.id }, { listing: { userId: currentUser.id } }],
		},
		data:{
			isArchived:true
		}
	});

	return NextResponse.json(reservation);
}

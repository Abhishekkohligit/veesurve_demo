import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";


export async function POST(request: Request) {
	const body = await request.json();
	const { phone } = body;
	const currentUser = await getCurrentUser();
	if (!currentUser) {
		return NextResponse.error();
	}

	const user = await prisma.user.update({
		where: {
			id: currentUser.id,
		},
		data: {
			phone,
		},
	});

	return NextResponse.json(user);
}

import bcrypt from "bcrypt";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
	const body = await request.json();
	const { email, name, phone } = body;

	const hashedPassword = await bcrypt.hash(phone, 12);
	const user = await prisma.user.create({
		data: {
			email,
			name,
			hashedPassword,
			phone,
		},
	});
	return NextResponse.json(user);
}

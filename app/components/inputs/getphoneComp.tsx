"use client";
import { SafeUser } from "@/app/types";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const GetPhone = () => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		axios
			.post("/api/update", data)
			.then(() => {
				toast.success("Phone updated");

				reset();
			})
			.catch(() => {
				toast.error("something went wrong");
				// console.error(error);
			});
	};
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<input
				type="tel"
				placeholder="Mobile number"
				{...register("phone", { required: true, minLength: 6, maxLength: 12 })}
			/>

			<input type="submit" />
		</form>
	);
};

export default GetPhone;

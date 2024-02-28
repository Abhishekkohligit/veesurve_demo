"use client";

import usePhModel from "@/app/hooks/usePhModel";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "@/app/components/inputs/Input";
import Heading from "@/app/components/Heading";
import Modal from "./Modal";
import axios from "axios";
import { toast } from "react-hot-toast";

const PhoneModel = () => {
	const [isLoading, setIsLoading] = useState(false);
	const phoneModel = usePhModel();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FieldValues>({
		defaultValues: {
			phone: "",
		},
	});

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		setIsLoading(true);
		
		axios
			.post("/api/update", data)
			.then(() => {
				
				phoneModel.onClose();
			})
			.catch((error) => {
				toast.error("Something Went Wrong.");
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	const bodyContent = (
		<div className="flex flex-col gap-3">
			<Heading
				title="Please add your Phone Number"
				subtitle="We'll use this to Contact your with further Details"
			/>

			<Input
				id="phone"
				label="Phone"
				disabled={isLoading}
				register={register}
				errors={errors}
				required
			/>
		</div>
	);

	return (
		<Modal
			disabled={isLoading}
			isOpen={phoneModel.isOpen}
			title="Add Phone"
			actionLabel="Continue"
			onClose={phoneModel.onClose}
			onSubmit={handleSubmit(onSubmit)}
			body={bodyContent}
		/>
	);
};

export default PhoneModel;

"use client";

import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { AiFillFacebook } from "react-icons/ai";
import { useCallback, useState } from "react";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModel";

import Modal from "./Modal";
import Heading from "@/app/components/Heading";
import Input from "@/app/components/inputs/Input";
import { toast } from "react-hot-toast";
import Button from "@/app/components/Button";
import { signIn } from "next-auth/react";

const RegisterModal = () => {
	const registerModal = useRegisterModal();
	const loginModal = useLoginModal();
	const [isLoading, setIsLoading] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FieldValues>({
		defaultValues: {
			name: "",
			email: "",
			phone: 0,
		},
	});

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		setIsLoading(true);

		axios
			.post("/api/register", data)
			.then(() => {
				loginModal.onOpen();
				registerModal.onClose();
			})
			.catch((error) => {
				toast.error("Something Went Wrong.");
			})
			.finally(() => {
				setIsLoading(false);
			});
	};
	const toggle = useCallback(() => {
		registerModal.onClose();
		loginModal.onOpen();
	}, [loginModal, registerModal]);

	const bodyContent = (
		<div className="flex flex-col gap-3">
			<Heading
				title="Welcome to VeeSurve Experiances"
				subtitle="Create an Account!"
			/>
			<Input
				id="name"
				label="Name"
				disabled={isLoading}
				register={register}
				errors={errors}
				required
			/>
			<Input
				id="email"
				label="Email"
				disabled={isLoading}
				register={register}
				errors={errors}
				required
			/>
			<Input
				id="phone"
				label="Phone Number"
				type="number"
				disabled={isLoading}
				register={register}
				errors={errors}
				required
			/>
		</div>
	);
	const footerContent = (
		<div className="flex flex-col gap-2 mt-3">
			{/* <hr />
			<Button
				outline
				label="Continue with Google"
				icon={FcGoogle}
				onClick={() => signIn("google")}
			/> */}
			{/* <Button
				outline
				label="Continue with Facebook"
				icon={AiFillFacebook}
				onClick={() => signIn('facebook')}
			/>*/}
			{/* <Button
				outline
				label="Continue with Github"
				icon={AiFillGithub}
				onClick={() => signIn("github")}
			/> */}
			<div className="text-neutral-500  text-center mt-4 font-light">
				<div className="flex flex-row items-center justify-center gap-2">
					<div>Already have an account?</div>
					<div
						className=" text-neutral-800 cursor-pointer hover:underline"
						onClick={toggle}
					>
						Log in
					</div>
				</div>
			</div>
		</div>
	);

	return (
		<Modal
			disabled={isLoading}
			isOpen={registerModal.isOpen}
			title="Register"
			actionLabel="Continue"
			onClose={registerModal.onClose}
			onSubmit={handleSubmit(onSubmit)}
			body={bodyContent}
			footer={footerContent}
		/>
	);
};

export default RegisterModal;

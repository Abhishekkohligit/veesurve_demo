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
import { useRouter } from "next/navigation";

const LoginModal = () => {
	const router = useRouter();
	const registerModal = useRegisterModal();
	const loginModal = useLoginModal();
	const [isLoading, setIsLoading] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FieldValues>({
		defaultValues: {
			email: "",
			password: "",
			// phone: "",
		},
	});

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		setIsLoading(true);

		signIn("credentials", {
			...data,
			redirect: false,
		}).then((callback) => {
			setIsLoading(false);
			if (callback?.ok) {
				toast.success("Logged in");
				router.refresh();
				loginModal.onClose();
			}

			if (callback?.error) {
				toast.error(callback.error);
			}
		});
	};

	const toggle = useCallback(() => {
		loginModal.onClose();
		registerModal.onOpen();
	}, [loginModal, registerModal]);

	const bodyContent = (
		<div className="flex flex-col gap-3">
			<Heading
				title="Welcome Back to VeeSurve Experiances"
				subtitle="Login to your Account!"
			/>
			<Input
				id="email"
				label="Email"
				disabled={isLoading}
				register={register}
				errors={errors}
				required
			/>
			{/* <Input
				id="phone"
				label="Phone"
				disabled={isLoading}
				register={register}
				errors={errors}
				required
			/> */}

			<Input
				id="password"
				label="Phone"
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
				onClick={() => signIn("facebook")}
			/> */}
			{/* <Button
				outline
				label="Continue with Github"
				icon={AiFillGithub}
				onClick={() => signIn("github")}
			/> */}
			<div className="text-neutral-500  text-center mt-4 font-light">
				<div className="flex flex-row items-center justify-center gap-2">
					<div>Don`&apos;t have an account?</div>
					<div
						className=" text-neutral-800 cursor-pointer hover:underline"
						onClick={toggle}
					>
						Create an Account
					</div>
				</div>
			</div>
			;
		</div>
	);

	return (
		<Modal
			disabled={isLoading}
			isOpen={loginModal.isOpen}
			title="Log in"
			actionLabel="Continue"
			onClose={loginModal.onClose}
			onSubmit={handleSubmit(onSubmit)}
			body={bodyContent}
			footer={footerContent}
		/>
	);
};

export default LoginModal;

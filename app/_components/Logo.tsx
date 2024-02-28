"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const LogoHome = () => {
	const router = useRouter();

	return (
		<Image
			onClick={() => router.push("/")}
			alt="logo"
			className=" cursor-pointer rounded-lg"
			height={75}
			width={75}
			src="/images/logo.png"
		/>
	);
};

export default LogoHome;

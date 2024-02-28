"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
	const router = useRouter();

	return (
		<Image
			onClick={() => router.push("/holidays")}
			alt="logo"
			className="hidden md:block cursor-pointer"
			height={75}
			width={75}
			src="/images/logo.png"
		/>
	);
};

export default Logo;

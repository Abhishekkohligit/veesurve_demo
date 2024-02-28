"use client";
import LogoHome from "./Logo";

import { useRouter } from "next/navigation";
import { Button } from "@/app/components/ui/button";

export const NavbarHome = () => {
	const router = useRouter();
	return (
		<nav
			className="w-full p-3 fixed top-0 left-0 
		 bg-neutral-100 shadow-xl z-[50] "
		>
			<div className="w-full justify-between items-center flex flex-row ">
				<div
					className="flex flex-row items-center gap-3"
					onClick={() => router.push("/")}
				>
					<LogoHome />
					<h1 className=" font-bold text-2xl upp">VEESURVE Experiences</h1>
				</div>
				<div className="hidden md:flex md:flex-row gap-1">
					<div className="flex gap-1">
						<Button
							onClick={() => router.push("/holidays")}
							className="border border-neutral-900 rounded-full font-semibold text-md bg-neutral-100 hover:bg-neutral-900 hover:text-white hover:border-white"
							size="default"
							variant="outline"
						>
							Holidays
						</Button>
						<Button
							onClick={() => router.push("/events")}
							className="border border-neutral-900 rounded-full font-semibold text-md bg-neutral-100 hover:bg-neutral-900 hover:text-white hover:border-white"
							size="default"
							variant="outline"
						>
							Events
						</Button>
					</div>
					<div>
						<Button
							onClick={() => router.push("/contact")}
							className="border border-neutral-900 rounded-full font-semibold text-md bg-neutral-100 hover:bg-neutral-900 hover:text-white hover:border-white"
							size="default"
							variant="outline"
						>
							Contact us
						</Button>
					</div>
				</div>
			</div>
		</nav>
	);
};

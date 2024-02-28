"use client";
import { HeroImage } from "./_components/heroImage";
import { NavbarHome } from "./_components/navbar-home";

import { Button } from "@/app/components/ui/button";
import { useRouter } from "next/navigation";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";

const MarketingPage = () => {
	const router = useRouter();
	return (
		<>
			<div className="h-full w-full p-5 bg-gray-100 flex flex-col gap-4 items-center mt-[110px]">
				{/* navbar */}
				<NavbarHome />
				
				<HeroImage
					url={
						"https://api.unsplash.com/search/photos? page=1&query=vaccation&client_id=6TgHjsUuXsvgkOzFv0PA3WHOTlUnTELOLIyxJ5Q0WXw"
					}
				/>

				<div className="w-[60vw] bg-slate-100s mt-5">
					Welcome to{" "}
					<span className="font-bold uppercase">VEESURVE Experiences</span>,
					your one-stop shop for all your planning & execution needs related to
					your event, holiday & travel requirement. We specialize in creating
					unforgettable experiences for our clients. Our team of expert planners
					and designers are dedicated to bringing your vision to life. We offer
					a wide range of services, including conceptualization,
					venue/destination selection, vendor management, logistics, decor,
					entertainment, and much more. Our portfolio includes services suitable
					to both corporates & individuals such as corporate events, private
					parties, weddings, etc.; and honeymoon planning, group travel,
					customised tours, flight tickets and much more. We are committed to
					working within your budget to create an unforgettable event that
					exceeds your expectations.
				</div>

				<div className=" font-extrabold">
					To Explore our services please choose one of the below
				</div>
				<div>
					<div className="flex flex-col items-center justify-center gap-1">
						<Button
							onClick={() => router.push("/holidays")}
							className="group border hover:border-neutral-900 rounded-full font-semibold text-md hover:bg-neutral-100 bg-neutral-900 text-white border-white p-2"
							size="default"
							variant="outline"
						>
							<p className="mr-2">Explore Holidays</p>

							<FaArrowAltCircleRight
								size={25}
								className="group-hover:animate-spin transition  "
							/>
						</Button>
						<Button
							onClick={() => router.push("/events")}
							className="group border hover:border-neutral-900 rounded-full font-semibold text-md hover:bg-neutral-100 bg-neutral-900 text-white border-white p-2"
							size="default"
							variant="outline"
						>
							<FaArrowAltCircleLeft
								size={25}
								className="group-hover:animate-spin transition  "
							/>
							<p className="ml-2">Explore Events</p>
						</Button>
					</div>
				</div>
			</div>
		</>
	);
};

export default MarketingPage;

"use client";
import { HeroImage } from "@/app/_components/heroImage";
import { NavbarHome } from "@/app/_components/navbar-home";

import { Button } from "@/app/components/ui/button";
import { useRouter } from "next/navigation";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";

const EventsPage = () => {
	const router = useRouter();
	return (
		<>
			<div className="h-full w-full p-5 bg-gray-100 flex flex-col gap-4 items-center mt-[110px]">
				{/* navbar */}
				<NavbarHome />

				<HeroImage
					url={
						"https://api.unsplash.com/search/photos?page=1&query=Banquet&client_id=6TgHjsUuXsvgkOzFv0PA3WHOTlUnTELOLIyxJ5Q0WXw"
					}
				/>

				<div className="w-[60vw] bg-slate-100s mt-5 pb-3">
					<div className="flex flex-col justify-center gap-3 text-[16px]">
						<h1 className=" font-bold text-lg my-4">
							Event Management Services
						</h1>
						<p>
							At{" "}
							<span className="font-bold uppercase">VEESURVE Experiences</span>,
							our team of expert planners and designers are dedicated to
							bringing your vision to life. We understand that planning an event
							can be a daunting task, which is why we`&apos;re here to make the
							process as seamless and stress-free as possible. Our goal is to
							take the burden off of you, so you can sit back, relax, and enjoy
							your special occasion.
						</p>
						<p>
							From intimate gatherings to grandiose affairs, we have the
							experience and expertise to make your event a success. We take
							pride in our attention to detail and personalized approach to
							ensure that every event is unique and reflective of our
							client`&apos;s personalities and preferences.
						</p>
						<p>
							We offer a comprehensive range of services to help you plan and
							execute your event seamlessly.<br/>
							 Our services include:
						</p>
						<div className="flex flex-col gap-2 mt-0">
							<p className="underline font-md font-semibold">
								Event Conceptualization:
							</p>
							{/*  */}
							<div className="pl-10">
								We work with you to understand your vision and create an event
								concept that is unique and reflective of your personality and
								preferences. We`&apos;ll help you to choose the perfect theme,
								color scheme, and overall aesthetic for your event.
							</div>
						</div>
						<div className="flex flex-col gap-2 mt-0">
							<p className="underline font-md font-semibold">
								Venue Selection:
							</p>

							<div className="pl-10">
								We have a wide network of venues to choose from, including
								hotels, banquet halls, outdoor spaces, and more. We`&apos;ll
								help you find the perfect venue that meets your needs, budget,
								and location.
							</div>
						</div>
						<div className="flex flex-col gap-2 mt-0">
							<p className="underline font-md font-semibold">
								Vendor Management:
							</p>

							<div className="pl-10">
								We`&apos;ll help you to find and manage all the vendors you need
								for your event, including catering, lighting, audio-visual,
								photography, and more. We`&apos;ll work with them to ensure that
								everything runs smoothly on the day of the event.
							</div>
						</div>
						<div className="flex flex-col gap-2 mt-0">
							<p className="underline font-md font-semibold">Decor:</p>

							<div className="pl-10">
								We`&apos;ll work with you to create a visually stunning event
								that will leave a lasting impression on your guests. We`&apos;ll
								help you with everything from table settings to lighting, and
								more.
							</div>
						</div>
						<div className="flex flex-col gap-2 mt-0">
							<p className="underline font-md font-semibold">Entertainment:</p>

							<div className="pl-10">
								We`&apos;ll help you to find the perfect entertainment for your
								event, including live bands, DJs, comedians, and more.
								We`&apos;ll work with you to ensure that the entertainment fits
								the theme of your event and keeps your guests engaged.
							</div>
						</div>
						<div className="flex flex-col gap-2 mt-0">
							<p className="underline font-md font-semibold">
								Event Coordination and Execution:
							</p>

							<div className="pl-10">
								On the day of the event, we`&apos;ll be there to ensure that
								everything runs smoothly. We`&apos;ll coordinate with all the
								vendors, manage the schedule, and be there to troubleshoot any
								problems that may arise.
							</div>
						</div>
						<div className="flex flex-col gap-2 mt-0">
							<p className="underline font-md font-semibold">
								Event Marketing and Promotion:
							</p>

							<div className="pl-10">
								We`&apos;ll help you to promote your event through various
								channels like social media, email, and more, to attract as many
								guests as possible.
							</div>
						</div>
					</div>
				</div>

				<div className=" font-extrabold">
					To Explore our other services please Click on the below link
				</div>
				<div>
					<div className="flex flex-col items-center justify-center gap-1">
						<Button
							onClick={() => router.push("/contact")}
							className="group border hover:border-neutral-900 rounded-full font-semibold text-md hover:bg-neutral-100 bg-neutral-900 text-white border-white p-2"
							size="default"
							variant="outline"
						>
							<p className="mr-2">Contact Us</p>

							<FaArrowAltCircleRight
								size={25}
								className="group-hover:animate-spin transition  "
							/>
						</Button>
						<Button
							onClick={() => router.push("/holidays")}
							className="group border hover:border-neutral-900 rounded-full font-semibold text-md hover:bg-neutral-100 bg-neutral-900 text-white border-white p-2"
							size="default"
							variant="outline"
						>
							<FaArrowAltCircleLeft
								size={25}
								className="group-hover:animate-spin transition  "
							/>
							<p className="ml-2">Explore Holidays</p>
						</Button>
					</div>
				</div>
			</div>
		</>
	);
};

export default EventsPage;

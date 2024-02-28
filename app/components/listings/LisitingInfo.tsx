"use client";

import useCountries from "@/app/hooks/useCountries";
import { SafeListings, SafeUser } from "@/app/types";
import { IconType } from "react-icons";
import Avatar from "@/app/components/Avatar";
import ListingCategory from "./LisitingCategory";
import { FaStar, FaRegGrinStars } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import dynamic from "next/dynamic";
import { BsFillBuildingsFill } from "react-icons/bs";
import { FcPlanner } from "react-icons/fc";
import { FaArrowsToDot } from "react-icons/fa6";
import { IoMdArrowDropright } from "react-icons/io";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/app/components/ui/accordion";

interface LisitingInfoProps {
	user: SafeUser;
	category:
		| {
				icon: IconType;
				label: string;
				description: string;
		  }
		| undefined;
	description: string;
	days: number;
	nights: number;
	locactionValue: string;
	id?: string;
	flights?: boolean | undefined;
	visaRequired?: boolean | undefined;

	data: SafeListings;
}

const Map = dynamic(() => import("../Map"), { ssr: false });

const ListingInfo: React.FC<LisitingInfoProps> = ({
	user,
	category,
	description,
	days,
	nights,
	locactionValue,
	flights,
	visaRequired,

	id,
	data,
}) => {
	const { getByValue } = useCountries();
	const listing = data;
	const cities = data.citiesCovered.split(",");
	const hotel = data.hotel?.split(",");
	const depatureCities = data.departureCity?.split(",");

	const coordinates = getByValue(locactionValue)?.latlng;
	// console.log(flights)
	return (
		<div className="col-span-4 flex flex-col gap-8">
			<div className="flex flex-col gap-2">
				<div className="flex flex-row text-xl font-semibold items-center gap-2">
					<div>Hosted by {user?.name}</div>
					{/* <Avatar src={user?.image} /> */}
				</div>

				{category && (
					<ListingCategory
						icon={category.icon}
						label={category?.label}
						description={category?.description}
					/>
				)}

				<hr />
				<div className="text-base font-light text-neutral-500">
					<p className="font-semibold text-lg capitalize">Flights from</p>

					<div className="flex flex-row gap-x-4">
						{depatureCities.map((city) => (
							<div key={city} className="flex flex-row gap-2 items-center">
								<FaLocationDot />
								{city.trim()}
							</div>
						))}
					</div>
				</div>

				<hr />
				<div className="text-base font-light text-neutral-500">
					<p className="font-semibold text-lg capitalize">Cities covered</p>

					<div className="flex flex-row gap-x-4">
						{cities.map((city) => (
							<div key={city} className="flex flex-row gap-2 items-center">
								<FaLocationDot />
								{city.trim()}
							</div>
						))}
					</div>
				</div>
				<hr />
				<div className="flex flex-col gap-4 font-light text-neutral-500">
					<p className="font-semibold text-lg capitalize">Stay Details</p>
					<div className="flex flex-row gap-x-4">
						{hotel?.map((hot) => (
							<div key={hot} className="flex flex-row gap-2 items-center">
								<BsFillBuildingsFill size={50} />
								{hot.trim()}
							</div>
						))}
					</div>
					<div className="flex flex-row gap-2">
						<div>{nights} Nights</div>
						<div>{days} Days</div>
						<div className="flex flex-row items-center gap-x-1">
							{data.hotelStar}
							<FaStar size={16} />
						</div>
					</div>
				</div>
				<hr />
				<div className="flex flex-col gap-2 font-light text-neutral-500">
					<p className="font-semibold text-lg capitalize">Inclusions</p>
					<div className="flex flex-row gap-x-4">
						{flights ? (
							<div>Flights Included</div>
						) : (
							<div>Flights NOT Included</div>
						)}
						{visaRequired ? (
							<div>Visa Fees Included</div>
						) : (
							<div>Visa Fees NOT Included</div>
						)}
						{data.sightseeing && <p>SightSeeing</p>}
						{data.transfers && <p>Transfers</p>}
					</div>
				</div>
				<hr />
				<div className="text-base font-light text-neutral-500">
					<p className="font-semibold text-lg capitalize">Meal Options</p>
					<div className="flex flex-row gap-x-4 capitalize">
						{data.breakfast && <p>Breakfast</p>}
						{data.lunch && <p>Lunch</p>}
						{data.dinner && <p>Dinner</p>}
						{data.veg && <p>Veg</p>}
						{data.nonVeg && <p>nonVeg</p>}
						{data.jainVeg && <p>jainVeg</p>}
					</div>
				</div>

				<hr />
				<div className="text-base font-light text-neutral-500">
					{description}h
				</div>
				<hr />
				{/* <Map center={coordinates}  /> */}
				{/* removed Map for time Being */}
				<div>
					<h1 className="text-2xl font-semibold text-neutral-500">
						KEY HIGHLIGHTS
					</h1>

					<div className=" text-[15px] text-neutral-600 font font-semibold ">
						{listing.keyHighlights.map((item) => (
							<div
								key={item}
								className=" flex flex-1 items-center gap-y-6 gap-x-2"
							>
								<FaRegGrinStars size={16} /> <p className="underline">{item}</p>
							</div>
						))}
					</div>
				</div>

				{/* Itenerary */}
				<Accordion className="mt-10" type="single" collapsible>
					<AccordionItem
						className="px-1 group rounded-md text-neutral-400 border-[1px] border-neutral-300 hover:bg-neutral-500 hover:text-neutral-100 hover:scale-[1.02] transition"
						value="itinerary"
					>
						<AccordionTrigger className="uppercase font-semibold text-3xl ml-4">
							Itinerary
						</AccordionTrigger>
						<AccordionContent className="">
							<div className="flex flex-col">
								{data.itinerary.map((dayItem, index) => (
									<div key={dayItem.title} className="gap-y-4 m-2">
										<div className="p-2 border-[1px] rounded-sm">
											<div className="flex flex-row justify-normal ">
												<div className="mr-2">
													<FcPlanner size={20} />
												</div>
												<p className="text-[15px] text-neutral-600 font font-semibold underline group-hover:text-neutral-100 ">
													<span className="">Day: {index + 1} </span>
													{dayItem.title}
												</p>
											</div>
											<div className="gap-y-4 m-2">
												{dayItem.narration.map((plan) => (
													<div key={plan}>
														<div className="flex flex-col items-start justify-center">
															<div className="flex flex-row p-2 justify-normal text-wrap text-neutral-800 group-hover:text-neutral-100/80">
																<div className="p-1">
																	<FaArrowsToDot size={15} />
																</div>
																<p>{plan}</p>
															</div>
														</div>
													</div>
												))}
												<div>
													{dayItem.inclusion.map((plan) => (
														<div key={plan}>
															<div className="flex flex-col items-start justify-center">
																<div className="flex flex-row p-2 justify-normal text-wrap text-neutral-800 group-hover:text-neutral-100/80">
																	<div className="p-1">
																		<IoMdArrowDropright size={20} />
																	</div>
																	<p>{plan}</p>
																</div>
															</div>
														</div>
													))}
												</div>
											</div>
										</div>
									</div>
								))}
							</div>
						</AccordionContent>
					</AccordionItem>
				</Accordion>

				{/* Exclusions */}
				<Accordion className="mt-10" type="single" collapsible>
					<AccordionItem
						className="px-1 group rounded-md text-neutral-400 border-[1px] border-neutral-300 hover:bg-neutral-500 hover:text-neutral-100 hover:scale-[1.02] transition"
						value="exclusions"
					>
						<AccordionTrigger className="uppercase font-semibold text-3xl ml-4">
							Exclusions
						</AccordionTrigger>
						<AccordionContent className="">
							<div className="flex flex-col">
								{data.exclusions.map((item) => (
									<div key={item} className="gap-y-4 m-2">
										<div className="p-2  rounded-sm">
											<div className="flex flex-row justify-normal ">
												<div className="mr-2">
													<FaArrowsToDot size={15} />
												</div>
												<p className="text-[15px] text-neutral-500 font font-semibold  group-hover:text-neutral-100 ">
													{item}
												</p>
											</div>
										</div>
									</div>
								))}
							</div>
						</AccordionContent>
					</AccordionItem>
				</Accordion>

				{/* TNC */}
				<Accordion className="mt-10" type="single" collapsible>
					<AccordionItem
						className="px-1 group rounded-md text-neutral-400 border-[1px] border-neutral-300 hover:bg-neutral-500 hover:text-neutral-100 hover:scale-[1.02] transition"
						value="tnc"
					>
						<AccordionTrigger className="uppercase font-semibold text-3xl ml-4">
							Terms & Conditions
						</AccordionTrigger>
						<AccordionContent className="">
							<div className="flex flex-col">
								{data.tnc.map((item) => (
									<div key={item} className="gap-y-4 m-2">
										<div className="p-2 rounded-sm">
											<div className="flex flex-row justify-normal ">
												<div className="mr-2">
													<FaArrowsToDot size={15} />
												</div>
												<p className="text-[15px] text-neutral-500 font font-semibold  group-hover:text-neutral-100 ">
													{item}
												</p>
											</div>
										</div>
									</div>
								))}
							</div>
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</div>
		</div>
	);
};

export default ListingInfo;

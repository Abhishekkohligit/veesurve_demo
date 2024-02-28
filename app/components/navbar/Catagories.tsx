"use client";

import Container from "@/app/components/Container";
import { TbBeach } from "react-icons/tb";
import { IoDiamond } from "react-icons/io5";
import { GiCastle, GiIsland, GiWindmill } from "react-icons/gi";
import { MdOutlineVilla } from "react-icons/md";
import { FaSkiing } from "react-icons/fa";
import { GiMountains } from "react-icons/gi";
import CategoryBox from "@/app/components/CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";

export const catagories = [
	{
		label: "Beach",
		icon: TbBeach,
		description: "This Vacation is Close to Beach",
	},
	{
		label: "Countryside",
		icon: GiWindmill,
		description: "This Vacation is Close to Rural landscapes",
	},
	{
		label: "City",
		icon: MdOutlineVilla,
		description: "This Vacation is on City Center",
	},
	{
		label: "Hill Station",
		icon: GiMountains,
		description: "This Vacation is Hill Stations",
	},
	{
		label: "Island",
		icon: GiIsland,
		description: "This Vacation is on Island",
	},
	{
		label: "Historical",
		icon: GiCastle,
		description: "This Vacation is on Island",
	},
	{
		label: "Skiing",
		icon: FaSkiing,
		description: "This Vacation is Skiing Resort",
	},
	{
		label: "Luxury",
		icon: IoDiamond,
		description: "This Vacation is Skiing Resort",
	},
];

const Categories = () => {
	const params = useSearchParams();
	const category = params?.get("category");
	const pathname = usePathname();
	const isMainPage = pathname === "/holidays";
	if (!isMainPage) {
		return null;
	}

	return (
		<Container>
			<div className="flex flex-row pt-4 items-center justify-between overflow-x-auto">
				{catagories.map((item) => (
					<CategoryBox
						key={item.label}
						label={item.label}
						selected={category === item.label}
						icon={item.icon}
					/>
				))}
			</div>
		</Container>
	);
};

export default Categories;

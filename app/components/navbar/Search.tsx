"use client";

import useCountries from "@/app/hooks/useCountries";
import useSearchModal from "@/app/hooks/useSearchModel";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { BiSearch } from "react-icons/bi";

const Search = () => {
	const searchModel = useSearchModal();
	const params = useSearchParams();
	const { getByValue } = useCountries();

	const locationValue = params?.get("locationValue");

	const priceLow = params?.get("priceLow");

	const locationLabel = useMemo(() => {
		if (locationValue) {
			return getByValue(locationValue as string)?.label;
		}
		return "Anywhere";
	}, [locationValue, getByValue]);

	const priceLabel = useMemo(() => {
		if (priceLow) {
			if (Number(priceLow) === 1) {
				return "Upto 95K";
			}
			return `${Number(priceLow) / 0.8 / 1000}K`;
		}
	}, [priceLow]);

	return (
		<div
			onClick={searchModel.onOpen}
			className="border-[1px] w-full md:w-auto py-1 rounded-full shadow-sm hover:shadow-md transition cursor-pointer"
		>
			<div className="flex fles-row items-center justify-between">
				<div className="text-sm font-semibold px-6">{locationLabel}</div>
				<div className="hidden sm:block text-sm font-semibold px-6 border-x-[1px] flex-1 text-center">
					{priceLabel}
				</div>
				<div className="text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3">
					<div className="hidden sm:block">Search</div>
					<div className="p-2 bg-rose-500 rounded-full text-white">
						<BiSearch size={18} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Search;

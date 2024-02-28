"use client";

import useSearchModal from "@/app/hooks/useSearchModel";
import { useRouter, useSearchParams } from "next/navigation";
import Modal from "./Modal";
import { useCallback, useMemo, useState } from "react";
// import { Range } from "react-date-range";
import CountrySelect, {
	CountrySelectValue,
} from "@/app/components/inputs/CountrySelect";
import dynamic from "next/dynamic";
import qs from "query-string";
// import { formatISO } from "date-fns";
import Heading from "../Heading";
// import Calender from "../inputs/Calender";
import { CheckboxInput } from "@/app/components/inputs/CheckBoxInput";

enum STEPS {
	LOCATION = 0,
	// DATE = 1,
	INFO = 1,
}

const SearchModel = () => {
	const searchModel = useSearchModal();
	const router = useRouter();
	const params = useSearchParams();

	const [location, setLocation] = useState<CountrySelectValue>();

	const [flights, setFlights] = useState(false);
	const [veg, setVeg] = useState(false);
	const [jainVeg, setJainVeg] = useState(false);
	const [priceRange, setPriceRange] = useState(30000);

	const [step, setStep] = useState(STEPS.LOCATION);

	// const [dateRange, setDateRange] = useState<Range>({
	// 	startDate: new Date(),
	// 	endDate: new Date(),
	// 	key: "selection",
	// });

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const Map = useMemo(
		() => dynamic(() => import("../Map"), { ssr: false }),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[location]
	);

	const onBack = useCallback(() => {
		setStep((value) => value - 1);
	}, []);
	const onNext = useCallback(() => {
		setStep((value) => value + 1);
	}, []);

	const onSubmit = useCallback(async () => {
		if (step !== STEPS.INFO) {
			return onNext();
		}
		let currentQuery = {};

		if (params) {
			currentQuery = qs.parse(params.toString());

			const priceLow = priceRange * 0.8 <= 95000 ? 1 : priceRange * 0.8;
			const pricehigh = priceRange * 1.2 <= 95000 ? 95000 : priceRange * 1.2;

			const updatedQuery: any = {
				...currentQuery,
				locationValue: location?.value,
				flights: flights!,
				priceLow: priceLow!,
				pricehigh: pricehigh!,
				veg: veg!,
				jainVeg: jainVeg!,
			};
			// if (dateRange.startDate) {
			// 	updatedQuery.startDate = formatISO(dateRange.startDate);
			// }

			// if (dateRange.endDate) {
			// 	updatedQuery.endDate = formatISO(dateRange.endDate);
			// }

			const url = qs.stringifyUrl(
				{
					url: "/holidays",
					query: updatedQuery,
				},
				{ skipNull: true }
			);
			setStep(STEPS.LOCATION);
			searchModel.onClose();

			router.push(url);
		}
	}, [
		step,
		searchModel,
		location,
		router,
		onNext,
		flights,
		params,
		priceRange,
		jainVeg,
		veg,
	]);

	const actionLabel = useMemo(() => {
		if (step === STEPS.INFO) {
			return "Search";
		}

		return "Next";
	}, [step]);

	const secondaryActionLabel = useMemo(() => {
		if (step === STEPS.LOCATION) {
			return undefined;
		}
		return "Back";
	}, [step]);

	let bodyContent = (
		<div className="flex flex-col gap-8">
			<Heading
				title="Where do you wnna  go?"
				subtitle="Find your perfect Location!"
			/>
			<CountrySelect
				value={location}
				onChange={(value) => setLocation(value as CountrySelectValue)}
			/>

			<hr />
			<Map center={location?.latlng} />
		</div>
	);

	// if (step === STEPS.DATE) {
	// 	bodyContent = (
	// 		<div className="flex flex-col gap-8">
	// 			<Heading
	// 				title="When do you plan to go?"
	// 				subtitle="Make sure every one is free"
	// 			/>

	// 			<Calender
	// 				value={dateRange}
	// 				onChange={(value) => setDateRange(value.selection)}
	// 			/>
	// 		</div>
	// 	);
	// }

	if (step === STEPS.INFO) {
		bodyContent = (
			<div className="flex flex-col gap-8">
				<Heading title="More information" subtitle="find your perfect trip" />
				<div id="checkboxContainer">
					<div>
						<CheckboxInput
							id="flight"
							title="Flights"
							subtitle="Do you want flights in the package?"
							field={flights}
							onChange={() => setFlights(!flights)}
						/>
						{/* <CheckboxInput
							id="veg"
							title="Vegitarian"
							subtitle="Do you want Vegitarian Meals?"
							field={veg}
							onChange={() => setVeg(!veg)}
						/>
						<CheckboxInput
							id="jainVeg"
							title="Jain Veg"
							subtitle="Do you want Jain Vegitarian Meals?"
							field={jainVeg}
							onChange={() => setJainVeg(!jainVeg)}
						/> */}
					</div>
					<div id="priceSlider" className=" mt-2">
						<label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
							Your Price Range
						</label>
						<p className="text-sm text-muted-foreground">
							What is your budget?
						</p>
						<div>
							<input
								className="accent-neutral-700"
								type="range"
								name="priceslider"
								id="priceslider"
								min={20000}
								max={500000}
								step={10000}
								value={priceRange}
								onChange={(event) => setPriceRange(Number(event.target.value))}
							/>
						</div>
						<p>{priceRange}</p>
					</div>
				</div>
			</div>
		);
	}

	return (
		<Modal
			isOpen={searchModel.isOpen}
			onClose={searchModel.onClose}
			onSubmit={onSubmit}
			title="Filters"
			actionLabel={actionLabel}
			body={bodyContent}
			secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
			secondaryActionLabel={secondaryActionLabel}
		/>
	);
};

export default SearchModel;

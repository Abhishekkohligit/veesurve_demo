"use client";
import { Range } from "react-date-range";
import { FieldValue, FieldValues, useForm } from "react-hook-form";
import Calender from "@/app/components/inputs/Calender";
import Button from "../Button";
import { InputS } from "@/app/components/ui/input";
import { useState } from "react";

interface ListingReservationProps {
	price: number;
	dateRange: Range;
	totalPrice: number;
	onChangeDate: (value: Range) => void;
	onSubmit: () => void;
	disabled?: boolean;
	disabledDates: Date[];
	adult: number;
	kid?: number;
	baby?: number;
	onChangeAdult: (value: number) => void;
	onChangeKid: (value: number) => void;
	onChangeBaby: (value: number) => void;
}

const ListingReservation: React.FC<ListingReservationProps> = ({
	price,
	dateRange,
	totalPrice,
	onChangeDate,
	onSubmit,
	disabled,

	onChangeAdult,
	onChangeKid,
	onChangeBaby,
}) => {
	let INR = new Intl.NumberFormat("en-IN", {
		style: "currency",
		currency: "INR",
		maximumSignificantDigits: 5,
	});

	return (
		<div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
			<div className="flex flex-row items-center gap-1 p-4">
				<p className="text-md font-light text-neutral-600">Starting from :-</p>
				<div className="text-2xl font-semibold">{INR.format(price)} </div>
				<div className="font-light text-neutral-600">Per Person</div>
			</div>
			<hr />
			<Calender
				value={dateRange}
				onChange={(value) => onChangeDate(value.selection)}
			/>
			<hr />
			{/*insert input for phone number here */}

			<div className="flex flex-row gap-3 mt-2">
				<InputS
					type="number"
					placeholder="Adults"
					onChange={(e) => onChangeAdult(Number(e.target.value))}
				/>
				<InputS
					type="number"
					placeholder="Kids"
					onChange={(e) => onChangeKid(Number(e.target.value))}
				/>
				<InputS
					type="number"
					placeholder="Infants"
					onChange={(e) => onChangeBaby(Number(e.target.value))}
				/>
			</div>

			<div className="p-4">
				<Button disabled={disabled} label="Reserve" onClick={onSubmit} />
			</div>
			{/* <div className="p-4 flex flex-row items-center justify-center font-semibold text-lg">
				{INR.format(totalPrice)} <p> * Onwards</p>
			</div> */}
		</div>
	);
};

export default ListingReservation;

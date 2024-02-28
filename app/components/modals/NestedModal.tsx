import React from "react";
import { FieldValues, useFieldArray } from "react-hook-form";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";

const NestedModal = ({
	parent,
	nestIndex,
	control,
	register,
	nestArray,
	nestKey,
}: FieldValues) => {
	const name = `${parent}.${nestIndex}.${nestArray}`;
	const { fields, remove, append } = useFieldArray({
		control,
		name,
	});
	return (
		<div>
			{fields.map((field, index) => {
				return (
					<div
						className="flex flex-row gap-2 border-2 border-neutral-500 rounded-sm"
						key={field.id}
					>
						<label className="font-normal capitalize"> {nestArray} {index + 1}:</label>
						<input
							className=" bg-green-50 flex-1"
							type="text"
							{...register(`${name}.${index}.${nestKey}`)}
						/>
						{index >= 0 && (
							<button
								className="flex flex-row justify-between font-semibold items-center hover:text-white hover:bg-red-800 transition rounded-md capitalize"
								onClick={() => remove(index)}
							>
								<CiCircleMinus size={18} /> Remove {nestArray}
							</button>
						)}
					</div>
				);
			})}
			<button
				className="flex flex-row items-center  justify-center font-semibold  bg-neutral-800 text-neutral-200 rounded-md hover:bg-neutral-200 hover:text-neutral-800 transition capitalize"
				onClick={() => append({ [nestKey]: "" })}
			>
				<CiCirclePlus size={18} />
				Add {nestArray}
			</button>
		</div>
	);
};

export default NestedModal;

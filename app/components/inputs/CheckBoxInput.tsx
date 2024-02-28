"use client";

import { Checkbox } from "@/app/components/ui/checkbox";


interface CheckboxProps {
	id: string;
	title: string;
	subtitle?: string;
	field: boolean;
	onChange: () => void;
}

export function CheckboxInput({
	id,
	title,
	subtitle,
	field,
	onChange,
}: CheckboxProps) {
	return (
		<div className="items-top flex space-x-2">
			<Checkbox id={id} defaultChecked={field} onCheckedChange={onChange} />
			<div className="grid gap-1.5 leading-none">
				<label
					htmlFor={id}
					className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
				>
					{title}
				</label>
				<p className="text-sm text-muted-foreground">{subtitle}</p>
			</div>
		</div>
	);
}

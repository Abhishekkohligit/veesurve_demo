import { cn } from "@/lib/utils";
import { Slider } from "@/app/components/ui/slider";
import { useState } from "react";

type SliderProps = React.ComponentProps<typeof Slider>;

export function SliderRange({ className, ...props }: SliderProps) {
	const [value, setValue] = useState<number[]>([]);
	console.log(value);

	return (
		<Slider
			defaultValue={[30]}
			max={100}
			step={1}
			onValueChange={(value)=>setValue([...value])}
			className={cn("w-[60%]", className)}
			{...props}
		/>
	);
}

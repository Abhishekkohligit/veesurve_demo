"use client";

interface MenuItemProps {
	onClick: () => void;
	label: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ onClick, label }) => {
	return (
		<div
			onClick={onClick}
			className="px-2 py-3 w-auto hover:bg-neutral-100 transition font-semibold text-nowrap"
		>
			{label}
		</div>
	);
};

export default MenuItem;

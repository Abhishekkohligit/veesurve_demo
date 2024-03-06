"use client";

import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "@/app/components/Avatar";
import { useState, useCallback } from "react";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModel";
import useRentModal from "@/app/hooks/useRentModel";

import { signOut } from "next-auth/react";
import { SafeUser } from "@/app/types";
import { useRouter } from "next/navigation";

interface UserMenuProps {
	currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
	const router = useRouter();
	const registerModal = useRegisterModal();
	const loginModal = useLoginModal();
	const rentModal = useRentModal();
	const [isOpen, setIsOpen] = useState(false);

	const toggleOpen = useCallback(() => {
		setIsOpen((value) => !value);
	}, []);

	const onRent = useCallback(() => {
		if (!currentUser) {
			return loginModal.onOpen();
		}

		rentModal.onOpen();
	}, [loginModal, currentUser, rentModal]);

	return (
		<div className="relative">
			<div className="flex flex-row items-center gap-3">
				{/* hard code for veesurve */}
				{currentUser?.email === "veesurveetms@gmail.com" && (
					<div
						onClick={onRent}
						className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
					>
						Create Package
					</div>
				)}
				<div
					onClick={toggleOpen}
					className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
				>
					<AiOutlineMenu />
					<div className="hidden md:block">
						<Avatar src={currentUser?.image} />
					</div>
				</div>
			</div>
			{isOpen && (
				<div
					className="absolute rounded-xl shadow-md w-[40vw] md:w-[10vw] bg-white overflow-hidden right-0 top-12 text-sm"
					onMouseLeave={toggleOpen}
				>
					<div className="flex flex-col cursor-pointer  justify-start">
						{currentUser ? (
							<>
								<MenuItem
									onClick={() => router.push("/holidays/trips")}
									label="My Trips"
								/>
								<MenuItem
									onClick={() => router.push("/holidays/favorites")}
									label="My Favorites"
								/>

								{/* {currentUser?.email === "veesurveevm@gmail.com" ||
									currentUser?.email === "abkslesforce@gmail.com" && ( */}

								{currentUser?.email && (
									<MenuItem
										onClick={() => router.push("/holidays/reservations")}
										label="My Reservations"
									/>
								)}

								{currentUser?.email && (
									<MenuItem
										onClick={() => router.push("/holidays/properties")}
										label="My Packages"
									/>
								)}

								{currentUser?.email && (
									<MenuItem onClick={rentModal.onOpen} label="Create Package" />
								)}
								<hr />
								<MenuItem onClick={() => signOut()} label="Logout" />
							</>
						) : (
							<>
								<MenuItem onClick={loginModal.onOpen} label="Login" />
								<MenuItem onClick={registerModal.onOpen} label="SignUp" />
							</>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default UserMenu;

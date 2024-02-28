import { create } from "zustand";

interface PhModelStore {
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
}

const usePhModel = create<PhModelStore>((set) => ({
	isOpen: false,
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false }),
}));

export default usePhModel;

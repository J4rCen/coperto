import { create } from 'zustand'
import type { StopListUiState } from '@/types/menu'

export const useStopListUiStore = create<StopListUiState>((set) => ({
	openPanel: null,
	selectedItemId: null,
	toasts: [],
	setOpenPanel: (openPanel) => set({ openPanel }),
	selectItem: (selectedItemId) => set({ selectedItemId }),
	addToast: (toast) => set((state) => ({
		toasts: [...state.toasts, { ...toast, id: `${Date.now()}-${Math.random()}` }],
	})),
	dismissToast: (toastId) => set((state) => ({
		toasts: state.toasts.filter((toast) => toast.id !== toastId),
	})),
	clearToasts: () => set({ toasts: [] }),
}))
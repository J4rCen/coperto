import type { ReactNode } from 'react'

// Доступные цеха кухни.
export type Workshop = 'kitchen' | 'bar' | 'pastry'

// Причины остановки продаж.
export type StopReason =
	| 'out_of_stock' // закончились продукты
	| 'equipment' // сломалось оборудование
	| 'quality' // вопросы к качеству партии
	| 'menu_change'

// Статус позиции в меню.
export type Status = { kind: 'available' }
	| { kind: 'stopped', reason: StopReason, until: string | null }

// Данные позиции меню.
export interface MenuItem {
	id: string // id продукта
	title: string, // наименования
	workshop: Workshop, // цех
	stock: number, // остаток
	status: Status // статус
	updatedAt: string; // дата обновления
}

// Данные для остановки продаж позиции.
export interface StopItemPayload {
	reason: StopReason;
	until: string | null;
}

// Значения формы остановки продаж.
export type StopItemFormValues = {
	reason: StopReason
	until: string
}

// Свойства компонента позиции меню.
export interface MenuItemProps {
	item: MenuItem
	isPending: boolean
	onStop: (itemId: string) => void
	onResume: (itemId: string) => void
}

// Свойства модального окна остановки продаж.
export interface StopModalProps {
	itemTitle: string
	isPending: boolean
	onSubmit: (payload: StopItemFormValues) => void
}

// Свойства списка загрузки.
export interface LoadingListProps {
	count?: number
}

// Свойства панели состояния.
export interface StatePanelProps {
	children: ReactNode
	error?: boolean
}

// Панели, доступные в списке остановленных позиций.
export type StopListPanel = 'filters' | 'details' | null

// Варианты уведомлений интерфейса.
export type ToastTone = 'info' | 'success' | 'error'

// Данные уведомления интерфейса.
export interface UiToast {
	id: string
	message: string
	tone: ToastTone
}

// Состояние и действия UI списка остановленных позиций.
export interface StopListUiState {
	openPanel: StopListPanel
	selectedItemId: string | null
	toasts: UiToast[]
	setOpenPanel: (panel: StopListPanel) => void
	selectItem: (itemId: string | null) => void
	addToast: (toast: Omit<UiToast, 'id'>) => void
	dismissToast: (toastId: string) => void
	clearToasts: () => void
}
// Типы для цехов
export type Workshop = 'kitchen' | 'bar' | 'pastry';

// Типы причин остановки продаж
export type StopReason =
	| 'out_of_stock' // закончились продукты
	| 'equipment' // сломалось оборудование
	| 'quality' // вопросы к качеству партии
	| 'menu_change'

// Тип статуса 
export type Status = { kind: 'available' }
	| { kind: 'stopped', reason: StopReason, until: string | null }

// Интерфейс для позиций в меню
export interface MenuItem {
	id: string // id продукта
	title: string, // наименования
	workshop: Workshop, // цех
	stock: number, // остаток
	status: Status // статус
	updatedAt: string; // дата обновления
}

export interface StopItemPayload {
	reason: StopReason;
	until: string | null;
}
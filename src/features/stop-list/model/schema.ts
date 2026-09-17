import { z } from 'zod'

export const stopItemSchema = z.object({
	reason: z.enum(['out_of_stock', 'equipment', 'quality', 'menu_change'], {
		error: 'Выберите причину',
	}),
	until: z.string()
		.min(1, 'Укажите срок остановки')
		.refine((value) => value === 'До конца смены' || /^([01]\d|2[0-3]):[0-5]\d$/.test(value), 'Укажите время в формате ЧЧ:ММ'),
})


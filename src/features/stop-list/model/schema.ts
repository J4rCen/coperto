import { z } from 'zod'
import { validateUntil } from '@/shared/lib/validate-until'

function toDateTime(value: string): string {
	if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(value)) return value

	const now = new Date()
	const [hours, minutes] = value.split(':').map(Number)
	const candidate = new Date(now)
	candidate.setHours(hours, minutes, 0, 0)

	if (candidate.getTime() <= now.getTime()) {
		candidate.setDate(candidate.getDate() + 1)
	}

	return candidate.toISOString()
}

function getUntilError(value: string): string | null {
	if (value === 'До конца смены') return null

	return validateUntil(toDateTime(value))
}

export const stopItemSchema = z.object({
	reason: z.enum(['out_of_stock', 'equipment', 'quality', 'menu_change'], {
		error: 'Выберите причину',
	}),
	until: z.string()
		.min(1, 'Укажите срок остановки')
		.superRefine((value, context) => {
			const error = getUntilError(value)
			if (error) context.addIssue({ code: 'custom', message: error })
		}),
})


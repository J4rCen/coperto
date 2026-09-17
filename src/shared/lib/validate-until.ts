const MAX_AHEAD_MS = 24 * 60 * 60 * 1000
const STEP_MS = 15 * 60 * 1000

export function validateUntil(value: string | null, now = Date.now()): string | null {
	if (value === null) return null

	const timestamp = Date.parse(value)
	if (Number.isNaN(timestamp)) return 'Некорректное время'
	if (timestamp <= now) return 'Время должно быть в будущем'
	if (timestamp - now > MAX_AHEAD_MS) return 'Не больше чем на 24 часа вперёд'
	if (timestamp % STEP_MS !== 0) return 'Шаг — 15 минут'

	return null
}

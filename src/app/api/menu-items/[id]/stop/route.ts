import { NextResponse } from 'next/server'
import { stopItemSchema } from '@/features/stop-list/model/schema'

// Останавливает продажи позиции меню.
export async function POST(
	request: Request,
	{ params }: { params: Promise<{ id: string }> },
) {
	const { id } = await params
	const body = await request.json().catch(() => null)
	const result = stopItemSchema.safeParse(body)

	if (!id || !result.success) {
		return NextResponse.json({ error: 'Укажите причину и срок остановки' }, { status: 400 })
	}

	return NextResponse.json({ id, status: { kind: 'stopped', ...result.data } })
}

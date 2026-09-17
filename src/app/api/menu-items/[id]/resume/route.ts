import { NextResponse } from 'next/server'

export async function POST(
	_request: Request,
	{ params }: { params: Promise<{ id: string }> },
) {
	const { id } = await params

	if (!id) {
		return NextResponse.json({ error: 'Не указана позиция меню' }, { status: 400 })
	}

	return NextResponse.json({ id, status: { kind: 'available' } })
}

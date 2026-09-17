import type { MenuItem } from '@/types/menu'

const menuItems: MenuItem[] = [
	{ id: '1', title: 'Паста с лисичками', workshop: 'kitchen', stock: 0, status: { kind: 'stopped', reason: 'out_of_stock', until: 'Сегодня, 18:00' }, updatedAt: '10 минут назад' },
	{ id: '2', title: 'Эспрессо-тоник', workshop: 'bar', stock: 14, status: { kind: 'available' }, updatedAt: '24 минуты назад' },
	{ id: '3', title: 'Фисташковый тарт', workshop: 'pastry', stock: 0, status: { kind: 'stopped', reason: 'quality', until: null }, updatedAt: '41 минуту назад' },
	{ id: '4', title: 'Крем-суп из сельдерея', workshop: 'kitchen', stock: 8, status: { kind: 'available' }, updatedAt: '1 час назад' },
	{ id: '5', title: 'Лимонный меренговый пирог', workshop: 'pastry', stock: 0, status: { kind: 'stopped', reason: 'equipment', until: 'Завтра, 09:00' }, updatedAt: '2 часа назад' },
	{ id: '6', title: 'Куриный суп с лапшой', workshop: 'kitchen', stock: 21, status: { kind: 'available' }, updatedAt: '2 часа назад' },
	{ id: '7', title: 'Матча-тоник', workshop: 'bar', stock: 6, status: { kind: 'available' }, updatedAt: '3 часа назад' },
	{ id: '8', title: 'Круассан с миндалём', workshop: 'pastry', stock: 3, status: { kind: 'available' }, updatedAt: '3 часа назад' },
	{ id: '9', title: 'Ризотто с грибами', workshop: 'kitchen', stock: 0, status: { kind: 'stopped', reason: 'menu_change', until: 'Сегодня, 20:00' }, updatedAt: '4 часа назад' },
	{ id: '10', title: 'Негрони', workshop: 'bar', stock: 18, status: { kind: 'available' }, updatedAt: '4 часа назад' },
	{ id: '11', title: 'Шоколадный фондан', workshop: 'pastry', stock: 0, status: { kind: 'stopped', reason: 'out_of_stock', until: 'Сегодня, 17:30' }, updatedAt: '5 часов назад' },
	{ id: '12', title: 'Тёплый салат с бататом', workshop: 'kitchen', stock: 12, status: { kind: 'available' }, updatedAt: '5 часов назад' },
	{ id: '13', title: 'Грейпфрутовый спритц', workshop: 'bar', stock: 9, status: { kind: 'available' }, updatedAt: '6 часов назад' },
	{ id: '14', title: 'Малиновый чизкейк', workshop: 'pastry', stock: 4, status: { kind: 'available' }, updatedAt: '6 часов назад' },
]

// Возвращает список позиций меню.
export async function GET() {
	await new Promise((resolve) => setTimeout(resolve, 700))

	return Response.json(menuItems)
}

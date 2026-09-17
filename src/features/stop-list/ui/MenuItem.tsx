import type { MenuItem as MenuItemData, StopReason, Workshop } from '@/types/menu'

const workshopLabels: Record<Workshop, string> = {
	kitchen: 'Кухня',
	bar: 'Бар',
	pastry: 'Кондитерская',
}

const reasonLabels: Record<StopReason, string> = {
	out_of_stock: 'Нет продуктов',
	equipment: 'Оборудование',
	quality: 'Проверка качества',
	menu_change: 'Изменение меню',
}

export default function MenuItem({ item }: { item: MenuItemData }) {
	const isStopped = item.status.kind === 'stopped'

	return (
		<li className={`grid min-h-23 grid-cols-[minmax(260px,1.7fr)_minmax(120px,0.7fr)_minmax(150px,0.8fr)_minmax(300px,1.4fr)] items-center gap-6 rounded-lg border border-[#dfd9d0] bg-white px-5 py-[1.1rem] max-[760px]:grid-cols-[minmax(180px,1.4fr)_minmax(120px,0.8fr)_minmax(150px,1fr)] ${isStopped ? 'bg-[#fbfaf8] text-[#817b74]' : ''}`}>
			<div className="flex flex-col gap-2">
				<div>
					<h3 className="m-0 text-base font-semibold text-[#171512]">{item.title}</h3>
					<p className="m-0 text-xs text-[#77716a]">Обновлено {item.updatedAt}</p>
				</div>
				<span className="w-fit rounded bg-[#f1eee9] px-2 py-1 text-[0.72rem] text-[#77716a]">{workshopLabels[item.workshop]}</span>
			</div>

			<div className="flex flex-col gap-1.5">
				<span className="text-xs text-[#77716a]">Остаток</span>
				<strong className="text-sm">{item.stock} шт.</strong>
			</div>

			<div className="flex flex-col gap-1.5 max-[760px]:col-span-full max-[760px]:border-t max-[760px]:border-[#dfd9d0] max-[760px]:pt-3">
				<span className="text-xs text-[#77716a]">Статус</span>
				{item.status.kind === 'stopped' ? (
					<div className="flex flex-wrap items-center gap-2 text-xs">
						<span className="rounded-full bg-[#f6e2dc] px-2 py-1 text-[0.72rem] font-bold text-[#c6462f]">{reasonLabels[item.status.reason]}</span>
						<span>{item.status.until ?? 'Срок не указан'}</span>
					</div>
				) : <strong className="text-sm font-semibold text-[#397457]">В продаже</strong>}
			</div>
		</li>
	)
}

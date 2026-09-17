'use client'

import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import type { MenuItem as MenuItemData } from '@/types/menu'
import MenuItem from '@/features/stop-list/ui/MenuItem'
import Filter from './Filter'

async function getMenuItems(): Promise<MenuItemData[]> {
	const response = await fetch('/api/menu-items')

	if (!response.ok) {
		throw new Error('Не удалось загрузить список позиций')
	}

	return response.json()
}

function LoadingState() {
	return (
		<ul className="m-0 flex list-none flex-col gap-2 p-0" aria-label="Загрузка позиций">
			{Array.from({ length: 5 }, (_, index) => <li className="h-23 animate-pulse rounded-lg bg-[#ebe6df]" key={index} />)}
		</ul>
	)
}

export default function StopList() {
	const searchParams = useSearchParams()
	const { data: items = [], isPending, isError, error, refetch } = useQuery({
		queryKey: ['menu-items'],
		queryFn: getMenuItems,
	})

	const workshop = searchParams.get('shop')
	const status = searchParams.get('status')
	const filteredItems = items.filter((item) =>
		(!workshop || item.workshop === workshop) &&
		(!status || item.status.kind === status),
	)
	const stoppedCount = items.filter((item) => item.status.kind === 'stopped').length

	return (
		<main className="mx-auto w-[calc(100%-4rem)] max-w-280 pb-16 pt-10 max-[760px]:w-[calc(100%-2rem)] max-[760px]:pt-8">
            <Filter/>
			<header className="flex items-end justify-between gap-8 border-b border-[#dfd9d0] pb-7 max-[760px]:flex-col max-[760px]:items-start">
				<div>
					<p className="text-[0.72rem] font-bold uppercase tracking-[0.12em] text-[#c6462f]">Операционный экран</p>
					<h1 className="mt-2 text-[clamp(2rem,4vw,3rem)] font-semibold tracking-[-0.045em]">Стоп-лист</h1>
					<p className="mt-3 text-[#77716a]">Контроль доступности позиций меню по всем цехам.</p>
				</div>
				<div className="flex flex-col items-end text-[0.8rem] text-[#77716a] max-[760px]:items-start">
					<strong className="text-3xl leading-none text-[#171512]">{stoppedCount}</strong>
					<span>позиций остановлено</span>
				</div>
			</header>

			<section aria-labelledby="menu-items-heading">
				<div className="mb-4 mt-9 flex items-end justify-between gap-4">
					<div>
						<h2 id="menu-items-heading" className="text-xl font-semibold">Позиции меню</h2>
						<p className="mt-1 text-xs text-[#77716a]">{isPending ? 'Получаем актуальные данные' : `${filteredItems.length} из ${items.length} позиций`}</p>
					</div>
					<span className="pb-1 text-xs text-[#77716a] max-[760px]:hidden">Данные обновляются автоматически</span>
				</div>

				{isPending && <LoadingState />}

				{isError && (
					<div className="rounded-lg border border-dashed border-[#e0a094] bg-[#fff7f5] p-12 text-center text-(--accent)" role="alert">
						<strong>Не удалось загрузить позиции</strong>
						<p className="mt-2 text-sm">{error instanceof Error ? error.message : 'Произошла неизвестная ошибка'}</p>
						<button className="mt-5 rounded-md bg-(--accent) px-4 py-2.5 text-xs font-semibold text-white" onClick={() => refetch()}>Повторить загрузку</button>
					</div>
				)}

				{!isPending && !isError && items.length === 0 && (
					<div className="rounded-lg border border-dashed border-[#dfd9d0] bg-white/50 p-12 text-center" role="status">
						<strong>Позиции не найдены</strong>
						<p className="mt-2 text-sm text-[#77716a]">В стоп-листе пока нет данных для отображения.</p>
					</div>
				)}

				{!isPending && !isError && items.length > 0 && filteredItems.length === 0 && (
					<div className="rounded-lg border border-dashed border-[#dfd9d0] bg-white/50 p-12 text-center" role="status">
						<strong>Нет подходящих позиций</strong>
						<p className="mt-2 text-sm text-[#77716a]">Измените значения фильтров, чтобы увидеть позиции меню.</p>
					</div>
				)}

				{!isPending && !isError && filteredItems.length > 0 && (
					<ul className="m-0 flex list-none flex-col gap-2 p-0" aria-label="Позиции меню">
						{filteredItems.map((item) => <MenuItem item={item} key={item.id} />)}
					</ul>
				)}
			</section>
		</main>
	)
}

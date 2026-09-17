'use client'

import { useSearchParams } from 'next/navigation'
import MenuItem from '@/features/stop-list/ui/MenuItem'
import StopModal from '@/features/stop-list/ui/StopModal'
import Filter from './Filter'
import { useStopListUiStore } from '@/shared/store'
import { useStopListModel } from '@/features/stop-list/model/stop-list'
import { LoadingList } from '@/shared/ui/LoadingList'
import { StatePanel } from '@/shared/ui/StatePanel'

// Отображает и фильтрует список меню.
export default function StopList() {
	const searchParams = useSearchParams()
	const openPanel = useStopListUiStore((state) => state.openPanel)
	const selectedItemId = useStopListUiStore((state) => state.selectedItemId)
	const toasts = useStopListUiStore((state) => state.toasts)
	const setOpenPanel = useStopListUiStore((state) => state.setOpenPanel)
	const selectItem = useStopListUiStore((state) => state.selectItem)
	const dismissToast = useStopListUiStore((state) => state.dismissToast)
	const { data: items = [], isPending, isError, error, refetch, stopMutation, resumeMutation, pendingId } = useStopListModel()

	const workshop = searchParams.get('shop')
	const status = searchParams.get('status')
	const filteredItems = items.filter((item) =>
		(!workshop || item.workshop === workshop) &&
		(!status || item.status.kind === status),
	)
	const stoppedCount = items.filter((item) => item.status.kind === 'stopped').length
	const selectedItem = items.find((item) => item.id === selectedItemId)

	// Открывает окно остановки продаж.
	function openStopModal(itemId: string) {
		selectItem(itemId)
		setOpenPanel('details')
	}

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

				{isPending && <LoadingList />}

				{isError && (
					<StatePanel error>
						<strong>Не удалось загрузить позиции</strong>
						<p className="mt-2 text-sm">{error instanceof Error ? error.message : 'Произошла неизвестная ошибка'}</p>
						<button className="mt-5 rounded-md bg-(--accent) px-4 py-2.5 text-xs font-semibold text-white" onClick={() => refetch()}>Повторить загрузку</button>
					</StatePanel>
				)}

				{!isPending && !isError && items.length === 0 && (
					<StatePanel>
						<strong>Позиции не найдены</strong>
						<p className="mt-2 text-sm text-[#77716a]">В стоп-листе пока нет данных для отображения.</p>
					</StatePanel>
				)}

				{!isPending && !isError && items.length > 0 && filteredItems.length === 0 && (
					<StatePanel>
						<strong>Нет подходящих позиций</strong>
						<p className="mt-2 text-sm text-[#77716a]">Измените значения фильтров, чтобы увидеть позиции меню.</p>
					</StatePanel>
				)}

				{!isPending && !isError && filteredItems.length > 0 && (
					<ul className="m-0 flex list-none flex-col gap-2 p-0" aria-label="Позиции меню">
						{filteredItems.map((item) => <MenuItem item={item} isPending={pendingId === item.id} onStop={openStopModal} onResume={(itemId) => resumeMutation.mutate(itemId)} key={item.id} />)}
					</ul>
				)}
			</section>

			{openPanel === 'details' && selectedItem && (
				<StopModal
					itemTitle={selectedItem.title}
					isPending={pendingId === selectedItem.id}
					onSubmit={(payload) => stopMutation.mutate({ itemId: selectedItem.id, payload })}
				/>
			)}

			<div className="fixed bottom-5 right-5 z-40 flex max-w-[calc(100%-2rem)] flex-col gap-2" aria-live="polite">
				{toasts.map((toast) => (
					<div className={`flex items-center gap-4 rounded-lg border bg-white px-4 py-3 text-sm shadow-lg ${toast.tone === 'error' ? 'border-[#e0a094] text-[#c6462f]' : 'border-[#b9d5c3] text-[#397457]'}`} key={toast.id}>
						<span>{toast.message}</span>
						<button type="button" className="text-lg leading-none" onClick={() => dismissToast(toast.id)} aria-label="Закрыть уведомление">x</button>
					</div>
				))}
			</div>
		</main>
	)
}

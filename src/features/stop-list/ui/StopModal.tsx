'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useStopListUiStore } from '@/shared/store'
import { stopItemSchema } from '@/features/stop-list/model/schema'
import type { StopItemFormValues, StopModalProps } from '@/types/menu'

const reasons = [
	{ value: 'out_of_stock', label: 'Закончились продукты' },
	{ value: 'equipment', label: 'Сломалось оборудование' },
	{ value: 'quality', label: 'Вопросы к качеству партии' },
	{ value: 'menu_change', label: 'Изменение меню' },
] as const

// Отображает форму остановки продаж.
export default function StopModal({ itemTitle, isPending, onSubmit }: StopModalProps) {
	const setOpenPanel = useStopListUiStore((state) => state.setOpenPanel)
	const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<StopItemFormValues>({
		resolver: zodResolver(stopItemSchema),
		defaultValues: { until: 'До конца смены' },
	})
	const until = watch('until')

	// Закрывает модальное окно.
	function close() {
		if (!isPending) setOpenPanel(null)
	}

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-[#171512]/45 p-4" role="presentation" onMouseDown={close}>
			<section className="w-full max-w-md rounded-lg bg-white p-6 shadow-2xl" role="dialog" aria-modal="true" aria-labelledby="stop-modal-title" onMouseDown={(event) => event.stopPropagation()}>
				<div className="mb-6 flex items-start justify-between gap-4">
					<div>
						<p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#c6462f]">Остановить продажи</p>
						<h2 id="stop-modal-title" className="mt-2 text-xl font-semibold">{itemTitle}</h2>
					</div>
					<button type="button" className="text-2xl leading-none text-[#77716a]" onClick={close} aria-label="Закрыть">×</button>
				</div>

				<form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
					<label className="flex flex-col gap-2 text-sm font-medium">
						Причина
						<select className={`rounded-md border bg-white px-3 py-2.5 font-normal outline-none ${errors.reason ? 'border-[#c6462f]' : 'border-[#dfd9d0]'}`} {...register('reason')}>
							<option value="">Выберите причину</option>
							{reasons.map((option) => <option value={option.value} key={option.value}>{option.label}</option>)}
						</select>
						{errors.reason && <span className="text-xs font-normal text-[#c6462f]">{errors.reason.message}</span>}
					</label>

					<fieldset className="flex flex-col gap-2 text-sm font-medium">
						<legend>Срок остановки</legend>
						<label className="flex items-center gap-2 font-normal">
							<input type="radio" name="deadline" checked={until === 'До конца смены'} onChange={() => setValue('until', 'До конца смены', { shouldValidate: true })} />
							До конца смены
						</label>
						<label className="flex items-center gap-2 font-normal">
							<input type="radio" name="deadline" checked={until !== 'До конца смены'} onChange={() => setValue('until', '', { shouldValidate: true })} />
							Конкретное время
						</label>
						{until !== 'До конца смены' && <input type="time" className={`rounded-md border px-3 py-2.5 font-normal outline-none ${errors.until ? 'border-[#c6462f]' : 'border-[#dfd9d0]'}`} value={until} onChange={(event) => setValue('until', event.target.value, { shouldValidate: true })} />}
						{errors.until && <span className="text-xs font-normal text-[#c6462f]">{errors.until.message}</span>}
					</fieldset>

					<div className="flex justify-end gap-3 border-t border-[#dfd9d0] pt-5">
						<button type="button" className="rounded-md px-3 py-2 text-sm text-[#77716a]" onClick={close} disabled={isPending}>Отмена</button>
						<button type="submit" className="rounded-md bg-[#c6462f] px-4 py-2 text-sm font-semibold text-white disabled:cursor-wait disabled:opacity-60" disabled={isPending}>
							{isPending ? 'Сохраняется...' : 'Остановить продажи'}
						</button>
					</div>
				</form>
			</section>
		</div>
	)
}

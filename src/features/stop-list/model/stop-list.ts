'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { MenuItem, StopItemPayload } from '@/types/menu'
import { useStopListUiStore } from '@/shared/store'

// Ключ запроса для списка позиций меню.
export const menuItemsQueryKey: string[] = ['menu-items']

// Загружает позиции меню с сервера.
export async function getMenuItems(): Promise<MenuItem[]> {
	const response = await fetch('/api/menu-items')

	if (!response.ok) {
		throw new Error('Не удалось загрузить список позиций')
	}

	return response.json()
}

// Отправляет позицию в стоп-лист.
async function stopMenuItem({ itemId, payload }: { itemId: string; payload: StopItemPayload }) {
	const response = await fetch(`/api/menu-items/${itemId}/stop`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(payload),
	})

	if (!response.ok) throw new Error('Не удалось отправить позицию в стоп-лист')
}

// Возвращает позицию в продажу.
async function resumeMenuItem(itemId: string) {
	const response = await fetch(`/api/menu-items/${itemId}/resume`, { method: 'POST' })

	if (!response.ok) throw new Error('Не удалось снять позицию со стоп-листа')
}

// Обновляет позицию в кэше запросов.
function updateItem(queryClient: ReturnType<typeof useQueryClient>, itemId: string, updater: (item: MenuItem) => MenuItem) {
	queryClient.setQueryData<MenuItem[]>(menuItemsQueryKey, (currentItems = []) =>
		currentItems.map((item) => item.id === itemId ? updater(item) : item),
	)
}

// Управляет загрузкой и изменением стоп-листа.
export function useStopListModel() {
	const queryClient = useQueryClient()
	const setOpenPanel = useStopListUiStore((state) => state.setOpenPanel)
	const selectItem = useStopListUiStore((state) => state.selectItem)
	const addToast = useStopListUiStore((state) => state.addToast)

	const query = useQuery({
		queryKey: menuItemsQueryKey,
		queryFn: getMenuItems,
	})
	const stopMutation = useMutation({
		mutationFn: stopMenuItem,
		onMutate: async ({ itemId, payload }) => {
			await queryClient.cancelQueries({ queryKey: menuItemsQueryKey })
			const previousItems = queryClient.getQueryData<MenuItem[]>(menuItemsQueryKey)
			updateItem(queryClient, itemId, (currentItem) => ({
				...currentItem,
				status: { kind: 'stopped', reason: payload.reason, until: payload.until },
			}))
			return { previousItems }
		},
		onSuccess: () => {
			setOpenPanel(null)
			selectItem(null)
			addToast({ tone: 'success', message: 'Позиция отправлена в стоп-лист' })
		},
		onError: (requestError, _variables, context) => {
			queryClient.setQueryData(menuItemsQueryKey, context?.previousItems)
			addToast({ tone: 'error', message: requestError.message })
		},
	})
	const resumeMutation = useMutation({
		mutationFn: resumeMenuItem,
		onMutate: async (itemId) => {
			await queryClient.cancelQueries({ queryKey: menuItemsQueryKey })
			const previousItems = queryClient.getQueryData<MenuItem[]>(menuItemsQueryKey)
			updateItem(queryClient, itemId, (item) => ({ ...item, status: { kind: 'available' } }))
			return { previousItems }
		},
		onSuccess: () => addToast({ tone: 'success', message: 'Позиция возвращена в продажу' }),
		onError: (requestError, _itemId, context) => {
			queryClient.setQueryData(menuItemsQueryKey, context?.previousItems)
			addToast({ tone: 'error', message: requestError.message })
		},
	})

	return {
		...query,
		stopMutation,
		resumeMutation,
		pendingId: stopMutation.isPending
			? stopMutation.variables.itemId
			: resumeMutation.isPending ? resumeMutation.variables : null,
	}
}

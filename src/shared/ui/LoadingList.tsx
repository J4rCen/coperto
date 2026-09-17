import type { LoadingListProps } from '@/types/menu'

// Показывает состояние загрузки списка.
export function LoadingList({ count = 5 }: LoadingListProps) {
	return (
		<ul className="m-0 flex list-none flex-col gap-2 p-0" aria-label="Загрузка позиций">
			{Array.from({ length: count }, (_, index) => (
				<li className="h-23 animate-pulse rounded-lg bg-[#ebe6df]" key={index} />
			))}
		</ul>
	)
}

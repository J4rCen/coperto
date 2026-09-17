import type { StatePanelProps } from '@/types/menu'

// Показывает сообщение о состоянии списка.
export function StatePanel({ children, error = false }: StatePanelProps) {
	return (
		<div
			className={`rounded-lg border border-dashed p-12 text-center ${error ? 'border-[#e0a094] bg-[#fff7f5] text-[#c6462f]' : 'border-[#dfd9d0] bg-white/50'}`}
			role={error ? 'alert' : 'status'}
		>
			{children}
		</div>
	)
}

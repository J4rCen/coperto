'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import type { Status, Workshop } from '@/types/menu'

const workshops = [
    { value: 'kitchen', label: 'Кухня' },
    { value: 'bar', label: 'Бар' },
    { value: 'pastry', label: 'Кондитерский цех' },
] satisfies ReadonlyArray<{ value: Workshop; label: string }>

const statuses = [
    { value: 'available', label: 'В продаже' },
    { value: 'stopped', label: 'Продажи остановлены' },
] satisfies ReadonlyArray<{ value: Status['kind']; label: string }>

export default function Filter() {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    function updateFilter(name: 'shop' | 'status', value: string) {
        const params = new URLSearchParams(searchParams.toString())

        if (value) {
            params.set(name, value)
        } else {
            params.delete(name)
        }

        const query = params.toString()
        router.push(query ? `${pathname}?${query}` : pathname)
    }

    return (
        <form className="flex flex-wrap gap-4 border-b border-[#dfd9d0] bg-[#f6f3ee] px-8 py-4 max-sm:px-4" aria-label="Фильтры списка">
            <label className="flex flex-col gap-1">
                <span className="text-xs font-semibold uppercase tracking-[0.04em] text-[#77716a]">Цех</span>
                <select
                    className="min-w-45 rounded-md border border-[#dfd9d0] bg-white px-3 py-2.5 text-sm text-[#171512] outline-none focus:border-[#c6462f] focus:ring-4 focus:ring-[rgba(198,70,47,0.12)]"
                    value={searchParams.get('shop') ?? ''}
                    onChange={(event) => updateFilter('shop', event.target.value)}
                >
                    <option value="">Все цеха</option>
                    {workshops.map((workshop) => (
                        <option key={workshop.value} value={workshop.value}>
                            {workshop.label}
                        </option>
                    ))}
                </select>
            </label>

            <label className="flex flex-col gap-1">
                <span className="text-xs font-semibold uppercase tracking-[0.04em] text-[#77716a]">Статус</span>
                <select
                    className="min-w-45 rounded-md border border-[#dfd9d0] bg-white px-3 py-2.5 text-sm text-[#171512] outline-none focus:border-[#c6462f] focus:ring-4 focus:ring-[rgba(198,70,47,0.12)]"
                    value={searchParams.get('status') ?? ''}
                    onChange={(event) => updateFilter('status', event.target.value)}
                >
                    <option value="">Все статусы</option>
                    {statuses.map((status) => (
                        <option key={status.value} value={status.value}>
                            {status.label}
                        </option>
                    ))}
                </select>
            </label>
        </form>
    )
}
import Link from 'next/link'

// Показывает страницу для несуществующих маршрутов.
export default function NotFound() {
	return (
		<main className="flex min-h-screen flex-1 items-center justify-center px-6 py-16">
			<section className="w-full max-w-lg rounded-lg border border-(--line) bg-white p-8 text-center shadow-sm">
				<p className="text-sm font-bold uppercase tracking-[0.12em] text-(--accent)">Ошибка 404</p>
				<h1 className="mt-3 text-3xl font-semibold tracking-[-0.03em]">Страница не найдена</h1>
				<p className="mt-3 text-(--muted)">Проверьте адрес или вернитесь к списку позиций меню.</p>
				<Link
					href="/"
					className="mt-6 inline-flex rounded-md bg-(--accent) px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
				>
					Вернуться на главную
				</Link>
			</section>
		</main>
	)
}

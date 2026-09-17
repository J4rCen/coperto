import { Suspense } from 'react'
import StopList from '@/features/stop-list/ui/StopList'
import { LoadingList } from '@/shared/ui/LoadingList'

export default function Home() {
	return (
		<Suspense fallback={<LoadingList />}>
			<StopList />
		</Suspense>
	)
}

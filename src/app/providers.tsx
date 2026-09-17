'use client'

import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ReactNode, useState } from "react"

const client = new QueryClient({
    defaultOptions: {
        queries: { retry: 1, refetchOnWindowFocus: false },
    }
})

// Подключает провайдер и дебагер TanStack Query.
export function TanstackQueryProvider({ children }: { children: ReactNode }) {
    return (
        <QueryClientProvider client={client}>
            <ReactQueryDevtools initialIsOpen={false} />
            {children}
        </QueryClientProvider>
    )
}
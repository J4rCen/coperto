'use client'

import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ReactNode } from "react"

const client = new QueryClient()

// Обвертка для Tanstack Query провайдера
export function TanstackQueryProvider({ children }: { children: ReactNode }) {
    return (
        <QueryClientProvider client={client}>
            <ReactQueryDevtools initialIsOpen={false} />
            {children}
        </QueryClientProvider>
    )
}
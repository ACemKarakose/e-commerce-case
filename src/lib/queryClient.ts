import { QueryClient } from "@tanstack/react-query";

// Create a client with sensible defaults
export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            // 5 minutes stale time
            staleTime: 5 * 60 * 1000,
            // Cache for 10 minutes
            gcTime: 10 * 60 * 1000,
            // Retry 3 times
            retry: 3,
            // Retry delay with exponential backoff
            retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
            // Refetch on window focus
            refetchOnWindowFocus: true,
        },
    },
});

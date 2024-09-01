"use client"
import { getGames } from "@/server";
import { Endpoints, InitialGamesFilters } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast, Bounce } from "react-toastify"

type DataResponse = {
    games: GameT[]
    games_count: number
}

type TError = string;


export function useGamesQuery() {
    const query = useSearchParams().get("query") ?? ''
    const [filters, setFilters] = useState<GamesFiltersT>(InitialGamesFilters);

    const url = Endpoints.games({ ...filters, query })

    const { data, isLoading, error } = useQuery<any, TError, DataResponse, string[]>({
        queryKey: [url],

        queryFn: () => getGames(url),
        retry: 2,
    })

    const resetFilters = () => setFilters(InitialGamesFilters)

    useEffect(() => {
        toast.error(error, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
        })

    }, [error])

    return {
        isLoading,
        filters,
        error,
        setFilters,
        resetFilters,
        games: data?.games ?? [],
        games_count: data?.games_count ?? 0,
    }
}
"use client"
import { getGames } from "@/server";
import { Endpoints, InitialGamesFilters } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast, Bounce } from "react-toastify"

type DataResponse = {
    games: GameT[]
    games_count: number
}

type TError = string;


export function useGamesQuery() {
    const [filters, setFilters] = useState<GamesFiltersT>(InitialGamesFilters);

    const url = Endpoints.games(filters);

    const { data, isLoading, error } = useQuery<any, TError, DataResponse, string[]>({
        queryKey: [url],
        queryFn: () => getGames(url),
        retry: 2,
    })

    const resetFilters = () => setFilters(InitialGamesFilters);

    if (error) {
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
    }
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
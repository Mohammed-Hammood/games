"use client"
import { getGames } from "@/server";
import { Endpoints, InitialGamesFilters } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";


type DataResponse = {
    games: GameT[]
    games_count: number
}

export function useGamesQuery(initialData: { games: GameT[], games_count: number }) {
    const [filters, setFilters] = useState<GamesFiltersT>(InitialGamesFilters);

    const url = Endpoints.games(filters);

    const { data, isLoading } = useQuery<any, Error, DataResponse, string[]>({
        queryKey: [url],
        queryFn: () => getGames(url),
        initialData: initialData,
    })


    const resetFilters = () => setFilters(InitialGamesFilters);

    return {
        isLoading,
        filters,
        setFilters,
        resetFilters,
        games: data?.games ?? [],
        games_count: data?.games_count ?? 0,
    }
}
"use client"
import { getGames } from "@/server";
import { Endpoints, InitialGamesFilters } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";


type DataResponse = {
    games: GameT[]
    games_count: number

}

export function useGamesQuery(data: { games: GameT[], games_count: number }) {
    const [filters, setFilters] = useState<GamesFiltersT>(InitialGamesFilters)

    const url = Endpoints.games(filters);

    const { data: _, isLoading } = useQuery<any, Error, DataResponse, string[]>({
        queryKey: [url],
        queryFn: () => getGames(url),
        initialData: data
    })

    const { games, games_count } = _ ?? { games: [], games_count: 0 }


    const resetFilters = () => setFilters(InitialGamesFilters);

    return {
        isLoading,
        setFilters,
        games,
        games_count,
        resetFilters,
        filters,
    }
}
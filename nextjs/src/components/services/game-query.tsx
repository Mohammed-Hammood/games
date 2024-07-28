"use client"
import { Endpoints } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import { getGame } from "@/server"


type DataResponse = {
    game: GameT
}

export function useGameQuery({ slug, game: _ }: { slug: string, game?: GameT }) {
    const url = Endpoints.game(slug);

    const { data, isLoading, error } = useQuery<any, Error, DataResponse, string[]>({
        queryKey: [slug],
        queryFn: () => getGame(url),
        initialData: {
            game: _
        }
    })

    const { game } = data ?? { game: null }

    return {
        game,
        error,
        isLoading,
        data,
    }
}
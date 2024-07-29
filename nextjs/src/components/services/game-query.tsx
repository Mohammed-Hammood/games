"use client"
import { Endpoints } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import { getGame } from "@/server"


type DataResponse = {
    game: GameT
}
type TError = {
    error: string
}

export function useGameQuery({ slug, game:initialData }: { slug: string, game?: GameT }) {
    const url = Endpoints.game(slug);

    const { data, isLoading, error } = useQuery<any, TError, DataResponse, string[]>({
        queryKey: [slug],
        queryFn: () => getGame(url),
        initialData: {
            game: initialData
        }
    })

    return {
        game: data?.game,
        error,
        isLoading,
    }
}
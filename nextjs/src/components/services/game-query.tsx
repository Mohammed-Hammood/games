"use client"
import { Endpoints } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import { getGame } from "@/server"
import { toast, Bounce } from "react-toastify";

type DataResponse = {
    game: GameT
}
type TError = string

export function useGameQuery({ slug, game: initialData }: { slug: string, game?: GameT }) {
    const url = Endpoints.game(slug);

    const { data, isLoading, error } = useQuery<any, TError, DataResponse, string[]>({
        queryKey: [slug],
        queryFn: () => getGame(url),
        initialData: {
            game: initialData
        }
    })

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
        game: data?.game,
        error,
        isLoading,
    }
}
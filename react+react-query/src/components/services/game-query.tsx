import { useParams } from "react-router-dom";
import { Endpoints } from "utils";
import { GamesQuery } from "./games-query";
import { useQuery } from "@tanstack/react-query";

type DataT = {
    game: GameT | null | undefined
}
type ErrorT = {
    error: string
}

const GetGameAPI = async (url: string) => {
    const req = await fetch(url);
    const res = await req.json();
    if (!res.ok) {
        throw res as ErrorT 
    }
    return res as DataT
}

export function GameQuery() {
    const { slug } = useParams()
    const initialGame = GamesQuery().games.find(item => item.slug === slug)

    const url = Endpoints.game(slug);

    const { error, data: { game }, isLoading, isFetching } = useQuery<DataT, ErrorT>({
        queryKey: [url],
        queryFn: () => GetGameAPI(url),
        initialData: {
            game: initialGame,
        },
    })

    return {
        game,
        isLoading: game ? isLoading : isFetching,
        error,
    }
}
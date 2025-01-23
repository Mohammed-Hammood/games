import { useParams } from "react-router-dom";
import { CustomError, Endpoints } from "utils";
import { GamesQuery } from "./games-query";
import { useQuery } from "@tanstack/react-query";

type DataT = {
    game: GameT | null | undefined
}
const GetGameAPI = async (url: string) => {
    const req = await fetch(url);
    const res = await req.json();
    if (req.status !== 200) {
        throw new CustomError({
            ...req,
        })
    }
    return res as DataT
}

export function GameQuery() {
    const { slug } = useParams()
    const initialGame = GamesQuery().games.find(item => item.slug === slug)

    const url = Endpoints.game(slug);

    const { error, data: { game }, isLoading, isFetching } = useQuery<DataT>({
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
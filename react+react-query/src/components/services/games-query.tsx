import { Endpoints } from "utils";
import { useQuery } from "@tanstack/react-query";
import { toast, Bounce } from "react-toastify";
import { useFilters } from "components";

type DataT = {
    games: GameT[]
    games_count: number
}
type ErrorT = {
    error: string
}

const GetGamesAPI = async (url: string): Promise<DataT> => {
    const req = await fetch(url);
    const res = await req.json();
    if (!req.ok) {
        throw res.error as ErrorT
    }
    return res as DataT
}

export function GamesQuery() {
    const { filters, setFilters, resetFilters } = useFilters()
    const url = Endpoints.games(filters);

    const { error, data: { games, games_count }, isLoading, isFetching } = useQuery<DataT>({
        queryKey: [url],
        queryFn: () => GetGamesAPI(url),
        initialData: {
            games: [],
            games_count: 0,
        }
    })


    if (error) {
        const text: string = error.message || "Semething went wrong";

        toast.error(text, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
            transition: Bounce,
        });
    }
    return {
        isLoading: games.length ? isLoading : isFetching,
        games,
        filters,
        games_count,
        setFilters,
        resetFilters,
    }
}
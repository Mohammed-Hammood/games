import { useFetch } from "components";
import { resetGames, selectGames, setGames, useAppDispatch, useAppSelector } from "store";
import { Endpoints } from "utils";
import { useEffect, useRef } from "react";


export function GamesAPIService() {
    const { games, filters } = useAppSelector(selectGames);

    const dispatch = useAppDispatch();

    const filtersRef = useRef(filters);

    //passing url to useFetch in the first time to fetch games as the games length is always zero at the first load 
    const url = games.length === 0 ? Endpoints.games(filters) : null;

    const { setUrl } = useFetch({ reducer: setGames, url });


    useEffect(() => {
        // fetch data only when game filters change
        if (JSON.stringify(filtersRef.current) !== JSON.stringify(filters)) {

            const url = Endpoints.games(filters);

            filtersRef.current = filters;

            dispatch(resetGames());
            
            setUrl(url);

        }

    }, [filtersRef, setUrl, filters]);
    return null;
}
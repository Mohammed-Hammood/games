import { useFetch } from "components";
import { selectGames, setFilters, setGames, useAppDispatch, useAppSelector } from "store";
import { Endpoints } from "utils";
import { useEffect, useRef } from "react";


export function useGamesQuery() {
    const { games, filters } = useAppSelector(selectGames);

    const filtersRef = useRef(filters);

    const dispatch = useAppDispatch();

    //passing url to useFetch in the first time to fetch games as the games length is always zero at the first load 
    const url = games.length === 0 ? Endpoints.games(filters) : null;

    const { setUrl, loading } = useFetch({ reducer: setGames, url });

    useEffect(() => {
        // fetch data only when game filters change
        if (JSON.stringify(filtersRef.current) !== JSON.stringify(filters) || filters.redirect) {

            const url = Endpoints.games(filters);

            const updatedFilters = { ...filters, redirect: false };

            filtersRef.current = updatedFilters;

            dispatch(setFilters(updatedFilters));

            setUrl(url);
        }

    }, [filtersRef, setUrl, filters, dispatch]);

    return {
        loading,
        games,
        filters,
    }
}
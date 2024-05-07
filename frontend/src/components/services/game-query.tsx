import { useNavigate, useParams } from "react-router-dom";
import { selectGames, useAppSelector } from "store";
import { useFetch } from "components";
import { Endpoints } from "utils";
import { useState } from "react";


export function useGameQuery() {
    const { slug } = useParams()
    const { games } = useAppSelector(selectGames);
    const [game, setGame] = useState<undefined | GameT>(games.find(item => item.slug === slug));
    
    const navigate  = useNavigate();

    const url = !game ? Endpoints.game(slug) : null;

    const setData = ({ game }: { game: GameT }) => {
        setGame(game);
    }

    // pass url (string) to useFetch only game is undefined, otherwise pass null
    const { loading, error } = useFetch({ setData, url });

    if(error && error.status === 404)navigate("/404"); 

    return {
        game,
        error,
        loading,
    }
}
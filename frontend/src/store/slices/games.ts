import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitialGamesFilters} from "utils";

interface InitialState {
    games: GameT[];
    games_count: number;
    filters: GamesFiltersT;
}

const initialState: InitialState = {
    games: [],
    games_count: 0,
    filters: InitialGamesFilters,
}

export const gamesSlice = createSlice({
    name: 'games',
    initialState,
    reducers: {
        setGames(state, actions: PayloadAction<{ games: GameT[], games_count: number }>) {
            state.games = actions.payload.games;
            state.games_count = actions.payload.games_count;
        },
        resetGamesFilters(state) {
            state.filters = initialState.filters;
        },
        setGamesFilters(state, actions: PayloadAction<GamesFiltersT>) {
            state.filters = actions.payload;
        },
    }
});

export const { resetGamesFilters, setGames, setGamesFilters } = gamesSlice.actions;
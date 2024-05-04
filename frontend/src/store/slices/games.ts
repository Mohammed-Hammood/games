import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitialGamesFilters} from "utils";

interface InitialState {
    games: GameT[];
    games_count: number;
    loading: boolean;
    filters: GamesFiltersT;
}

const initialState: InitialState = {
    games: [],
    games_count: 0,
    loading: true,
    filters: InitialGamesFilters,
}

export const gamesSlice = createSlice({
    name: 'games',
    initialState,
    reducers: {
        setGames(state, actions: PayloadAction<{ games: GameT[], games_count: number }>) {
            state.games = actions.payload.games;
            state.games_count = actions.payload.games_count;
            state.loading = false;
        },
        resetGamesFilters(state) {
            state.filters = initialState.filters;
            state.loading = true;
        },
        setGamesFilters(state, actions: PayloadAction<GamesFiltersT>) {
            state.filters = actions.payload;
            state.loading = true;
        }
    }
});

export const { resetGamesFilters, setGames, setGamesFilters } = gamesSlice.actions;
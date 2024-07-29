import { RootState } from "./store";

export const selectGames = (state: RootState) => state.games;
export const selectFilters = (state: RootState) => state.games.filters;

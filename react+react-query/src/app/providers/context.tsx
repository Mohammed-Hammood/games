import { createContext } from "react";
import { InitialGamesFilters } from "utils";

type FiltersContextType = {
    filters: GamesFiltersT;
    setFilters: (filters: GamesFiltersT) => void;
    resetFilters: () => void;
};

export const FiltersContext = createContext<FiltersContextType>({
    filters: InitialGamesFilters,
    setFilters: () => { },
    resetFilters: () => { },
});

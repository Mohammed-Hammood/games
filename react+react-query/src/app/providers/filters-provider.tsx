import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { InitialGamesFilters } from "utils";
import { FiltersContext } from "./context";

type FiltersProviderProps = {
    children: React.ReactNode;
};


export const FiltersProvider: React.FC<FiltersProviderProps> = ({ children }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const initialQuery = searchParams.get('query') || ''; // Get 'query' from URL

    const [filters, setFilters] = useState<GamesFiltersT>({
        ...InitialGamesFilters,
        query: initialQuery,
    });
    const resetFilters = () => setFilters(InitialGamesFilters);

    // Update URL search params when filters.query changes
    useEffect(() => {
        const params = new URLSearchParams(searchParams);
        if (filters.query) {
            params.set('query', filters.query);
        } else {
            params.delete('query');
        }
        setSearchParams(params);

    }, [filters.query, searchParams, setSearchParams]);

    return (
        <FiltersContext.Provider value={{ filters, setFilters, resetFilters }}>
            {children}
        </FiltersContext.Provider>
    );
};
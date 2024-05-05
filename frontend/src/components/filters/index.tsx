import { useFetch } from "components/hooks";
import { resetGamesFilters, selectGames, setGames, setGamesFilters, useAppDispatch, useAppSelector } from "store";
import { Endpoints, InitialGamesFilters, limitOptions, orderOptions, languageOptions, platformsOptions } from "utils";
import styles from "./filters.module.scss";
import { useEffect, useRef } from "react";
import Select from "react-select";


export function GamesFilters() {
    const { games, filters, games_count } = useAppSelector(selectGames);
    const filtersRef = useRef(filters);
    const filtersChanged = JSON.stringify(filtersRef.current) !== JSON.stringify(filters);

    const dispatch = useAppDispatch();
    
    const url = games.length === 0 ? Endpoints.games(filters) : null;

    const { setUrl } = useFetch({ reducer: setGames, url });

    const setValue = (key: keyof typeof filters, value?: string | number): void => {
        if (value) {
            const updated_filters = { ...filters, [key]: value };
            dispatch(setGamesFilters(updated_filters));
        }
    }

    const reset = (): void => {
        // change the state and fetch new games only when the intial filters differ from the current state
        if (JSON.stringify(InitialGamesFilters) !== JSON.stringify(filters)) {
            dispatch(resetGamesFilters());
        }
    }

    useEffect(() => {
        if (filtersChanged) {
            const url = Endpoints.games(filters);
            filtersRef.current = filters;
            setUrl(url);
        }
    }, [filtersRef, setUrl, filtersChanged, filters]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.section}>
                <div className={styles.games_count}> {games.length} of {games_count}</div>
            </div>
            <div className={styles.section}>
                <div className={styles.title}>Language</div>
                <Select
                    options={languageOptions}
                    onChange={s => setValue('language', s?.value)}
                    defaultValue={languageOptions[0]}
                />
            </div>
            <div className={styles.section}>
                <div className={styles.title}>Platform</div>
                <Select
                    defaultValue={platformsOptions[0]}
                    options={platformsOptions}
                    onChange={s => setValue('platform', s?.value)}
                />
            </div>
            <div className={styles.section}>
                <div className={styles.title}>Order by</div>
                <Select
                    defaultValue={orderOptions[0]}
                    options={orderOptions}
                    onChange={s => setValue('order', s?.value)}
                />
            </div>
            <div className={styles.section}>
                <div className={styles.title}>Games per page</div>
                <Select
                    options={limitOptions}
                    onChange={s => setValue('limit', s?.value)}
                    defaultValue={limitOptions[0]}
                />
            </div>
            <div className={styles.section}>
                <div className={styles.title}>Voice acting language</div>
                <Select
                    defaultValue={languageOptions[0]}
                    options={languageOptions}
                    onChange={s => setValue('voice_acting_language', s?.value)}
                />
            </div>
            <div className={styles.section}>
                <button
                    className={styles.resetButton}
                    type="button"
                    onClick={reset}>
                    Reset
                </button>
            </div>
        </div>
    )
}
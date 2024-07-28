"use client"
import { InitialGamesFilters, limitOptions, orderOptions, languageOptions, platformsOptions, playModeOptions } from "@/utils";
import cls from "./filters.module.scss";
import Select from "react-select";

type Props = {
    games: GameT[]
    filters: GamesFiltersT
    setFilters: (filters: GamesFiltersT) => void
    resetFilters: () => void
    games_count: number
}

export function GamesFilters({ games, filters, setFilters, resetFilters, games_count }: Props) {
    // const { games, filters, games_count } = useAppSelector(selectGames);
    const { limit, platform, language, offline_play_mode, online_play_mode, voice_acting_language, order } = filters;
    // const dispatch = useAppDispatch();

    const setValue = (key: keyof typeof filters, value?: string | number | number[]): void => {
        if (value) {
            const updated_filters = { ...filters, [key]: value, page: 1 };
            setFilters(updated_filters);
        }
    }
    const reset = (): void => {
        // change the state only when the intial filters differ from the current state
        if (JSON.stringify(InitialGamesFilters) !== JSON.stringify(filters)) {
            (resetFilters());
        }
    }
    const styles = {
        option: (base: any, state: any) => ({
            ...base,
            backgroundColor: state.isSelected ? 'var(--main-color)' : 'white',
            cursor: 'pointer',
            ":hover": {
                background: 'var(--main-color-dark)',
                color: 'white',
            }
        }),
    }

    return (
        <div className={cls.wrapper}>
            <div className={cls.section}>
                <div className={cls.games_count}> {games.length} of {games_count}</div>
            </div>
            <div className={cls.section}>
                <div className={cls.title}>Language</div>
                <Select
                    name="language"
                    options={languageOptions}
                    onChange={s => setValue('language', s?.value)}
                    value={{ value: language, label: language }}
                    styles={styles}
                />
            </div>
            <div className={cls.section}>
                <div className={cls.title}>Platform</div>
                <Select
                    value={{ value: platform, label: platform }}
                    options={platformsOptions}
                    onChange={s => setValue('platform', s?.value)}
                    styles={styles}
                />
            </div>
            <div className={cls.section}>
                <div className={cls.title}>Order by</div>
                <Select
                    value={{ value: order, label: orderOptions.find(i => i.value === order)?.label }}
                    options={orderOptions}
                    onChange={s => setValue('order', s?.value)}
                    styles={styles}
                />
            </div>
            <div className={cls.section}>
                <div className={cls.title}>Games per page</div>
                <Select
                    options={limitOptions}
                    onChange={s => setValue('limit', s?.value)}
                    value={{ value: limit, label: limitOptions.find(i => i.value === limit)?.label }}
                    styles={styles}
                />
            </div>
            <div className={cls.section}>
                <div className={cls.title}>Voice acting language</div>
                <Select
                    value={{ value: voice_acting_language, label: voice_acting_language }}
                    options={languageOptions}
                    onChange={s => setValue('voice_acting_language', s?.value)}
                    styles={styles}
                />
            </div>
            <div className={cls.section}>
                <div className={cls.title}>Offline mode</div>
                <Select
                    options={playModeOptions}
                    onChange={s => setValue('offline_play_mode', s?.value)}
                    styles={styles}
                    value={{ value: offline_play_mode, label: offline_play_mode }}
                />
            </div>
            <div className={cls.section}>
                <div className={cls.title}>Online mode</div>
                <Select
                    options={playModeOptions}
                    value={{ value: online_play_mode, label: online_play_mode }}
                    onChange={s => setValue('online_play_mode', s?.value)}
                    styles={styles}
                />
            </div>
            <div className={cls.section}>
                <button
                    className={cls.resetButton}
                    type="button"
                    onClick={reset}>
                    Reset
                </button>
            </div>
        </div>
    )
}
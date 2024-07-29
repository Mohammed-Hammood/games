"use client"
import { Card, Loader, GamesFilters, Pagination, useGamesQuery } from "@/components";
import cls from "./home.module.scss";



export function HomePage() {
    const { filters, isLoading, games, resetFilters, setFilters, games_count } = useGamesQuery();

    return (
        <main className={cls.main}>
            <GamesFilters
                games={games}
                games_count={games_count}
                filters={filters}
                setFilters={setFilters}
                resetFilters={resetFilters}
            />
            <div className={cls.games_wrapper}>
                <div className={cls.games_center_content}>
                    {isLoading
                        ? <Loader type={'card'} cards_count={filters.limit} />

                        : <>
                            {<Pagination
                                games_count={games_count}
                                filters={filters}
                                setFilters={setFilters}
                            />}

                            {games.map(game => (
                                <Card game={game} key={game.id} />
                            ))}

                            {games.length >= 5 && (
                                <Pagination
                                    setFilters={setFilters}
                                    filters={filters}
                                    games_count={games_count}
                                />
                            )}

                        </>
                    }
                </div>
            </div>
        </main>
    )
}

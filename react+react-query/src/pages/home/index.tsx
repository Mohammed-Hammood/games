import { Card, Loader, GamesFilters, Pagination, GamesQuery } from "components";
import cls from "./home.module.scss";



function HomePage() {
    const { filters, games_count, isLoading, games } = GamesQuery();

    return (
        <main className={cls.main}>
            <GamesFilters
                games={games}
                games_count={games_count}
            />
            <div className={cls.games_wrapper}>
                <div className={cls.games_center_content}>
                    {isLoading
                        ? <Loader type={'card'} cards_count={filters.limit} />

                        : <>
                            {<Pagination games_count={games_count} />}

                            {games.map(game => (
                                <Card game={game} key={game.id} />
                            ))}

                            {games.length >= 5 && (
                                <Pagination games_count={games_count} />
                            )}

                        </>
                    }
                </div>
            </div>
        </main>
    )
}

export default HomePage;
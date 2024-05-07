import { Card, Loader, GamesFilters, Pagination, useGamesQuery } from "components";
import cls from "./home.module.scss";



function HomePage() {
    const { filters:{ limit }, loading, games } = useGamesQuery();

    return (
        <main className={cls.main}>
            <GamesFilters />
            <div className={cls.games_wrapper}>
                <div className={cls.games_center_content}>
                    {loading
                        ? <Loader type={'card'} cards_count={limit} />

                        : <>
                            {<Pagination />}

                            {games.map(game => (
                                <Card game={game} key={game.id} />
                            ))}

                            {games.length >= 5 && (
                                <Pagination />
                            )}

                        </>
                    }
                </div>
            </div>
        </main>
    )
}

export default HomePage;
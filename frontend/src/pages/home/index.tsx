import { Card, Loader, GamesFilters, Pagination } from "components";
import { useAppSelector, selectGames } from "store";
import cls from "./home.module.scss";


function HomePage() {
    const { filters, loading, games } = useAppSelector(selectGames);

    return (
        <main className={cls.main}>
            <GamesFilters />
            <div className={cls.games_wrapper}>
                <div className={cls.games_center_content}>
                    {loading
                        ? <Loader type={'card'} cards_count={filters.limit} />

                        : <>
                            {<Pagination />}
                            {games.map(game => <Card game={game} key={game.id} />)}
                            {games.length >= 5 && <Pagination />}

                        </>
                    }
                </div>
            </div>
        </main>
    )
}

export default HomePage;
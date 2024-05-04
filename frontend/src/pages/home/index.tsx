import { Card, Loader, GamesFilters, Pagination } from "components";
import { useAppSelector, selectGames } from "store";
import cls from "./home.module.scss";


function HomePage() {
    const { games, loading, filters: { limit } } = useAppSelector(selectGames);

    return (
        <main className={cls.main}>
            <GamesFilters />
            <div className={cls.games_wrapper}>
                <div className={cls.games_center_content}>
                    {loading
                        ? <Loader type={'card'} cards_count={limit} />

                        : <>
                            {games.map(game => <Card game={game} key={game.id} />)}
                            
                            {<Pagination />}
                        </>
                    }
                </div>
            </div>
        </main>
    )
}

export default HomePage;
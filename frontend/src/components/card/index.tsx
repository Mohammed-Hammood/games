
import { Link } from 'react-router-dom';
import styles from './card.module.scss';
import { AppRoutes, formated_date } from "utils";

export function Card({ game }: { game: GameT }) {

    const game_url = AppRoutes.game(game.slug);

    return (
        <article className={styles.wrapper}>

            <div className={styles.content}>
                <div className={styles.title}>
                    <Link to={game_url} >
                        {game.title}
                    </Link>
                </div>
                <div className={styles.initial_release}>
                    <span className={styles.subtitle}>Initial release:</span>
                    <span>{formated_date(game.release_date)}</span>
                </div>

                <div className={styles.total_ratings}>
                    <div className={styles.subtitle}>Total ratings:</div>
                    <div>{game.total_ratings}</div>
                </div>
                <div className={styles.platforms}>
                    <div className={styles.subtitle}>Platforms:</div>
                    {game.platforms.map(item =>
                        <span key={item}>{item}</span>
                    )}
                </div>
                <div className={styles.genres}>
                    <div className={styles.subtitle}>Genres:</div>
                    {game.genres.map(item => <span key={item}>{item}</span>)}
                </div>
                <div className={styles.description}>
                    {game.description}
                </div>
                <Link className={styles.readMoreButton} to={game_url}>Read more</Link>
            </div>
            <Link to={AppRoutes.game(game.slug)}>
                <img className={styles.img} src={game.cover} alt="img" />
            </Link>
        </article>
    );
}

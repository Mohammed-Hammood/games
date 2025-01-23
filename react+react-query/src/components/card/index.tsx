
import { AppRoutes, formatted_date } from "utils";
import { Link } from 'react-router-dom';
import styles from './card.module.scss';
import { FaStar } from 'react-icons/fa6';

export function Card({ game }: { game: GameT }) {

    const gameURL = AppRoutes.game(game.slug);

    const getMode = ({ mode, max_players_count }: { mode: PlayModeT[], max_players_count: number }) => {
        return mode.map(item => <span key={item}>
            {item} {item === 'Multiplayer' ? `(${max_players_count})` : null}
        </span>)
    }

    return (
        <article className={styles.wrapper}>

            <div className={styles.content}>
                <div className={styles.title}>
                    <Link to={gameURL} >
                        {game.title}
                    </Link>
                </div>
                <div className={styles.initial_release}>
                    <span className={styles.subtitle}>Initial release:</span>
                    <span>{formatted_date(game.release_date)}</span>
                </div>

                <div className={styles.total_ratings}>
                    <div className={styles.subtitle}>Rating:</div>
                    <div className={styles.center_content}>
                        {game.rating_average}
                        <FaStar color='gold' />
                    </div>
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
                {game.offline &&
                    <div className={styles.genres} title='Maximum players who can play together offline'>
                        <div className={styles.subtitle}>Offline mode:</div>
                        <span >{getMode(game.offline)}</span>
                    </div>
                }
                {game.online &&
                    <div className={styles.genres} title='Minimum players who can play together online'>
                        <div className={styles.subtitle}>Online mode:</div>
                        <span >{getMode(game.online)}</span>
                    </div>
                }
                <div className={styles.description}>
                    {game.description}
                </div>
                <Link className={styles.readMoreButton} to={gameURL}>
                    Read more
                </Link>
            </div>
            <Link to={gameURL}>
                <img className={styles.img} src={game.cover} alt="img" />
            </Link>
        </article>
    );
}

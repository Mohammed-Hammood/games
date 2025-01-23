import { ImageMagnifier, Loader, GameQuery } from 'components';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from 'swiper/modules';
import { useState } from 'react';
import { FaExternalLinkAlt } from "react-icons/fa";
import { FaWikipediaW, FaTwitter } from "react-icons/fa";
import { RiYoutubeLine } from "react-icons/ri";
import { formatted_date } from 'utils';
import { FaStar } from 'react-icons/fa6';
import styles from './game.module.scss';


function GamePage() {
    const { error, isLoading, game } = GameQuery();
    const [image, setImage] = useState<string | null>(null);

    const icons = {
        "Official website": <FaExternalLinkAlt />,
        "Wikipedia": <FaWikipediaW />,
        "Youtube": <RiYoutubeLine />,
        "X": <FaTwitter />,
    }

    if (isLoading || !game) {
        return (
            <div className={styles.loaderWrapper}>
                {isLoading ?
                    <Loader size={80} /> :
                    <h2>{error?.text}</h2>
                }
            </div>
        )
    }
    const getMode = ({ mode, max_players_count }: { mode: PlayModeT[], max_players_count: number }) => {
        return mode.map(item => <span key={item}>
            {item} {item === 'Multiplayer' ? `(${max_players_count})` : null}
        </span>)
    }
    return (
        <main className={styles.main}>
            <ImageMagnifier image={image} setImage={setImage} />
            <div className={styles.game}>
                <div className={styles.coverWrapper}>
                    <img
                        className={styles.cover}
                        src={game.cover}
                        alt={game.title}
                        onClick={() => setImage(game.cover ?? null)}
                    />

                    <div className={styles.background} style={{ backgroundImage: `url(${game.cover})` }}></div>
                </div>

                <div className={styles.title}>
                    {game.title}
                </div>
                <div className={styles.initial_release}>
                    <span className={styles.subtitle}>Initial release:</span>
                    <span>{formatted_date(game.release_date)}</span>
                </div>
                <div className={styles.description}>{game.description}</div>
                <div className={styles.total_ratings}>
                    <div className={styles.subtitle}>Rating:</div>
                    <div className={styles.center_content}>
                        {game.rating_average}
                        <FaStar color='gold' />
                    </div>
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
                <div className={styles.languages}>
                    <div className={styles.subtitle}>Interface language:</div>
                    {game.available_languages.map(item =>
                        <span key={item}>{item}</span>
                    )}
                </div>
                <div className={styles.languages}>
                    <div className={styles.subtitle}>Voice acting language:</div>
                    {game.available_languages.map(item =>
                        <span key={item}>{item}</span>
                    )}
                </div>
                <div className={styles.genres}>
                    <div className={styles.subtitle}>Genres:</div>
                    {game.genres.map(item => <span key={item}>{item}</span>)}
                </div>
                {game.offline && (
                    <div className={styles.mode}>
                        <div className={styles.subtitle}>Offline mode:</div>
                        {getMode(game.offline)}
                    </div>
                )}
                {game.online && (
                    <div className={styles.mode}>
                        <div className={styles.subtitle}>Online mode :</div>
                        {getMode(game.online)}
                    </div>
                )}
                <div className={styles.screenshots}>
                    <div className={styles.subtitle}>Screenshots: {game.screenshots.length}</div>
                    <div className={styles.screenshots_content}>

                        <Swiper
                            className={styles.swiper}
                            pagination={true}
                            modules={[Pagination]}
                            slidesPerView={3}
                            breakpoints={{
                                100: {
                                    slidesPerView: 1,
                                    width: 500,
                                    spaceBetween: 2,
                                },
                                800: {
                                    width: 800,
                                    spaceBetween: 50,
                                    slidesPerView: 3,
                                }

                            }}
                        >
                            {game.screenshots.map(url =>
                                <SwiperSlide key={url}>
                                    <img title={game.title} key={url} src={url} onClick={() => setImage(url)} />
                                </SwiperSlide>
                            )}
                        </Swiper>
                    </div>
                </div>
                <div className={styles.social_sites}>
                    {game.social_sites.map(item =>
                        <a href={item.url} key={item.url} target='__blank'>
                            {icons[item.title]}
                            <span>{item.title}</span>
                        </a>)}
                </div>
            </div>
        </main >
    );
}

export default GamePage
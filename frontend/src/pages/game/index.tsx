import { useParams } from 'react-router-dom';
import styles from './game.module.scss';
import { selectGames, useAppSelector } from 'store';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from 'swiper/modules';
import { ImageMagnifier, Loader, useFetch } from 'components';
import { useState } from 'react';
import { FaExternalLinkAlt } from "react-icons/fa";
import { FaWikipediaW, FaTwitter } from "react-icons/fa";
import { RiYoutubeLine } from "react-icons/ri";
import { Endpoints, formated_date } from 'utils';


function GamePage() {
    const { slug } = useParams();
    const { games } = useAppSelector(selectGames);
    const [game, setGame] = useState<undefined | GameT>(games.find(item => slug && slug === item.slug));
    const [image, setImage] = useState<string | null>(null);

    const url = !game && slug ? Endpoints.game(slug) : null;

    const setData = ({ game }: { game: GameT }) => {
        setGame(game);
    }

    const { loading, error } = useFetch({ url, setData });

    const icons = {
        "Official website": <FaExternalLinkAlt />,
        "Wikipedia": <FaWikipediaW />,
        "Youtube": <RiYoutubeLine />,
        "X": <FaTwitter />,
    }

    if (loading || !game) {
        return (
            <div className={styles.loaderWrapper}>
                {loading ? <Loader size={80} /> : error}
            </div>
            )
    }

    return (
        <main className={styles.main}>
            <ImageMagnifier image={image} setImage={setImage} />
            <div className={styles.game}>
                <img
                    className={styles.img}
                    src={game.cover}
                    alt={game.title}
                    onClick={() => setImage(game.cover ?? null)}
                />

                <div className={styles.title}>
                    {game.title}
                </div>
                <div className={styles.initial_release}>
                    <span className={styles.subtitle}>Initial release:</span>
                    <span>{formated_date(game.release_date)}</span>
                </div>
                <div className={styles.description}>{game.description}</div>
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
                <div className={styles.mode}>
                    <div className={styles.subtitle}>Offline mode:</div>
                    {game.offline_mode.map(item => <span key={item}>{item}</span>)}
                </div>
                <div className={styles.mode}>
                    <div className={styles.subtitle}>Online mode :</div>
                    {game.online_mode.map(item => <span key={item}>{item}</span>)}
                </div>

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
                                    <img key={url} src={url} onClick={() => setImage(url)} />
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
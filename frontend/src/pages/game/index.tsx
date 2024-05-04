import { useParams } from 'react-router-dom';
import styles from './game.module.scss';
import { selectGames, useAppSelector } from 'store';
import { format } from 'date-fns';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from 'swiper/modules';
import { ImageMagnifier, Loader, useFetch } from 'components';
import { useState } from 'react';
import { FaExternalLinkAlt } from "react-icons/fa";
import { FaWikipediaW } from "react-icons/fa";
import { RiYoutubeLine } from "react-icons/ri";
import { Endpoints } from 'utils';

function GamePage() {
    const { slug } = useParams();
    const { games } = useAppSelector(selectGames);
    const [game, setGame] = useState<undefined | GameT>(games.find(item => slug && slug === item.slug));
    const [image, setImage] = useState<string | null>(null);

    const { loading } = useFetch({
        url: game ? null : Endpoints.game(slug),
        setData: ({ game }: { game: GameT }) => setGame(game),
    })

    const icons = {
        "Official website": <FaExternalLinkAlt />,
        "Wikipedia": <FaWikipediaW />,
        "Youtube": <RiYoutubeLine />,
        "X": <RiYoutubeLine />,
    }

    if (loading || !game) return (<div className={styles.loaderWrapper}>
        <Loader size={80} />
    </div>)

    const initial_release = format(new Date(game.release_date).toString(), 'MMM dd, yyyy');

    return (
        <main className={styles.main}>
            <ImageMagnifier image={image} setImage={setImage} />
            <div className={styles.game}>
                <img className={styles.img} src={game.cover} alt="img" />

                <div className={styles.title}>
                    {game.title}
                </div>
                <div className={styles.initial_release}>
                    <span className={styles.subtitle}>Initial release:</span>
                    <span>{initial_release}</span>
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
                <div className={styles.social_sites}>
                    <div className={styles.subtitle}>Social :</div>
                    {game.offline_mode.map(item => <span key={item}>{item}</span>)}
                </div>

                <div className={styles.screenshots}>
                    <div className={styles.subtitle}>Screenshots: {game.screenshots.length}</div>
                    <div className={styles.content}>

                        <Swiper
                            className={styles.swiper}
                            spaceBetween={50}
                            slidesPerView={3}
                            pagination={true}
                            modules={[Pagination]}
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
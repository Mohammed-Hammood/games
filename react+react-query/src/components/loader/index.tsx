import styles from "./loader.module.scss";

interface Props {
    size?: number
    type?: "spinner" | "card";
    cards_count?: number;
}


export function Loader(props: Props) {
    const { type, cards_count, size } = props;


    if (type === 'card') {
        const cards = Array.from({ length: cards_count ?? 1 }, (_, i) => i);
        const subLayers = Array.from({ length: 5 });

        return (
            <div className={styles.cardsWrapper}>
                {cards.map(item =>

                    <div className={styles.card} key={item}>
                        <div className={styles.block}>
                            {subLayers.map((_, i) => <div key={i} className={styles.layer}></div>)}
                        </div>
                        <div className={styles.block}>
                            <div className={styles.square}></div>

                        </div>
                    </div>
                )}
            </div>
        )
    }
    return (<div className={styles.loaderWrapper} style={{ width: size + "px", height: size + "px" }}></div>)
}

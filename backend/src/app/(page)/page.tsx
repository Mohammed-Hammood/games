import styles from "./page.module.css";

export default function Home() {
  
  return (
    <main className={styles.main}>
      <div className={styles.description}>
          <a className={styles.code} href={'/api/games?page=1&limit=10&query=&language=all&order=-id&offline_play_mode=all&online_play_mode=all&platform=all'}>
            /api/games
          </a>
      </div>
    </main>
  );
}

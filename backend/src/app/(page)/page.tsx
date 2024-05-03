import styles from "./page.module.css";

export default function Home() {
  
  return (
    <main className={styles.main}>
      <div className={styles.description}>
          <a className={styles.code} href={'/api/games?page=1&limit=1&query=&language=all&order=-id'}>
            /api/games
          </a>
      </div>
    </main>
  );
}

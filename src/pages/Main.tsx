import styles from "./Main.module.css";
import Table from "../components/Table/Table";

function Main() {
    return (
        <main className={styles.main}>
            <nav className={styles.nav}>
                <a
                    href={"/"}
                    className={[styles.link, styles.primaryLink].join(" ")}
                >
                    Tööline
                </a>
                <a href={"/Team"} className={styles.link}>
                    Käsk
                </a>
                <a href={"/ForAll"} className={styles.link}>
                    Kõigi jaoks
                </a>
            </nav>

            <Table />
        </main>
    );
}

export default Main;

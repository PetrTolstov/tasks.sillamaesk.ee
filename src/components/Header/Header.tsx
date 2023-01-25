import { PropsWithChildren } from "react";
import styles from "./header.module.css";

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.aboveNav}>
                <div className={styles.logoInformation}>
                    <a className={styles.logo} href={"https://sillamaesk.ee/"}>
                        {" "}
                    </a>
                    <h1 className={styles.logoName}>
                        SILLAMÄE SPORDIKOMPLEKS KALEV
                    </h1>
                </div>

                <img src={"notification.svg"} alt={"Notifications"} className={styles.notification}/>
            </div>
        </header>
    );
}

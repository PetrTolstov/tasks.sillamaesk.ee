import { observer } from "mobx-react-lite";
import { useState, useEffect } from "react";
import NotificationTable from "../../components/NotificationTable/NotificationTable";
import Table from "../../components/Table/Table";
import getTeam from "../../firebase/services/getTeam";
import getTeams from "../../firebase/services/getTeams";
import UserStore from "../../stores/UserStore";
import { Team, TeamType } from "../../types/TeamType";
import styles from "./notifications.module.css";

function Notifications() {
    return (
        <main className={styles.main}>
            <nav className={styles.nav}>
                <a href={"/"} className={styles.link}>
                    Tööline
                </a>
                <a
                    href={"/Teams"}
                    className={styles.link}
                >
                    Käsk
                </a>
                <a href={"/ForAll"} className={[styles.link, styles.primaryLink].join(" ")}>
                    Kõigi jaoks
                </a>
            </nav>

           <NotificationTable/>
        </main>
    );
}

export default observer(Notifications);

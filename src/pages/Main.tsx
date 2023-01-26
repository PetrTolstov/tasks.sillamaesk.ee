import { useEffect, useState } from "react";
import getTasks from "../firebase/services/getTasks";
import { DocumentData } from "firebase/firestore/lite";
import Button from "../components/Button/Button";
import RegistrationForm from "../components/RegistrationForm/RegistrationForm";
import UserStore from "../stores/UserStore";
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

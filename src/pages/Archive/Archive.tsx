import UserStore from "../../stores/UserStore";
import styles from "./Archive.module.css";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import getTeams from "../../firebase/services/getTeams";
import { TeamType } from "../../types/TeamType";
import getArchive from "../../firebase/services/getArchive";
import { ArchiveArgs } from "../../services/AddToArchive";
import { deleteDoc, doc } from "firebase/firestore/lite";
import { db } from "../../firebase/firebaseInit";

function Archive() {
    const [archive, setArchive] = useState<ArchiveArgs[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        if (UserStore.userData.user) {
            if (
                UserStore.userData.user?.role === "admin" ||
                UserStore.userData.user?.role === "manager"
            ) {
                getArchive().then((res) => {
                    setArchive(res);
                    setIsLoading(false);
                });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [UserStore.userData.user]);
    return (
        <main className={styles.main}>
            {UserStore.userData.user?.role === "manager" ? (
                <>
                    {isLoading ? (
                        <p>Loading</p>
                    ) : (
                        <>
                            {archive.map((el) => (
                                <article className={styles.item}>
                                    <>
                                        <span className={styles.title}>
                                            {el.title}
                                        </span>
                                        <span
                                            className={styles.description}
                                        >
                                            {el.description}
                                        </span>
                                        <span className={styles.date}>
                                            {el.startDate}-{el.endDate}
                                        </span>
                                        
                                        <button
                                    className={styles.buttonDel}
                                    onClick={() => {
                                        if(el.id)
                                        deleteDoc(
                                            doc(db, "archive", el.id)
                                        )
                                            .then((res) => {
                                                window.location.reload()
                                            })
                                            .catch((e) => {
                                                console.log(e);
                                            });
                                    }}
                                >
                                    Kustuta töö
                                </button>
                                
                                    </>
                                </article>
                            ))}
                        </>
                    )}
                </>
            ) : (
                <a href="/">Mine tagasi</a>
            )}
        </main>
    );
}

export default observer(Archive);

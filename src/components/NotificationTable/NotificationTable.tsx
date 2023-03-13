import { useState, useEffect } from "react";

import styles from "./notificationtable.module.css";
import itemStyles from "../TableItem/tableitem.module.css";
import { observer } from "mobx-react-lite";

import { Notification } from "../../types/NotificationType";
import getNotifications from "../../firebase/services/getNotifications";
import UserStore from "../../stores/UserStore";
import AddingTask from "../AddingTask/AddingTask";
import Button from "../Button/Button";
import { deleteDoc, doc } from "firebase/firestore/lite";
import { db } from "../../firebase/firebaseInit";
import AddToArchive from "../../services/AddToArchive";

function NotificationTable() {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [isShowing, setIsShowing] = useState(false);

    useEffect(() => {
        getNotifications().then((res) => {
            setNotifications(res);
        });
    }, []);

    return (
        <article className={styles.table}>
            <div className={styles.headerOfTable}>
                <h2>Isiklikud ülesanded</h2>
                {UserStore.userData.user?.role === "manager" ||
                UserStore.userData.user?.role === "admin" ? (
                    <>
                        <Button action={() => setIsShowing(true)}>+</Button>
                        <AddingTask
                            users={[]}
                            teams={[]}
                            isShowingModal={isShowing}
                            closeModal={() => setIsShowing(false)}
                        />
                    </>
                ) : (
                    <></>
                )}
            </div>

            {notifications ? (
                notifications.map((el) => (
                    <article className={itemStyles.item}>
                        <>
                            <span className={itemStyles.title}>{el.title}</span>
                            <span className={itemStyles.description}>
                                {el.description}
                            </span>
                            <span className={itemStyles.date}>
                                {el.startDate}-{el.endDate}
                            </span>
                            {UserStore.userData.user?.role === "manager" ? (
                                <button
                                    className={styles.buttonDel}
                                    onClick={() => {
                                        deleteDoc(
                                            doc(db, "notifications", el.id)
                                        )
                                            .then((res) => {
                                                AddToArchive({
                                                    title: el.title,
                                                    description: el.description,
                                                    startDate: el.startDate,
                                                    endDate: el.endDate,
                                                });
                                            })
                                            .catch((e) => {
                                                console.log(e);
                                            });
                                        setNotifications((prevState) => {
                                            let a = prevState;
                                            if (a) {
                                                a = a.filter(
                                                    (elem) => el.id !== elem.id
                                                );
                                            }
                                            return a;
                                        });
                                    }}
                                >
                                    Kustuta töö
                                </button>
                            ) : (
                                <></>
                            )}
                        </>
                    </article>
                ))
            ) : (
                <></>
            )}
        </article>
    );
}

export default observer(NotificationTable);

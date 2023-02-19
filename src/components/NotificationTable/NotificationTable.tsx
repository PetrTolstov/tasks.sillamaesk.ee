import { useState, useEffect } from "react";

import styles from "./notificationtable.module.css";
import itemStyles from "../TableItem/tableitem.module.css";
import { observer } from "mobx-react-lite";

import { Notification } from "../../types/NotificationType";
import getNotifications from "../../firebase/services/getNotifications";


function NotificationTable() {
    const [notifications, setNotifications] = useState<Notification[]>([]);
   


    useEffect(() => {
        getNotifications().then((res) => {
            setNotifications(res);
        });
    }, []);

    return (
        <article className={styles.table}>
            <div className={styles.headerOfTable}>
                <h2>Isiklikud ülesanded</h2>

                <span className={styles.notification}></span>
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

import { DocumentData } from "firebase/firestore/lite";
import { useState, useEffect } from "react";
import getTasks from "../../firebase/services/getTasks";
import UserStore from "../../stores/UserStore";
import styles from "./table.module.css";
import { TaskType } from "../../types/TaskType";
import TableItem from "../TableItem/TableItem";
import { observe } from "mobx";
import { observer } from "mobx-react-lite";
import getUsers from "../../firebase/services/getUsers";
import { UserType } from "../../types/UserType";

function Table() {
    const [users, setUsers] = useState<UserType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        if (
            UserStore.userData.user?.role == "admin" ||
            UserStore.userData.user?.role == "manager"
        ) {
           
                getUsers("user").then(
                    (res) => {
                        setUsers(res)
                        console.log(res)
                        setIsLoading(false)
                    }
                )
            
        }
    }, [UserStore.userData.user]);

    if (
        UserStore.userData.user?.role == "admin" ||
        UserStore.userData.user?.role == "manager"
    ) {
        return (
            <article className={styles.table}>
                <div className={styles.headerOfTable}>
                    <h2>Isiklikud ülesanded</h2>

                    {!isLoading ? (
                        <select name="users">
                            {users.map((user, i) => (
                                <option value={user.personalCode} key={user.id}>
                                    {user.firstName} {user.lastName}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <></>
                    )}

                    <span className={styles.notification}></span>
                </div>

                {UserStore.userData.user ? (
                    UserStore.userData.user.tasks.map((el) => (
                        <TableItem id={el} key={el} />
                    ))
                ) : (
                    <></>
                )}
            </article>
        );
    } else {
        return (
            <article className={styles.table}>
                <div className={styles.headerOfTable}>
                    <h2>Isiklikud ülesanded</h2>
                    <span className={styles.notification}></span>
                </div>

                {UserStore.userData.user ? (
                    UserStore.userData.user.tasks.map((el) => (
                        <TableItem id={el} key={el} />
                    ))
                ) : (
                    <></>
                )}
            </article>
        );
    }
}

export default observer(Table);

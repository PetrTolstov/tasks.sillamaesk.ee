import { deleteDoc, doc, updateDoc } from "firebase/firestore/lite";
import { useState, useEffect } from "react";
import getTasks from "../../firebase/services/getTasks";
import UserStore from "../../stores/UserStore";
import styles from "./tableitem.module.css";
import { TaskType } from "../../types/TaskType";
import { db } from "../../firebase/firebaseInit";
import { UserType } from "../../types/UserType";

type TableProps = {
    id: string;
    user: UserType;
};

enum Status {
    Done,
    Checked,
}

export default function TableItem({ id, user }: TableProps) {
    const [task, setTask] = useState<TaskType | null>(null);
    useEffect(() => {
        (async () => {
            getTasks(id.split(" ").join("")).then((res) => {
                setTask(res);
                if (!res) {
                    const userRef = doc(db, "users", user.email);
                    let list = user?.tasks.filter((value) => {
                        return value !== id;
                    });
                    updateDoc(userRef, {
                        tasks: list,
                    });
                }
            });
        })();
    }, [id, user.email, user?.tasks]);

    function changeStatus(value: boolean, status: Status) {
        const taskRef = doc(db, "tasks", id);

        if (status === Status.Checked) {
            deleteDoc(doc(db, "tasks", id));
        } else if (status === Status.Done) {
            updateDoc(taskRef, {
                done: value,
            });
        }
        window.location.reload();
    }

    return (
        <>
            {task ? (
                <article className={styles.item}>
                    {task ? (
                        <>
                            <span className={styles.title}>{task.title}</span>
                            <span className={styles.description}>
                                {task.description}
                            </span>
                            <span className={styles.date}>
                                {task.startDate}-{task.endDate}
                            </span>
                            {UserStore.userData.user?.role === "manager" ? (
                                <>
                                    <span className={styles.status}>
                                        Kinnitatud
                                        <input
                                            type={"checkbox"}
                                            onChange={(event) =>
                                                changeStatus(
                                                    event.currentTarget.checked,
                                                    Status.Checked
                                                )
                                            }
                                        />
                                    </span>
                                    {task.checked ? (
                                        <span className={styles.readyStatus}>
                                            Kinnitatud
                                        </span>
                                    ) : (
                                        <>
                                            {task.done ? (
                                                <></>
                                            ) : (
                                                <span
                                                    className={
                                                        styles.readyStatus
                                                    }
                                                >
                                                    Pooleli
                                                </span>
                                            )}
                                        </>
                                    )}
                                </>
                            ) : (
                                <>
                                    <span className={styles.status}>
                                        Valmistatud
                                        <input
                                            type={"checkbox"}
                                            onChange={(event) =>
                                                changeStatus(
                                                    event.currentTarget.checked,
                                                    Status.Done
                                                )
                                            }
                                        />
                                    </span>
                                    {task.checked ? (
                                        <span className={styles.readyStatus}>
                                            Kinnitatud
                                        </span>
                                    ) : (
                                        <>
                                            {task.done ? (
                                                <span
                                                    className={
                                                        styles.readyStatus
                                                    }
                                                >
                                                    Valmistatud
                                                </span>
                                            ) : (
                                                <></>
                                            )}
                                        </>
                                    )}
                                </>
                            )}
                        </>
                    ) : (
                        <></>
                    )}
                </article>
            ) : (
                <></>
            )}
        </>
    );
}

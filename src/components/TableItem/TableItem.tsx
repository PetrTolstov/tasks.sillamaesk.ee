import { DocumentData } from "firebase/firestore/lite";
import { useState, useEffect } from "react";
import getTasks from "../../firebase/services/getTasks";
import UserStore from "../../stores/UserStore";
import styles from "./tableitem.module.css";
import { TaskType } from "../../types/TaskType";


type TableProps = {
    id: string;
};

export default function TableItem({ id }: TableProps) {
    const [task, setTask] = useState<TaskType | null>(null);
    useEffect(() => {
        (async () => {
            console.log("a");
            setTask(await getTasks(id.split(" ").join("")));
        })();
    }, [id]);
    return (
        <article className={styles.item}>
            {task ? (
                <>
                    <span className={styles.title}>{task.title}</span>
                    <span className={styles.description}>{task.description}</span>
                    <span className={styles.date}>
                        {task.startDate}-{task.endDate}
                    </span>
                    <span className={styles.isDone}>Valmistatud<input type={'checkbox'} checked = {task.done}/></span>
                </>
            ) : (
                <></>
            )}
        </article>
    );
}

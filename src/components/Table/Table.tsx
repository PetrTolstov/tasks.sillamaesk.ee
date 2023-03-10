import { useState, useEffect } from "react";
import UserStore from "../../stores/UserStore";
import styles from "./table.module.css";
import TableItem from "../TableItem/TableItem";
import { observer } from "mobx-react-lite";
import getUsers from "../../firebase/services/getUsers";
import { UserType, User } from "../../types/UserType";
import Button from "../Button/Button";
import AddingTask from "../AddingTask/AddingTask";
import { Team, TeamType } from "../../types/TeamType";
import getTeams from "../../firebase/services/getTeams";
import Options from "../Options/Options";
import { Task } from "../../types/TaskType";

export enum TableFor {
    Users,
    Teams,
    All,
}

type TableProps = {
    target: User | Team | null;
    list: User[] | Team[];
    setCurrentTarget: (newTarget: string) => void;
};

function Table({ target, list, setCurrentTarget }: TableProps) {
    const [isShowing, setIsShowing] = useState(false);
    const [users, setUsers] = useState<User[]>([]);
    const [teams, setTeams] = useState<Team[]>([]);
    const [selectTarget, setSelectTarget] = useState(target?.id);

    useEffect(() => {
        if (target instanceof User) {
            setUsers(list as User[]);
        } else if (target instanceof Team) {
            setTeams(list as Team[]);
        } else {
        }
    }, [list, target]);

    
    return (
        <article className={styles.table}>
            <div className={styles.headerOfTable}>
                <h2>Isiklikud ülesanded</h2>

                {UserStore.userData.user?.role === "manager" ||
                UserStore.userData.user?.role === "admin" ||
                target instanceof Team ? (
                    <>
                        <select
                            className={styles.select}
                            name="list"
                            onChange={(e) => {
                                setCurrentTarget(e.currentTarget.value);
                                setSelectTarget(e.currentTarget.value);
                            }}
                            value={selectTarget}
                        >
                            <Options users={users} teams={teams} />
                        </select>
                        {UserStore.userData.user?.role === "manager" ? (
                            <>
                                <Button action={() => setIsShowing(true)}>
                                    +
                                </Button>
                                <AddingTask
                                    users={users}
                                    teams={teams}
                                    isShowingModal={isShowing}
                                    closeModal={() => setIsShowing(false)}
                                />
                            </>
                        ) : (
                            <></>
                        )}
                    </>
                ) : (
                    <></>
                )}
            </div>

            {target ? (
                target.tasks
                    .map((el) => <TableItem id={el} key={el} target={target} />)
            ) : (
                <></>
            )}
        </article>
    );
}

export default observer(Table);

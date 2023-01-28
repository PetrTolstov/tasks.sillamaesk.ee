import { useState, useEffect } from "react";
import UserStore from "../../stores/UserStore";
import styles from "./table.module.css";
import TableItem from "../TableItem/TableItem";
import { observer } from "mobx-react-lite";
import getUsers from "../../firebase/services/getUsers";
import { UserType } from "../../types/UserType";
import Button from "../Button/Button";
import AddingTask from "../AddingTask/AddingTask";

function Table() {
    const [users, setUsers] = useState<UserType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState<UserType | null>(null);
    const [isShowing, setIsShowing] = useState(false);

    function setCurrentUserByCode(code: string) {
        const result = users.filter((obj) => {
            return obj.personalCode === code;
        });

        if (result && result[0]) {
            setCurrentUser(result[0]);
        }
    }

    useEffect(() => {
        if (
            UserStore.userData.user?.role === "admin" ||
            UserStore.userData.user?.role === "manager"
        ) {
            getUsers("user").then((res) => {
                setUsers(res);
                setCurrentUser(res.at(0) as UserType);
                console.log(res);
                setIsLoading(false);
            });
        } else {
            setCurrentUser(UserStore.userData.user);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [UserStore.userData.user]);

    return (
        <article className={styles.table}>
            <div className={styles.headerOfTable}>
                <h2>Isiklikud ülesanded</h2>

                {!isLoading ? (
                    <>
                        <select
                            className={styles.select}
                            name="users"
                            onChange={(e) =>
                                setCurrentUserByCode(e.currentTarget.value)
                            }
                        >
                            {users.map((user) => (
                                <option value={user.personalCode} key={user.email}>
                                    {user.firstName} {user.lastName}
                                </option>
                            ))}
                        </select>
                        {UserStore.userData.user?.role === "manager" ? (
                            <>
                                <Button action={() => setIsShowing(true)}>
                                    +
                                </Button>
                                <AddingTask
                                    users={users}
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

                <span className={styles.notification}></span>
            </div>

            {currentUser ? (
                currentUser.tasks.map((el) => (
                    <TableItem id={el} key={el} user={currentUser} />
                ))
            ) : (
                <></>
            )}
        </article>
    );
}

export default observer(Table);

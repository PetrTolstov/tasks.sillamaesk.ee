import styles from "./Main.module.css";
import Table, { TableFor } from "../components/Table/Table";
import { useState, useEffect } from "react";
import getTeams from "../firebase/services/getTeams";
import getUsers from "../firebase/services/getUsers";
import UserStore from "../stores/UserStore";
import { TeamType, Team } from "../types/TeamType";
import { User, UserType } from "../types/UserType";
import { observer } from "mobx-react-lite";

function Main() {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    function setCurrentUserByCode(code: string) {
        const result = users.filter((obj) => {
            return obj.id === code;
        });

        if (result && result[0]) {
            setCurrentUser(result[0]);
        }
    }

    useEffect(() => {
        if (UserStore.userData.user) {
            if (
                UserStore.userData.user?.role === "admin" ||
                UserStore.userData.user?.role === "manager"
            ) {
                getUsers("user").then((res) => {
                    setUsers(res);
                    setCurrentUser(res.at(0) as User);
                    setIsLoading(false);
                });
            } else {
                setCurrentUser(UserStore.userData.user);
                setIsLoading(false);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [UserStore.userData.user]);

    return (
        <main className={styles.main}>
            <nav className={styles.nav}>
                <a
                    href={"/"}
                    className={[styles.link, styles.primaryLink].join(" ")}
                >
                    Tööline
                </a>
                <a href={"/Teams"} className={styles.link}>
                    Käsk
                </a>
                <a href={"/ForAll"} className={styles.link}>
                    Kõigi jaoks
                </a>
            </nav>

            {!isLoading ? (
                <Table
                    target={currentUser}
                    setCurrentTarget={(newTarget: string) =>
                        setCurrentUserByCode(newTarget)
                    }
                    list={users}
                />
            ) : (
                <>{UserStore.userData.isLoggedIn ? <p>Loading...</p> : <p>Please LogIn</p>}</>
            )}
        </main>
    );
}

export default observer(Main);

import { useState } from "react";
import UserStore from "../../stores/UserStore";
import Button from "../Button/Button";
import RegistrationForm from "../RegistrationForm/RegistrationForm";
import styles from "./header.module.css";
import LogOut from "../../firebase/services/LogOut";
import { observer } from "mobx-react-lite";
import { useLocation } from "react-router-dom";

function Header() {
    const [isShowing, setIsShowing] = useState(false);
    const path = useLocation().pathname;
    return (
        <header className={styles.header}>
            <div className={styles.aboveNav}>
                <div className={styles.logoInformation}>
                    <a className={styles.logo} href={"https://sillamaesk.ee/"}>
                        {" "}
                    </a>
                    <h1 className={styles.logoName}>
                        SILLAMÄE SPORDIKOMPLEKS KALEV
                    </h1>
                </div>

                {localStorage.getItem("isLoggedIn") ? (
                    <div className={styles.div}>
                        <Button
                            action={() => {
                                LogOut();
                                localStorage.setItem("isLoggedIn", "");
                                window.location.reload();
                            }}
                        >
                            Log Out
                        </Button>
                    </div>
                ) : (
                    <>
                        <Button action={() => setIsShowing(true)}>Login</Button>
                        <RegistrationForm
                            isShowingModal={isShowing}
                            closeModal={() => setIsShowing(false)}
                        />
                    </>
                )}
            </div>
            {UserStore.userData.user?.role === "admin" ||
            UserStore.userData.user?.role === "manager" ? (
                <nav className={styles.nav}>
                    <a
                        href={"/"}
                        className={[
                            styles.link,
                            path === "/Workers" ? "" : styles.primaryLink,
                        ].join(" ")}
                    >
                        Ülesanded
                    </a>
                    <a
                        href={"/Workers"}
                        className={[
                            styles.link,
                            path === "/Workers" ? styles.primaryLink : "",
                        ].join(" ")}
                    >
                        Töötajad
                    </a>
                </nav>
            ) : (
                <></>
            )}
        </header>
    );
}

export default observer(Header);

/*
<img
                            src={"notification.svg"}
                            alt={"Notifications"}
                            className={styles.notification}
                        />
                        */

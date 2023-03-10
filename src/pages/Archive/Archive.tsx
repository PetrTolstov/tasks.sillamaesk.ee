import UserStore from "../../stores/UserStore";
import styles from "./Archive.module.css";
import { observer } from "mobx-react-lite";

function Archive() {
    return (
        <main className={styles.main}>
            {UserStore.userData.user?.role === "manager" ? (
                <></>
            ) : (
                <a href="/">Mine tagasi</a>
            )}
        </main>
    );
}

export default observer(Archive);

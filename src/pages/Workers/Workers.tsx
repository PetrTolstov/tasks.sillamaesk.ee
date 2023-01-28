import UserStore from "../../stores/UserStore";
import styles from "./workers.module.css"

function Workers() {
    return (
        <main className={styles.main}>
            {UserStore.userData.user?.role === "manager" ? (
                            <>
                                 
                            </>
                        ) : (
                            <></>
                        )}
        </main>
    );
}

export default Workers;

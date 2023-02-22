import Button from "../../components/Button/Button";
import UserStore from "../../stores/UserStore";
import styles from "./workers.module.css"
import { useState } from 'react';
import AddingTeam from "../../components/AddingTeam/AddingTeam";
import { observer } from "mobx-react-lite";
import ChangeUserInformation from '../../components/ChangeUserInformation/ChangeUserInformation';

function Workers() {
    const [showingTeam, setShowingTeam] = useState(false)
    const [showingUserChange, setShowingUserChange] = useState(false)
    console.log(UserStore.userData.user?.role === "manager")
    return (
        <main className={styles.main}>
            {UserStore.userData.user?.role === "manager" ? (
                            <>
                                <Button action={() => setShowingTeam(true)}>Loo meeskond</Button>
                                <AddingTeam closeModal={() => setShowingTeam(false)} isShowingModal={showingTeam}/> 

                                <Button action={() => setShowingUserChange(true)}>Muutke kasutajateavet</Button>
                                <ChangeUserInformation closeModal={() => setShowingUserChange(false)} isShowingModal={showingUserChange}/> 
                            </>
                        ) : (
                            <></>
                        )}
        </main>
    );
}

export default observer(Workers);

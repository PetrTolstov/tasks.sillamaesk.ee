import Button from "../../components/Button/Button";
import UserStore from "../../stores/UserStore";
import styles from "./workers.module.css"
import { useState } from 'react';
import AddingTeam from "../../components/AddingTeam/AddingTeam";
import { observer } from "mobx-react-lite";
import ChangeUserInformation from '../../components/ChangeUserInformation/ChangeUserInformation';
import AddUser from '../../components/AddUser/AddUser';

function Workers() {
    const [showingTeam, setShowingTeam] = useState(false)
    const [showingAddUser, setShowingAddUser] = useState(false)
    const [showingUserChange, setShowingUserChange] = useState(false) 
    return (
        <main className={styles.main}>
            {UserStore.userData.user?.role === "manager" ? (
                            <>
                                <Button action={() => setShowingTeam(true)}>Loo meeskond</Button>
                                <AddingTeam closeModal={() => setShowingTeam(false)} isShowingModal={showingTeam}/> 

                                <Button action={() => setShowingUserChange(true)}>Muutke kasutajateavet</Button>
                                <ChangeUserInformation closeModal={() => setShowingUserChange(false)} isShowingModal={showingUserChange}/> 

                                <Button action={() => setShowingAddUser(true)}>Lisa kasutaja</Button>
                                <AddUser closeModal={() => setShowingAddUser(false)} isShowingModal={showingAddUser}/>
                            </>
                        ) : (
                            <a href="/">Mine tagasi</a>
                        )}
        </main>
    );
}

export default observer(Workers);

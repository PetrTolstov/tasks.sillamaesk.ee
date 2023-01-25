import { useEffect, useState } from "react";
import getTasks from "../firebase/services/getTasks";
import { DocumentData } from "firebase/firestore/lite";
import Button from "../components/Button/Button";
import RegistrationForm from '../components/RegistrationForm/RegistrationForm';
import { auth } from '../firebase/firebaseInit';
import UserStore from "../stores/UserStore";

function Main() {
    const [list, setList] = useState<DocumentData[]>();
    const [isShowing, setIsShowing] = useState(false)
    

    useEffect(() => {
        getTasks().then( (el) => {
            setList(el)
        })
    }, []);

    return (
        <>
        <Button action={() => console.log(UserStore.userData.user?.firstName)}>AAAAAAAAAAAAA</Button>
            {list ?
                
                list.map((el) => <p>{el.title}</p>)

                : 
                <>  
                {
                    localStorage.getItem("isLoggedIn") ?
                    <></>
                    :
                    <>
                    <Button action={() => setIsShowing(true)}>Login</Button>
                    <RegistrationForm isShowingModal={isShowing} closeModal={() => setIsShowing(false)}/>
                    </>
                }
                    
                </>
        }
        </>
    );
}

export default Main;

import { FormEvent, useState } from "react";
import styles from "./RegistrationForm.module.css";
import Modal from "../Modal/Modal";
import TextInput from "../TextInput/TextInput";
import Button, { Size } from "../Button/Button";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebaseInit";

type RegistrationFormProps = {
    isShowingModal: boolean;
    closeModal: () => void;
};

enum ModalTypes {
    Login,
    Registration,
}

function RegistrationForm({
    isShowingModal,
    closeModal,
}: RegistrationFormProps) {
    const [modalType, setModalType] = useState(ModalTypes.Login);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [personalCode, setPesonalCode] = useState("");
    const [number, setNumber] = useState("");


    function login(){
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => { 
            localStorage.setItem("isLoggedIn", '1')
            closeModal()            
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage)
        });
    } 


    return (
        <Modal isShowing={isShowingModal} closeModal={closeModal}>
            {modalType === ModalTypes.Login ? (
                <>
                    <TextInput
                        placeholder={"Email"}
                        value={email}
                        onChange={(i) => setEmail(i)}
                    />
                    <TextInput
                        placeholder={"Password"}
                        value={password}
                        isSecure
                        onChange={(i) => setPassword(i)}
                    />
                    <Button
                        action={() =>  login()}
                        size={Size.Medium}
                        filled
                    >
                        Login
                    </Button>
                    <Button
                        action={() => setModalType(ModalTypes.Registration)}
                        size={Size.Medium}
                    >
                        Register
                    </Button>
                </>
            ) : (
                <>
                    <TextInput
                        placeholder={"First Name"}
                        value={firstName}
                        onChange={(i) => setFirstName(i)}
                    />
                    <TextInput
                        placeholder={"Last Name"}
                        value={lastName}
                        onChange={(i) => setLastName(i)}
                    />
                    <TextInput
                        placeholder={"Pesonal Code"}
                        value={personalCode}
                        onChange={(i) => setPesonalCode(i)}
                    />
                    <TextInput
                        placeholder={"Number"}
                        value={number}
                        onChange={(i) => setNumber(i)}
                    />
                    <TextInput
                        placeholder={"Email"}
                        value={email}
                        onChange={(i) => setEmail(i)}
                    />
                    <TextInput
                        placeholder={"Password"}
                        value={password}
                        onChange={(i) => setPassword(i)}
                    />

                    <Button
                        action={() => console.log(email)}
                        size={Size.Medium}
                        filled
                    >
                        Register
                    </Button>
                    <Button
                        action={() => setModalType(ModalTypes.Login)}
                        size={Size.Medium}
                    >
                        Login
                    </Button>
                </>
            )}
        </Modal>
    );
}

export default RegistrationForm;

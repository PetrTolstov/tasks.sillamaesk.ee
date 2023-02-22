import { useState } from "react";
import Modal from "../Modal/Modal";
import TextInput from "../TextInput/TextInput";
import Button, { Size } from "../Button/Button";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../../firebase/firebaseInit";
import { setDoc, doc } from "firebase/firestore/lite";
import styles from "./RegistrationForm.module.css";

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
    const [role, setRole] = useState("user");

    function register() {
        if (firstName && lastName && email && number && personalCode) {
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    setDoc(doc(db, "users", email), {
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        number: number,
                        personalCode: personalCode,
                        active: false,
                        role: role,
                        tasks: [],
                        teams: [],
                    });
                })
                .then(() => {
                    localStorage.setItem("isLoggedIn", "1");
                    closeModal();
                })
                .catch((error) => {
                    const errorMessage = error.message;
                    console.log(errorMessage);
                });
        } else {
            alert("Please write all data");
        }
    }

    function login() {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                localStorage.setItem("isLoggedIn", "1");
                closeModal();
                window.location.reload();
            })
            .catch((error) => {
                const errorMessage = error.message;
                console.log(errorMessage);
            });
    }

    return (
        <Modal isShowing={isShowingModal} closeModal={closeModal}>
            {modalType === ModalTypes.Login ? (
                <>
                    <div>
                        <TextInput
                            placeholder={"Email"}
                            value={email}
                            onChange={(i) => setEmail(i)}
                        />
                        <TextInput
                            placeholder={"Parool"}
                            value={password}
                            isSecure
                            onChange={(i) => setPassword(i)}
                        />
                    </div>
                    <div className={styles.container}>
                        <Button action={() => login()} size={Size.Large} filled>
                            Logi sisse
                        </Button>
                        <Button
                            action={() => setModalType(ModalTypes.Registration)}
                            size={Size.Large}
                        >
                            Registreeri
                        </Button>
                    </div>
                </>
            ) : (
                <>
                    <TextInput
                        placeholder={"Eesnimi"}
                        value={firstName}
                        onChange={(i) => setFirstName(i)}
                    />
                    <TextInput
                        placeholder={"Perekonnanimi"}
                        value={lastName}
                        onChange={(i) => setLastName(i)}
                    />
                    <TextInput
                        placeholder={"Isikukood"}
                        value={personalCode}
                        onChange={(i) => setPesonalCode(i)}
                    />
                    <TextInput
                        placeholder={"Telefoninumber"}
                        value={number}
                        onChange={(i) => setNumber(i)}
                    />
                    <TextInput
                        placeholder={"Email"}
                        value={email}
                        onChange={(i) => setEmail(i)}
                    />
                    <TextInput
                        placeholder={"Parool"}
                        value={password}
                        onChange={(i) => setPassword(i)}
                    />

                    <select
                        name="role"
                        onChange={(e) => setRole(e.currentTarget.value)}
                    >
                        <option value={"user"} key={1}>
                            Tööline
                        </option>
                        <option value={"admin"} key={2}>
                            Administraator
                        </option>
                    </select>

                    <Button action={() => register()} size={Size.Medium} filled>
                        Registreeri
                    </Button>
                    <Button
                        action={() => setModalType(ModalTypes.Login)}
                        size={Size.Medium}
                    >
                        Logi sisse
                    </Button>
                </>
            )}
        </Modal>
    );
}

export default RegistrationForm;

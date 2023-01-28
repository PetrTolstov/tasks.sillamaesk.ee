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
                    <Button action={() => login()} size={Size.Medium} filled>
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

                    <select
                        name="role"
                        onChange={(e) => setRole(e.currentTarget.value)}
                    >
                        <option value={"user"} key={1}>
                            Worker
                        </option>
                        <option value={"admin"} key={2}>
                            Administrator
                        </option>
                    </select>

                    <Button action={() => register()} size={Size.Medium} filled>
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

import { useState, useEffect } from "react";
import styles from "./addingtask.module.css";
import Modal from "../Modal/Modal";
import TextInput from "../TextInput/TextInput";
import Button, { Size } from "../Button/Button";
import DateInput from "../DateInput/DateInput";
import { UserType } from "../../types/UserType";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore/lite";
import { db } from "../../firebase/firebaseInit";

type AddingTaskProps = {
    users: UserType[];
    isShowingModal: boolean;
    closeModal: () => void;
};

function AddingTask({ users, isShowingModal, closeModal }: AddingTaskProps) {
    const [currentUser, setCurrentUser] = useState<UserType | null>(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    useEffect(() => {
        setCurrentUser(users.at(0) as UserType);
    }, [users]);

    function createTask() {
        addDoc(collection(db, "tasks"), {
            checked: false,
            description: description,
            done: false,
            endDate: endDate,
            startDate: startDate,
            title: title,
        }).then((docRef) => {
            const userRef = doc(db, "users", currentUser!.email);
            currentUser?.tasks.push(docRef.id);
            updateDoc(userRef, {
                tasks: currentUser!.tasks,
            });
            closeModal();
            window.location.reload();
        });
    }

    function setCurrentUserByCode(code: string) {
        const result = users.filter((obj) => {
            return obj.personalCode === code;
        });

        if (result && result[0]) {
            setCurrentUser(result[0]);
        }
    }

    return (
        <Modal isShowing={isShowingModal} closeModal={closeModal}>
            <select
                className={styles.select}
                name="users"
                onChange={(e) => setCurrentUserByCode(e.currentTarget.value)}
            >
                {users.map((user) => (
                    <option value={user.personalCode} key={user.email}>
                        {user.firstName} {user.lastName}
                    </option>
                ))}
            </select>
            <TextInput
                placeholder={"Title"}
                value={title}
                onChange={(i) => setTitle(i)}
            />
            <TextInput
                placeholder={"Description"}
                value={description}
                onChange={(i) => setDescription(i)}
            />
            <DateInput
                placeholder={"Start Date"}
                value={startDate}
                onChange={(i) => setStartDate(i)}
            />
            <DateInput
                placeholder={"End Date"}
                value={endDate}
                onChange={(i) => setEndDate(i)}
            />

            <Button action={() => createTask()} size={Size.Medium} filled>
                Create Task
            </Button>
        </Modal>
    );
}

export default AddingTask;

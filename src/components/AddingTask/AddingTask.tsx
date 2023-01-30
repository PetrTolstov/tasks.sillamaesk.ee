import { useState, useEffect } from "react";
import styles from "./addingtask.module.css";
import Modal from "../Modal/Modal";
import TextInput from "../TextInput/TextInput";
import Button, { Size } from "../Button/Button";
import DateInput from "../DateInput/DateInput";
import { UserType, User } from "../../types/UserType";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore/lite";
import { db } from "../../firebase/firebaseInit";
import { Team } from "../../types/TeamType";
import Options from "../Options/Options";


type AddingTaskProps = {
    users: User[];
    teams: Team[];
    isShowingModal: boolean;
    closeModal: () => void;
};

function AddingTask({
    users,
    teams,
    isShowingModal,
    closeModal,
}: AddingTaskProps) {
    const [currentTarget, setCurrentTarget] = useState<User | Team | null>(
        null
    );
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    useEffect(() => {
        if (users) {
            setCurrentTarget(users.at(0) as User);
        } else if (teams) {
            setCurrentTarget(teams.at(0) as Team);
        } else {
            //foreveryone
        }
    }, [users, teams]);

    function createTask() {
        addDoc(collection(db, "tasks"), {
            checked: false,
            description: description,
            done: false,
            endDate: endDate,
            startDate: startDate,
            title: title,
        }).then((docRef) => {
            console.log(currentTarget instanceof User);
            if (currentTarget instanceof User) {
                const userRef = doc(db, "users", currentTarget!.email);
                currentTarget?.tasks.push(docRef.id);
                updateDoc(userRef, {
                    tasks: currentTarget!.tasks,
                });
                closeModal();
                window.location.reload();
            } else if (currentTarget instanceof Team) {
                const userRef = doc(db, "teams", currentTarget!.id);
                currentTarget?.tasks.push(docRef.id);
                updateDoc(userRef, {
                    tasks: currentTarget!.tasks,
                });
                closeModal();
                window.location.reload();
            } else {
                //foreveryone
            }
        });
    }

    function setCurrentTargetByCode(code: string) {
        let result: User[] | Team[] | null;
        if (users) {
            result = users.filter((obj) => {
                return obj.personalCode === code;
            });
        } else if (teams) {
            result = teams.filter((obj) => {
                return obj.id === code;
            });
        } else {
            //foreveryone
            result = null;
        }

        if (result && result[0]) {
            setCurrentTarget(result[0]);
        }
    }

    return (
        <Modal isShowing={isShowingModal} closeModal={closeModal}>
            <select
                className={styles.select}
                name="list"
                onChange={(e) => setCurrentTargetByCode(e.currentTarget.value)}
            >
                <Options users={users} teams={teams} />
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

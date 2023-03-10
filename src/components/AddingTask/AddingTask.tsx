import { useState, useEffect } from "react";
import styles from "./addingtask.module.css";
import Modal from "../Modal/Modal";
import TextInput from "../TextInput/TextInput";
import Button, { Size } from "../Button/Button";
import DateInput from "../DateInput/DateInput";
import { UserType, User } from "../../types/UserType";
import {
    addDoc,
    collection,
    doc,
    Timestamp,
    updateDoc,
} from "firebase/firestore/lite";
import { db } from "../../firebase/firebaseInit";
import { Team } from "../../types/TeamType";
import Options from "../Options/Options";
import getTask from "../../firebase/services/getTasks";

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
        if (users.at(0)) {
            let {id, firstName, lastName, personalCode, email, number, teams, tasks, active, role, } = users.at(0) as User
            let user = new User(id, firstName, lastName, personalCode, email, number, teams, tasks, active, role)
            setCurrentTarget(user);
            
        } else if (teams.at(0)) {
            setCurrentTarget(teams.at(0) as Team);
        }
    }, [users, teams]);

    function compareByDate(a: any, b: any) {
        var AParts = a.endDate.split("/");
        var A = new Date(+AParts[2], AParts[1] - 1, +AParts[0]).getTime();

        var BParts = b.endDate.split("/");
        var B = new Date(+BParts[2], BParts[1] - 1, +BParts[0]).getTime();

        if (A < B) {
            return -1;
        }
        if (A > B) {
            return 1;
        }
        return 0;
    }

    function createTask() {
        try {
            if (users.at(0) || teams.at(0)) {
                addDoc(collection(db, "tasks"), {
                    checked: false,
                    description: description,
                    done: false,
                    endDate: Timestamp.fromDate(
                        new Date(endDate.split("-").join("/"))
                    ),
                    startDate: Timestamp.fromDate(
                        new Date(startDate.split("-").join("/"))
                    ),
                    title: title,
                }).then(async (docRef) => {
                    console.log(currentTarget);
                    console.log(currentTarget instanceof Team);
                    if (currentTarget instanceof User) {
                        const userRef = doc(db, "users", currentTarget!.email);
                        currentTarget?.tasks.push(docRef.id);

                        let tasksAsObj = await Promise.all(
                            currentTarget?.tasks.map(async (id) => {
                                let obj = await getTask(id);
                                if (obj) {
                                    obj.id = id;
                                }
                                return obj;
                            })
                        );

                        const tasksId = tasksAsObj
                            .filter((el) => el)
                            .sort(compareByDate)
                            .map((el) => el?.id);

                        updateDoc(userRef, {
                            tasks: tasksId,
                        });
                        closeModal();
                        window.location.reload();
                    } else if (currentTarget instanceof Team) {
                        const userRef = doc(db, "teams", currentTarget!.id);
                        currentTarget?.tasks.push(docRef.id);

                        let tasksAsObj = await Promise.all(
                            currentTarget?.tasks.map(async (id) => {
                                let obj = await getTask(id);
                                if (obj) {
                                    obj.id = id;
                                }
                                return obj;
                            })
                        );

                        const tasksId = tasksAsObj
                            .filter((el) => el)
                            .sort(compareByDate)
                            .map((el) => el?.id);

                        updateDoc(userRef, {
                            tasks: tasksId,
                        });
                        closeModal();
                        window.location.reload();
                    }
                });
            } else {
                addDoc(collection(db, "notifications"), {
                    description: description,
                    endDate: Timestamp.fromDate(
                        new Date(endDate.split("-").join("/"))
                    ),
                    startDate: Timestamp.fromDate(
                        new Date(startDate.split("-").join("/"))
                    ),
                    title: title,
                }).then((docRef) => {
                    closeModal();
                    window.location.reload();
                });
            }
        } catch (e) {
            alert("Kirjutage kuupäevad");
        }
    }

    function setCurrentTargetByCode(code: string) {
        let result: User[] | Team[] | null;
        if (users.at(0)) {
            result = users.filter((obj) => {
                return obj.personalCode === code;
            });
        } else if (teams.at(0)) {
            result = teams.filter((obj) => {
                return obj.id === code;
            });
        } else {
            //foreveryone
            result = null;
        }

        if (result && result[0]) {
            console.log(code);
            setCurrentTarget(result[0]);
        }
    }

    return (
        <Modal isShowing={isShowingModal} closeModal={closeModal}>
            <div>
                {users.at(0) || teams.at(0) ? (
                    <select
                        className={styles.select}
                        name="list"
                        onChange={(e) =>
                            setCurrentTargetByCode(e.currentTarget.value)
                        }
                        value={currentTarget instanceof User ? currentTarget.personalCode : currentTarget?.id}
                    >
                        <Options users={users} teams={teams} />
                    </select>
                ) : (
                    <></>
                )}
                <TextInput
                    placeholder={"Pealkiri"}
                    value={title}
                    onChange={(i) => setTitle(i)}
                />
                <TextInput
                    placeholder={"Kirjeldus"}
                    value={description}
                    onChange={(i) => setDescription(i)}
                />
                <DateInput
                    placeholder={"Algus kuupäev"}
                    value={startDate}
                    onChange={(i) => setStartDate(i)}
                />
                <DateInput
                    placeholder={"Lõppkuupäev"}
                    value={endDate}
                    onChange={(i) => setEndDate(i)}
                />
            </div>

            <Button action={() => createTask()} size={Size.Medium} filled>
                {users.at(0) || teams.at(0) ? (
                    <>Loo ülesanne</>
                ) : (
                    <>Loo teatis</>
                )}
            </Button>
        </Modal>
    );
}

export default AddingTask;

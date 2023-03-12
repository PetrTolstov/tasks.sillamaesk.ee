import { useState, useEffect } from "react";
import styles from "./AddUser.module.css";
import Modal from "../Modal/Modal";
import TextInput from "../TextInput/TextInput";
import Button, { Size } from "../Button/Button";
import DateInput from "../DateInput/DateInput";
import { UserType, User } from "../../types/UserType";
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    setDoc,
    updateDoc,
} from "firebase/firestore/lite";
import { db } from "../../firebase/firebaseInit";
import { Team } from "../../types/TeamType";
import Options from "../Options/Options";
import getUsers from "../../firebase/services/getUsers";
import getTeams from "../../firebase/services/getTeams";

type AddUserProps = {
    isShowingModal: boolean;
    closeModal: () => void;
};

function AddUser({ isShowingModal, closeModal }: AddUserProps) {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [users, setUsers] = useState<User[]>([]);
    const [isUsersLoading, setIsUsersLoading] = useState(true);
    const [teams, setTeams] = useState<Team[]>([]);
    const [currentTeam, setCurrentTeam] = useState<Team | null>(null);
    const [isTeamsLoading, setIsTeamsLoading] = useState(true);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [personalCode, setPersonalCode] = useState("");
    const [email, setEmail] = useState("");
    const [number, setNumber] = useState("");
    const [active, setActive] = useState(false);
    const [userTeams, setUserTeams] = useState<string[]>([]);

    useEffect(() => {
        getTeams().then((res) => {
            setTeams(res);
            setCurrentTeam(res.at(0) as Team);
            setIsUsersLoading(false);
        });
    }, []);

    function setCurrentUserByCode(code: string) {
        let result: User[];
        result = users.filter((obj) => {
            return obj.id === code;
        });

        if (result && result[0]) {
            setCurrentUser(result[0]);
        }
    }

    function ChangeInfo() {
        const userRef = doc(collection(db, "users"));
        setDoc(userRef, {
            firstName: firstName,
            lastName: lastName,
            active: active,
            personalCode: personalCode,
            number: number,
            email: email,
            role: "user",
            teams: userTeams,
            tasks: [],
        })
            .then((res) => {
                closeModal();
                window.location.reload()
            })
            .catch((e) => {
                console.log(e);
            });
    }

    

    return (
        <Modal isShowing={isShowingModal} closeModal={closeModal}>
            <div>
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
                    onChange={(i) => setPersonalCode(i)}
                />

                <TextInput
                    placeholder={"Email"}
                    value={email}
                    onChange={(i) => setEmail(i)}
                />

                <TextInput
                    placeholder={"Telefoninumber"}
                    value={number}
                    onChange={(i) => setNumber(i)}
                />
                <p>Active Account</p>
                <select
                    className={styles.select}
                    name="list"
                    onChange={(e) => setActive(Boolean(e.currentTarget.value))}
                    value={active ? "1" : ""}
                >
                    <option value={"1"}>Aktiivne</option>
                    <option value={""}>Pole aktiivne</option>
                </select>

                <p>User Teams</p>
                <select
                    className={styles.select}
                    name="list"
                    onChange={(e) => {
                        setUserTeams([...userTeams, e.currentTarget.value]);
                        setCurrentTeam(
                            teams.filter((el) => {
                                return el.id == e.currentTarget.value;
                            })[0]
                        );
                    }}
                    value={"default"}
                >
                    <option value={"default"}>Valige meeskond</option>
                    <Options
                        teams={teams.filter((el) => {
                            return !userTeams.includes(el.id);
                        })}
                        users={[]}
                    />
                </select>

                {teams
                    .filter((el) => {
                        return userTeams.includes(el.id);
                    })
                    .map((el) => (
                        <div className={styles.teamContainer}>
                            <span>{el.title}</span>
                            <Button
                                action={() => {
                                    setUserTeams(
                                        userTeams.filter((teamId) => {
                                            return teamId !== el.id;
                                        })
                                    );
                                }}
                            >
                                Kustuta
                            </Button>
                        </div>
                    ))}
            </div>

            <Button action={() => ChangeInfo()} size={Size.Medium} filled>
                Muuda teavet
            </Button>
        </Modal>
    );
}

export default AddUser;

import { useState, useEffect } from "react";
import styles from "./changeuserinformation.module.css";
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
    updateDoc,
} from "firebase/firestore/lite";
import { db } from "../../firebase/firebaseInit";
import { Team } from "../../types/TeamType";
import Options from "../Options/Options";
import getUsers from "../../firebase/services/getUsers";
import getTeams from "../../firebase/services/getTeams";

type ChangeUserInformationProps = {
    isShowingModal: boolean;
    closeModal: () => void;
};

function ChangeUserInformation({
    isShowingModal,
    closeModal,
}: ChangeUserInformationProps) {
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
        getUsers("user").then((res) => {
            setUsers(res);
            setCurrentUser(res.at(0) as User);
            setIsUsersLoading(false);
        });

        getTeams().then((res) => {
            setTeams(res);
            setCurrentTeam(res.at(0) as Team);
            setIsUsersLoading(false);
        });
    }, []);

    useEffect(() => {
        if (currentUser) {
            setFirstName(currentUser.firstName);
            setLastName(currentUser.lastName);
            setPersonalCode(currentUser.personalCode);
            setEmail(currentUser.email);
            setNumber(currentUser.number);
            setActive(currentUser.active);
            setUserTeams(currentUser?.teams);
        }
    }, [currentUser]);

    function setCurrentUserByCode(code: string) {
        let result: User[];
        result = users.filter((obj) => {
            return obj.personalCode === code;
        });

        if (result && result[0]) {
            setCurrentUser(result[0]);
        }
    }

    function ChangeInfo() {
        if (currentUser) {
            const userRef = doc(db, "users", currentUser?.id);
            updateDoc(userRef, {
                firstName: firstName,
                lastName: lastName,
                active: active,
                personalCode: personalCode,
                number: number,
                teams: userTeams,
            })
                .then((res) => {
                    closeModal();
                })
                .catch((e) => {
                    console.log(e);
                });
        }
    }

    function deleteAccount() {
        if (currentUser) {
            deleteDoc(doc(db, "users", currentUser.id))
                .then((res) => {
                    closeModal();
                })
                .catch((e) => {
                    console.log(e);
                });
        }
    }

    return (
        <Modal isShowing={isShowingModal} closeModal={closeModal}>
            <div>
                <select
                    className={styles.select}
                    name="list"
                    onChange={(e) =>
                        setCurrentUserByCode(e.currentTarget.value)
                    }
                >
                    <Options users={users} teams={[]} />
                </select>
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
                                console.log(
                                    `${el.id} and ${e.currentTarget.value}`
                                );
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

            <Button action={() => deleteAccount()} size={Size.Medium}>
                Kustuta konto
            </Button>
        </Modal>
    );
}

export default ChangeUserInformation;

import { useState, useEffect } from "react";

import Modal from "../Modal/Modal";
import TextInput from "../TextInput/TextInput";
import Button, { Size } from "../Button/Button";
import { addDoc, collection } from "firebase/firestore/lite";
import { db } from "../../firebase/firebaseInit";

type AddingTeamProps = {
    isShowingModal: boolean;
    closeModal: () => void;
};

function AddingTeam({ isShowingModal, closeModal }: AddingTeamProps) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    function createTeam() {
        addDoc(collection(db, "teams"), {
            tasks: [],
            description: description,
            title: title,
        }).then((docRef) => {
            closeModal();
            window.location.reload();
        });
    }

    return (
        <Modal isShowing={isShowingModal} closeModal={closeModal}>
            <div>
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
            </div>
            <Button action={() => createTeam()} size={Size.Medium} filled>
                Create Team
            </Button>
        </Modal>
    );
}

export default AddingTeam;

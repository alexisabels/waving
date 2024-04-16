import { useState } from "react"
import { db } from "../lib/firebase";
import { collection, addDoc } from "firebase/firestore";
export function useAddPost() {
    const [isLoading, setLoading] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("info");
    async function addPost(post) {
        try {
            setLoading(true);
            const docRef = await addDoc(collection(db, "posts"), {
                ...post,
                date: Date.now(),
                likes: []
            });
            console.log("Post publicado con ID: ", docRef.id);
            setSnackbarMessage("Post publicado correctamente");
            setSnackbarSeverity("success");
            setOpenSnackbar(true);
        } catch (e) {
            setSnackbarMessage("Error agregando doc: ", e);
            console.error("Error agregando doc: ", e);
            setSnackbarSeverity("error");
            setOpenSnackbar(true);
        } finally {
            setLoading(false);
        }
    }

    return { addPost, isLoading, 
        openSnackbar,
        setOpenSnackbar,
        snackbarMessage,
        snackbarSeverity, };
}
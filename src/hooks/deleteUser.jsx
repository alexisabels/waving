/* eslint-disable react/prop-types */
import { Alert, Button } from "@mui/material";
import { deleteUser as firebaseDeleteUser, getAuth } from "firebase/auth";
import { deleteDoc, doc } from "firebase/firestore";
import { useState } from "react";
import { db } from "../lib/firebase";

function DeleteUser({ uid }) {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const deleteUser = async () => {
    const auth = getAuth();
    const userRef = doc(db, "users", uid);

    try {
      await deleteDoc(userRef);
      const user = auth.currentUser;

      if (user) {
        await firebaseDeleteUser(user);
        setSuccess(true);
        setError("");
      } else {
        throw new Error("No user is currently signed in.");
      }
    } catch (err) {
      setError(`Error al eliminar el usuario: ${err.message}`);
      setSuccess(false);
    }
  };

  return (
    <div>
      {error && <Alert severity="error">{error}</Alert>}
      {success && (
        <Alert severity="success">Usuario eliminado con éxito.</Alert>
      )}
      <Button
        variant="contained"
        color="secondary"
        onClick={deleteUser}
        disabled={success}
      >
        Eliminar Usuario
      </Button>
    </div>
  );
}

export default DeleteUser;

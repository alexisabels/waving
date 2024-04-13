import { useAuthState, useSignOut } from "react-firebase-hooks/auth";

import { useEffect, useState } from "react";
import {
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../lib/firebase";
import { AUTH, HOME } from "../lib/routes";
import { doc, getDoc, setDoc } from "firebase/firestore";
import isUsernameExists from "../utils/isUsernameExist"
export function useAuth() {
  const [authUser, authLoading, error] = useAuthState(auth);
  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = useState(null); //default value
  useEffect(() => {
    async function fetchData(){
      setLoading(true)
      const ref = doc(db, "users", authUser.uid)
      const docSnap = await getDoc(ref)
      setUser(docSnap.data())
      setLoading(false)
    }
    if (!authLoading) {
      if(authUser) {
        fetchData();
      }else {
        setLoading(false) //sesion no iniciada
      }
    }
  }, [authLoading])
  return { user, isLoading, error };
}

export function useLogin() {
  const [isLoading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("info");
  const navigate = useNavigate();

  async function login({ email, password, redirectTo = HOME }) {
    setLoading(true);
    try {
      await setPersistence(auth, browserLocalPersistence);
      await signInWithEmailAndPassword(auth, email, password);
      navigate(redirectTo);

      setSnackbarMessage("Sesión iniciada correctamente");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
    } catch (error) {
      setSnackbarMessage(error.message);
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      console.error("Error en el login: ", error);
      setLoading(false);
      return false;
    }
    setLoading(false);
    return true;
  }
  return {
    login,
    isLoading,
    openSnackbar,
    setOpenSnackbar,
    snackbarMessage,
    snackbarSeverity,
  };
}
export function useLogout() {
  const [signOut, isLoading, error] = useSignOut(auth);
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("info");
  async function logout() {
    if (await signOut()) {
      setSnackbarMessage("Sesión cerrada correctamente");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
      navigate(AUTH);
    } //else: show error signout es false
  }
  return {
    logout,
    isLoading,
    openSnackbar,
    setOpenSnackbar,
    snackbarMessage,
    snackbarSeverity,
  };
}
export function useRegister() {
  const [isLoading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("info");
  const navigate = useNavigate();
  async function register({ username, email, password, redirectTo = HOME }) {
    setLoading(true);
    const usernameExists = await isUsernameExists(username);
    if (usernameExists) {
      setSnackbarMessage("Ya existe un usuario con ese nombre");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      setLoading(false)
    } else {
      try{
        const res = await createUserWithEmailAndPassword(auth, email, password)
        await setDoc(doc(db, "users", res.user.uid), {
          id: res.user.uid,
          username: username.toLowerCase(),
          avatar: "",
          date: Date.now(),
        }) 
        setSnackbarMessage("Cuenta creada correctamente");
        setSnackbarSeverity("success");
        setOpenSnackbar(true);
        navigate(redirectTo);
      } catch (error) {
        setSnackbarMessage("Error en el registro:" + error.message);
        setSnackbarSeverity("success");
        setOpenSnackbar(true);
      }
    }
    setLoading(false)
  }
  return {
    register,
    isLoading,
    openSnackbar,
    setOpenSnackbar,
    snackbarMessage,
    snackbarSeverity,
  };
}

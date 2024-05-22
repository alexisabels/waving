import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import PostsLists from "../posts/PostsLists";
import { useUserPosts } from "../../hooks/post";
import { Box, Divider, Typography } from "@mui/material";
import UserData from "./UserData/UserData";

export default function Profile() {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const q = query(
        collection(db, "users"),
        where("username", "==", username)
      );
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        setUser(userData);
      } else {
        setUser(null);
      }
      setLoading(false);
    };

    fetchUser();
  }, [username]);

  const { posts, isLoading: postsLoading } = useUserPosts(user?.id);

  if (loading) return "Cargando...";
  if (!user) return <div>Usuario no encontrado.</div>;

  return (
    <div>
      <Box
        paddingTop={8}
        paddingBottom={4}
        sx={{
          width: "100%",
          maxWidth: "600px",
          mx: "auto",

          display: "flex",
          flexDirection: "column",
          alignItems: "left",
        }}
      >
        <UserData user={user} />
        <Divider />
        <Typography
          variant="h5"
          component="h4"
          fontWeight="bold"
          paddingTop={3}
        >
          Publicaciones
        </Typography>
        <PostsLists posts={posts} isLoading={postsLoading} />{" "}
      </Box>
    </div>
  );
}

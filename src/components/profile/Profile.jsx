import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import PostsLists from "../posts/PostsLists";
import { useUserPosts } from "../../hooks/post";
import { useLikedPosts } from "../../hooks/useLikedPosts";
import { Box, Divider, Typography } from "@mui/material";
import UserData from "./UserData/UserData";

export default function Profile() {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showLikedPosts, setShowLikedPosts] = useState(false);

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

  const {
    posts,
    isLoading: postsLoading,
    fetchPosts,
    hasMore: hasMorePosts,
  } = useUserPosts(user?.id);
  const {
    likedPosts,
    isLoading: likedPostsLoading,
    fetchLikedPosts,
    hasMore: hasMoreLikedPosts,
  } = useLikedPosts();

  if (loading) return "Cargando...";
  if (!user) return <div>Usuario no encontrado.</div>;

  const handleToggle = (showLiked) => {
    setShowLikedPosts(showLiked);
  };

  const fetchMorePosts = () => {
    if (showLikedPosts) {
      fetchLikedPosts(true);
    } else {
      fetchPosts(true);
    }
  };

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
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "left",
            gap: 3,
            paddingTop: 3,
          }}
        >
          <Typography
            variant="h5"
            component="h4"
            fontWeight="bold"
            onClick={() => handleToggle(false)}
            sx={{
              opacity: showLikedPosts ? 0.3 : 1,
              cursor: "pointer",
              "&:hover": {
                opacity: 1,
              },
            }}
          >
            Publicaciones
          </Typography>
          <Typography
            variant="h5"
            component="h4"
            fontWeight="bold"
            onClick={() => handleToggle(true)}
            sx={{
              opacity: showLikedPosts ? 1 : 0.3,
              cursor: "pointer",
              "&:hover": {
                opacity: 1,
              },
            }}
          >
            Me gustas
          </Typography>
        </Box>
        <PostsLists
          posts={showLikedPosts ? likedPosts : posts}
          isLoading={showLikedPosts ? likedPostsLoading : postsLoading}
          fetchMorePosts={fetchMorePosts}
          hasMore={showLikedPosts ? hasMoreLikedPosts : hasMorePosts}
        />
      </Box>
    </div>
  );
}

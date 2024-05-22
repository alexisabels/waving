import { useAuth } from "../../../hooks/auth";
import FollowedUserCard from "./FollowedUserCard";
import { CircularProgress, Stack, Typography } from "@mui/material";
import { useFollow } from "../../../hooks/useFollow";
import { useEffect, useState } from "react";
import { db } from "../../../lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function FollowedUsersList() {
  const { user, isLoading } = useAuth();
  const { following } = useFollow(user?.id);
  const [followedUsers, setFollowedUsers] = useState([]);

  useEffect(() => {
    if (!user) return;

    const fetchFollowedUsers = async () => {
      const usersData = await Promise.all(
        following.map(async (id) => {
          const userDoc = await getDoc(doc(db, "users", id));
          // Aquí obtenemos el campo followedAt desde la colección de following
          const followedAtDoc = await getDoc(
            doc(db, "following", user.id, "myFollowing", id)
          );
          const followedAtTimestamp = followedAtDoc.data()?.followedAt;
          const followedAtDate = followedAtTimestamp
            ? followedAtTimestamp.toDate()
            : null;
          return { id, followedAt: followedAtDate, ...userDoc.data() };
        })
      );
      setFollowedUsers(usersData);
    };

    if (following.length > 0) {
      fetchFollowedUsers();
    }
  }, [following, user]);

  if (isLoading)
    return (
      <Typography textAlign="center">
        <CircularProgress sx={{ color: "#223C43" }} size={50} />
        <br />
        Cargando usuarios...
      </Typography>
    );
  if (!user) return <div>No hay usuario disponible.</div>;

  return (
    <Stack
      direction="row"
      justifyContent="flex-start"
      alignItems="center"
      spacing={2}
      sx={{ overflowX: "scroll", pr: 2 }}
      width="100%"
    >
      {followedUsers.map((followedUser) => (
        <FollowedUserCard key={followedUser.id} user={followedUser} />
      ))}
    </Stack>
  );
}

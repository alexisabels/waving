/* eslint-disable react/prop-types */
// components/Followers/FollowersList.jsx
import { useEffect, useState } from "react";
import { db } from "../../../../lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import ModalUserChip from "../ModalUserChip";
import { CircularProgress, Typography } from "@mui/material";
import { useAuth } from "../../../../hooks/auth";

export default function FollowersList({ userIds, isLoading, onClose }) {
  const [users, setUsers] = useState([]);
  const { user: currentUser } = useAuth();
  const [loadingUsers, setLoadingUsers] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersData = await Promise.all(
        userIds.map(async (id) => {
          const userDoc = await getDoc(doc(db, "users", id));
          return { id, ...userDoc.data() };
        })
      );
      setUsers(usersData);
      setLoadingUsers(false);
    };

    if (!isLoading) {
      fetchUsers();
    }
  }, [userIds, isLoading]);

  if (isLoading || loadingUsers) {
    return <CircularProgress sx={{ color: "#223C43" }} size={50} />;
  }

  if (users.length === 0) {
    return (
      <Typography fontSize="large" textAlign="center">
        Sin seguidores
      </Typography>
    );
  }

  return (
    <div>
      {users.map((user) => (
        <ModalUserChip
          key={user.id}
          user={user}
          currentUserId={currentUser.id}
          onClose={onClose}
        />
      ))}
    </div>
  );
}

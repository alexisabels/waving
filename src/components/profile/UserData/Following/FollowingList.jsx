/* eslint-disable react/prop-types */
// components/Following/FollowingList.jsx
import { useEffect, useState } from "react";
import { db } from "../../../../lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import ModalUserChip from "../ModalUserChip";
import { Typography } from "@mui/material";
import { useAuth } from "../../../../hooks/auth";

export default function FollowingList({ userIds, isLoading }) {
  const [users, setUsers] = useState([]);
  const { user: currentUser } = useAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      const usersData = await Promise.all(
        userIds.map(async (id) => {
          const userDoc = await getDoc(doc(db, "users", id));
          return { id, ...userDoc.data() };
        })
      );
      setUsers(usersData);
    };

    if (!isLoading) {
      fetchUsers();
    }
  }, [userIds, isLoading]);

  if (isLoading) {
    return <div>Cargando...</div>;
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
        />
      ))}
    </div>
  );
}

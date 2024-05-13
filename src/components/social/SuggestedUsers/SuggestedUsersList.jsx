import { useEffect, useState } from "react";
import SuggestedUserCard from "./SuggestedUserCard";
import { Stack } from "@mui/material";
import { fetchUsers } from "../../../hooks/fetchUsers";
export default function SuggestedUsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUniqueUsers = async () => {
      setLoading(true);
      try {
        const allUsers = await fetchUsers();
        const uniqueUsers = allUsers
          .sort(() => 0.5 - Math.random())
          .slice(0, 4);
        setUsers(uniqueUsers);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    loadUniqueUsers();
  }, []);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Stack
      direction="row"
      justifyContent="flex-start" // Cambio para alinear al inicio
      alignItems="center"
      spacing={2}
      sx={{ overflowX: "scroll", pr: 2 }} // Añade padding en los lados
      width="100%"
    >
      {users.map((user) => (
        <SuggestedUserCard key={user.id} user={user} />
      ))}
    </Stack>
  );
}

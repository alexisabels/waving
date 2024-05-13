import { useAuth } from "../../../hooks/auth";
import SuggestedUserCard from "./SuggestedUserCard";
import { Stack } from "@mui/material";
export default function SuggestedUsersList() {
  // const [users, setUsers] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const { user, isLoading } = useAuth();

  if (isLoading) return <div>Cargando...</div>;
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
      {/* {users.map((user) => ( */}
      <SuggestedUserCard key={user.id} user={user} />
      {/*  ))} */}
    </Stack>
  );
}

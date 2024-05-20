/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import ModalUserChip from "../ModalUserChip";
export default function FollowingList({ user, isLoading }) {
  return (
    <div>
      {/* {users?.length === 0 ? (
        <Typography fontSize="large" textAlign="center">
          Sin seguidores
        </Typography>
      ) : ( */}
      {/* // users?.map((user) => */}
      <ModalUserChip key={user?.id} user={user} />
      <ModalUserChip key={user?.id} user={user} />

      <ModalUserChip key={user?.id} user={user} />

      <ModalUserChip key={user?.id} user={user} />

      {/* // ) */}
      {/* )} */}
    </div>
  );
}

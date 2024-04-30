/* eslint-disable no-unused-vars */
import React from "react";
import { useParams } from "react-router-dom";

export default function Profile() {
  const { username } = useParams();

  return (
    <div>
      <strong>PÁGINA EN CONSTRUCCIÓN</strong> <br />
      Bienvenido al perfil de {username}
    </div>
  );
}

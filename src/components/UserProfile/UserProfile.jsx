import React, { useState, useEffect } from "react";

import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";

import EditProfile from "./EditProfile";
import ViewProfile from "./ViewProfile";
import ChangePassword from "./ChangePassword";

import { getUserProfile } from "./API";

export default function UserProfile({ setSnackbarMessage, setLoading }) {
  const [data, setData] = useState({});
  const [editing, setEditing] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      await getUserProfile(setSnackbarMessage, setData);

      setLoading(false);
    }

    fetchData();
  }, []);

  return (
    <Container
      sx={{
        margin: "30px auto",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Card sx={{ width: "450px" }}>
        <CardHeader
          avatar={
            <Avatar sx={{ backgroundColor: "#1F6CFA" }}>
              {data?.name?.charAt(0)}
            </Avatar>
          }
          title={data?.name}
          subheader={data?.role}
        />

        {changingPassword ? (
          <ChangePassword
            setSnackbarMessage={setSnackbarMessage}
            setChangingPassword={setChangingPassword}
            setLoading={setLoading}
          />
        ) : editing ? (
          <EditProfile
            data={data}
            setData={setData}
            setEditing={setEditing}
            setSnackbarMessage={setSnackbarMessage}
            setLoading={setLoading}
          />
        ) : (
          <ViewProfile
            data={data}
            setEditing={setEditing}
            setChangingPassword={setChangingPassword}
          />
        )}
      </Card>
    </Container>
  );
}

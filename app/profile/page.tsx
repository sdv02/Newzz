"use client";
import React, { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Avatar,
  FormControlLabel,
  FormGroup,
  Checkbox,
} from "@mui/material";
import styled from "@emotion/styled";
import { login, logout } from "../../store/features/authSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { useSelector } from "react-redux";

export default function Profile() {
  const dispatch = useDispatch<AppDispatch>();
  const userDet = useSelector((state: any) => state.authReducer.value.user);
  const isloggedIn = useSelector(
    (state: any) => state.authReducer.value.isLoggedIn
  );
  //const { isLoggedIn, userDet, login, logout } = useContext(AuthContext);

  const StyledProfile = styled(Paper)({
    width: 600,
    height: 400,
    padding: 50,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 50,
    elevation: "0",
  });

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      {isloggedIn ? (
        <StyledProfile>
          <Typography
            padding={2}
            justifySelf="center"
            variant="h6"
            color="primary"
          >
            {" "}
            Hi, {userDet?.name || userDet?.email}
          </Typography>
          <Grid
            container
            spacing={5}
            sx={{
              display: "ruby",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <Grid item xs={12} sm={6}>
              <Avatar sx={{ width: 100, height: 100, bgcolor: "brown" }}>
                {" "}
                <Typography variant="h2">
                  {" "}
                  {userDet?.name ?? null}
                </Typography>{" "}
              </Avatar>
            </Grid>
            <Grid item xs={12} sm={6} sx={{ height: 140, width: 200 }}>
              <Box>
                <Typography>{userDet?.name || userDet?.email}</Typography>
                <Typography>{userDet?.email}</Typography>
                <Typography>Joined since: 2023</Typography>
              </Box>
            </Grid>
            <Grid
              item
              md={12}
              direction="column"
              sx={{ height: 300, width: 600 }}
            >
              <Paper sx={{ padding: "20px", display: "block" }} elevation={0}>
                <Typography variant="h6"> Preferences </Typography>
                <FormGroup sx={{ display: "contents" }} row>
                  <FormControlLabel control={<Checkbox />} label="Fashion" />
                  <FormControlLabel control={<Checkbox />} label="Football" />
                  <FormControlLabel control={<Checkbox />} label="Cricket" />
                  <FormControlLabel control={<Checkbox />} label="Cinema" />
                  <FormControlLabel control={<Checkbox />} label="History" />
                  <FormControlLabel control={<Checkbox />} label="Economy" />
                </FormGroup>
              </Paper>
            </Grid>
          </Grid>
        </StyledProfile>
      ) : (
        <Typography variant="h2"> You are not logged in! </Typography>
      )}
    </Box>
  );
}

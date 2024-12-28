"use client";
import Modal from "@mui/material/Modal";
import { useState, useEffect } from "react";
import {
  styled,
  Box,
  Typography,
  Button,
  TextField,
  Dialog,
  Menu,
  MenuItem,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import Avatar from "@mui/material/Avatar";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { login, logout } from "../store/features/authSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { useSelector } from "react-redux";

export default function AuthForm() {
  const dispatch = useDispatch<AppDispatch>();
  const userDet = useSelector((state: any) => state.authReducer.value.user);
  const isloggedIn = useSelector(
    (state: any) => state.authReducer.value.isLoggedIn
  );

  const router = useRouter();
  const [openSignup, setOpenSignup] = useState<boolean>(false);
  // const [email, setEmail]=useState("");
  // const [password, setPassword]=useState("");
  // const [name, setName]=useState("");
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorElUser);

  const [slstate, setSlstate] = useState<string>("Sign Up");
  //const { isLoggedIn, user, login, logout } = useContext(AuthContext);
  //console.log({ isLoggedIn, user, login, logout })
  const onSignup = () => {
    setOpenSignup(true);
  };
  const StyledModal = styled(Dialog)({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  });

  const handleFormSubmit: React.FormEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    let form = document.getElementById("authform") as HTMLFormElement;
    const formData = new FormData(form);
    // setEmail(formData.get('Email'));
    // setPassword(formData.get("Password"));
    // setName(formData.get("Name"));
    const name = formData.get("Name");
    const email = formData.get("Email");
    const password = formData.get("Password");
    console.log(formData.get("Email"));

    if (slstate === "Sign Up") {
      console.log(
        `Signing up with Name: ${name}, Email: ${email}, Password: ${password}`
      );
      dispatch(login({ email, name, password }));
      // setIsLoggedIn(true);
      // setUser({email,password,name});
    } else {
      console.log(`Logging in with Email: ${email}, Password: ${password}`);
      dispatch(login({ email, name, password }));
      // setIsLoggedIn(true);
      // setUser({email,password});
    }
    //console.log({ isLoggedIn, user, setIsLoggedIn, setUser })
    setOpenSignup(false);
    //console.log({ isLoggedIn, user, setIsLoggedIn, setUser })
  };

  function handleProfileClick() {
    if (isloggedIn) router.push("/profile");
    else router.push("/");
    setAnchorElUser(null);
  }

  return (
    <>
      {!isloggedIn ? (
        <Button variant="contained" color="secondary" onClick={onSignup}>
          Sign Up / Log in
        </Button>
      ) : (
        <>
          <Typography variant="h6" color="secondary">
            Welcome, {userDet.name || userDet.email}
          </Typography>
          <Button
            id="fade-button"
            aria-controls={open ? "fade-menu" : undefined}
            //aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={(e) => setAnchorElUser(e.currentTarget)}
          >
            <Avatar></Avatar>
          </Button>
          <Menu
            id="fade-menu"
            MenuListProps={{
              "aria-labelledby": "fade-button",
            }}
            anchorEl={anchorElUser}
            open={open}
            onClose={() => setAnchorElUser(null)}
          >
            <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
            <MenuItem
              onClick={() => {
                dispatch(logout());
                router.push("/");
                setAnchorElUser(null);
              }}
            >
              Logout
            </MenuItem>
          </Menu>
          {/* <Button onClick={()=>logout()}>Logout</Button> */}
        </>
      )}

      <StyledModal
        open={openSignup}
        onClose={(e) => setOpenSignup(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        onSubmit={handleFormSubmit}
      >
        <Box
          width={370}
          bgcolor={"white"}
          borderRadius={2}
          p={5}
          alignItems={"center"}
          display={"flex"}
          flexDirection={"column"}
        >
          <LockIcon color="secondary" fontSize="large"></LockIcon>

          <Typography variant="h5" color="primary" p={3}>
            {slstate === "Sign Up" ? "Sign Up" : "Login"}
          </Typography>
          <form id="authform" autoComplete="off">
            <Box
              width={250}
              display={"flex"}
              gap={3}
              flexDirection={"column"}
              margin={"10px 20px"}
              padding={"20px"}
            >
              {slstate === "Sign Up" ? (
                <TextField
                  id="outlined-basic"
                  label="Name"
                  name="Name"
                  variant="outlined"
                  required
                />
              ) : (
                <></>
              )}
              <TextField
                id="outlined-basic"
                name="Email"
                label="Email"
                variant="outlined"
                required
              />
              <TextField
                id="outlined-password-input"
                name="Password"
                label="Password"
                type="password"
                required
              />
              <Box display={"flex"} gap={2}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="secondary"
                  sx={{ margin: 4 }}
                  onClick={() => {
                    setSlstate("Sign Up");
                  }}
                >
                  Sign Up
                </Button>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="secondary"
                  sx={{ margin: 4 }}
                  onClick={() => {
                    setSlstate("Login");
                  }}
                >
                  Login
                </Button>
              </Box>
            </Box>
          </form>
        </Box>
      </StyledModal>
    </>
  );
}

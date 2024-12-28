"use client";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import {
  Typography,
  styled,
  TextField,
  Menu,
  MenuItem,
  IconButton,
  Grid,
  Container,
} from "@mui/material";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useState, useEffect } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import LockIcon from "@mui/icons-material/Lock";
import AuthForm from "./AuthForm";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { validateHeaderName } from "http";
import { options } from "./consts";

export default function Header() {
  const [tab, setTab] = useState<string>("");
  const pathname = usePathname();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  // const [openSignup, setOpenSignup]=useState(false);
  // const [email, setEmail]=useState();
  // const [password, setPassword]=useState();
  // const [name, setName]=useState();
  // const [slstate, setSlstate]=useState("Sign Up")

  const handleTabClick = (event, value) => {
    setTab(value);
    switch (value) {
      case "politics":
        router.push(`/${value}`);
        break;
      case "gadgets":
        router.push(`/${value}`);
        break;
      case "health-and-fitness":
        router.push(`/${value}`);
        break;
      case "sports":
        router.push(`/${value}`);
        break;
      default:
        router.push("/");
    }
  };

  // const onSignup=()=>{
  //     setOpenSignup(true);
  // }

  const HeaderRight = styled(Box)(({ theme }) => ({
    display: "flex",
    gap: 4,
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  }));
  // const StyledModal=styled(Modal)({
  //     display:"flex",
  //     alignItems:"center",
  //     justifyContent:"center",
  // })

  useEffect(() => {
    //console.log(pathname);
    const value = pathname.split("/")[1];
    switch (value) {
      case "politics":
        setTab("politics");
        break;
      case "gadgets":
        setTab("gadgets");
        break;
      case "health-and-fitness":
        setTab("health-and-fitness");
        break;
      case "sports":
        setTab("sports");
        break;
      default:
        setTab("");
    }
  }, [pathname]);

  const handlePoliticsCountry = (event, option) => {
    const currentPath = pathname;
    if (option !== "All" && tab === "politics") {
      router.push(`/politics/${option}`);
    }
    console.log(option);
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        padding: "5px 50px",
        boxShadow: "0px 5px 10px grey",
      }}
    >
      <Box
        sx={{
          display: "ruby",
          padding: "5px 80px",
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        <Typography
          variant="h2"
          sx={{
            padding: "10px",
            fontWeight: "bolder",
            fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
            color: "rgb(49, 48, 48)",
          }}
        >
          {" "}
          NewzZ{" "}
        </Typography>
        <Typography
          sx={{
            fontFamily:
              "Cambria, Cochin, Georgia, Times, 'Times New Roman', serif",
            fontStyle: "italic",
            fontSize: "larger",
            color: "#630404",
          }}
        >
          keep up with the world
        </Typography>
      </Box>
      <Box
        sx={{
          margin: { md: "0px 180px", sm: "10px" },
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ fontWeight: "large" }}>
          <Tabs
            onChange={handleTabClick}
            value={tab}
            aria-label="basic tabs example"
            textColor="secondary"
            indicatorColor="secondary"
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="All" value={""} />
            <Tab
              label="Politics"
              value={"politics"}
              onClick={(e) => {
                setAnchorEl(e.currentTarget);
              }}
              id="button"
              aria-controls={open ? "long-menu" : undefined}
              aria-expanded={open ? "true" : undefined}
              //aria-haspopup="true"
            />
            {/* <IconButton onClick={(e)=>{setAnchorEl(e.currentTarget)}} id="long-button" aria-controls={open ? 'long-menu' : undefined}
                                aria-expanded={open ? 'true' : undefined}
                                aria-haspopup="true"><ArrowDropDownIcon ></ArrowDropDownIcon></IconButton> */}

            <Tab label="Sports" value={"sports"} />
            <Tab label="Health and Fitness" value={"health-and-fitness"} />
            <Tab label="Gadgets" value={"gadgets"} />
          </Tabs>
          <Menu
            id="long-menu"
            MenuListProps={{
              "aria-labelledby": "button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={() => {
              setAnchorEl(null);
            }}
          >
            {options.map((option) => (
              <MenuItem
                key={option}
                selected={option === option}
                onClick={(e) => {
                  handlePoliticsCountry(e, option);
                }}
              >
                {option}
              </MenuItem>
            ))}
          </Menu>
        </Box>
        <Box
          display={{ xs: "none", sm: "none", md: "none", lg: "flex" }}
          gap={4}
        >
          {/* {
                        tab ==="world" ? <Paper component="form" sx={{ p: '2px 4px',display:"flex", alignItems: 'center', width:{ xl:"250px"} , background:"hsl(0, 6%, 93%)", borderRadius:"20px" }}>
                        <InputBase sx={{ ml: 1, flex: 1}} placeholder="Search" inputProps={{ 'aria-label': 'search ' }} onChange={ (e) => props.onSearch(e)} />
                        </Paper>
                        :  <></>
                    } */}

          <AuthForm />
          {/* <StyledModal
                    disableRestoreFocus
                        open={openSignup}
                        onClose={e=>setOpenSignup(false)}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        >
                        <Box width={370}  bgcolor={"white"} borderRadius={2} p={5} alignItems={"center"} display={"flex"} flexDirection={"column"}> 
                            <LockIcon color="secondary" fontSize="large"></LockIcon>
                            
                            <Typography variant="h5"  color="primary" p={3}>
                            { slstate==="Sign Up"? "Sign Up" : "Login"}
                            </Typography>
                            <Box component="form" autoComplete="off" width={ 250} display={"flex"} gap={3} flexDirection={"column"} margin={"10px 20px"} padding={"20px"}>
                                { slstate=== "Sign Up"? <TextField id="outlined-basic" label="Name" variant="outlined" required />: <></> }
                                <TextField id="outlined-basic" label="Email" variant="outlined" required width={500} />
                                <TextField id="outlined-password-input" label="Password" type="password" required autoComplete="current-password"/>
                                <Box display={"flex" } gap={2}> 
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="secondary"
                                    margin={4}
                                    onClick={()=>{setSlstate("Sign Up")}}
                                    >
                                    Sign Up
                                </Button>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="secondary"
                                    margin={4}
                                    onClick={()=>{setSlstate("Login")}}
                                    >
                                    Login 
                                </Button>
                                </Box>
                            </Box>
                        </Box>
                    </StyledModal> */}
        </Box>
      </Box>
    </Box>
  );
}

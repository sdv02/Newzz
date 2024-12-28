import React from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Grid,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import { ApiResponseType } from "./types";

type PropType = {
  items: ApiResponseType[];
};

export default function OtherPage(props: PropType) {
  const mainData = props.items.slice(0, 1);
  const secondaryData = props.items.slice(1, 3);

  const cardStyle = {
    display: "inline-flex",
    alignItems: "flex-end",
    flexShrink: 0,
    borderRadius: "10px",
    color: "white",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  };

  return (
    <Box
      sx={{
        width: { xs: "100%", md: "75%", sm: "100%" },
        margin: { xs: "none", md: "0px 250px", sm: "10px" },
        marginTop: 5,
      }}
    >
      <Grid container spacing={2}>
        <Grid item md={12} lg={6}>
          {mainData.map((item) => {
            return (
              <Card
                sx={cardStyle}
                key={item.url}
                onClick={() => {
                  window.location.href = item.url;
                }}
                style={{
                  height: "420px",
                  width: "100%",
                  backgroundImage: `linear-gradient(rgb(250 248 248 / 0%), rgb(33 31 31 / 78%)), url(${item.urlToImage})`,
                }}
              >
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {item.title}
                  </Typography>
                  <Typography variant="body2">{item.description}</Typography>
                </CardContent>
              </Card>
            );
          })}
        </Grid>
        <Grid item md={12} lg={6} spacing={2} container direction={"column"}>
          {secondaryData.map((item) => {
            return (
              <Grid item key={item.url}>
                <Card
                  sx={cardStyle}
                  style={{
                    height: "200px",
                    width: "100%",
                    backgroundImage: `linear-gradient(rgb(250 248 248 / 0%), rgb(33 31 31 / 78%)), url(${item.urlToImage})`,
                  }}
                  onClick={() => {
                    window.location.href = item.url;
                  }}
                >
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      {item.title}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </Box>
  );
}

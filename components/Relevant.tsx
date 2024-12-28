"use client";
import { useState } from "react";
import DateDifference from "./DateTime";
import Pagination from "@mui/material/Pagination";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { ApiResponseType } from "./types";

type PropType = {
  items: ApiResponseType[];
  input?: string;
};

function Relevant(props: PropType) {
  const releventitems = props.items;
  //console.log(releventitems);
  function hasImage(item) {
    if (item.urlToImage) {
      return item;
    }
  }
  const filtered = releventitems.filter(hasImage);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const pageCount = Math.ceil(filtered.length / itemsPerPage);
  const currentItems = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const itemStyle = {
    p: 2,
    flexGrow: 1,
    margin: 2,
    "&:hover": {
      backgroundColor: "#d9d7d782",
    },
  };
  const relevantHeading = {
    display: "flex",
    color: "#7d1616",
    fontFamily: "system-ui",
    fontStretch: "condensed",
    fontSize: "xx-large",
    fontWeight: 500,
  };
  return (
    <Box sx={{ padding: "10px 20px" }}>
      <Box display={"flex"}>
        <Typography sx={relevantHeading}> Trending Now </Typography>{" "}
        {props.input ? (
          <Typography
            sx={relevantHeading}
            style={{ textTransform: "capitalize" }}
          >
            {" "}
            / {props.input}{" "}
          </Typography>
        ) : (
          <></>
        )}
      </Box>
      <Pagination
        count={pageCount}
        page={currentPage}
        onChange={handlePageChange}
        shape="rounded"
        siblingCount={1}
        sx={{ display: "flex", justifyContent: "center" }}
      />
      {currentItems.map((item, index) => {
        return (
          <Paper sx={itemStyle} key={index}>
            <Grid
              container
              wrap="nowrap"
              spacing={2}
              sx={{ padding: "10px" }}
              onClick={() => {
                window.location.href = item.url;
              }}
            >
              <Grid
                item
                justifyContent="center"
                padding="10px"
                display={{ sm: "none", md: "flex" }}
              >
                <img
                  src={item.urlToImage}
                  height="130px"
                  width="180px"
                  alt="couldn't load img"
                ></img>
              </Grid>
              <Grid
                item
                xs={12}
                sm
                container
                direction="column"
                spacing={2}
                zeroMinWidth
              >
                <Typography variant="h6" mt={2}>
                  {item.title}
                </Typography>
                <Typography variant="subtitle2">
                  {item.description}{" "}
                  <DateDifference dateString={item.publishedAt} />
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        );
      })}
    </Box>
  );
}

export default Relevant;

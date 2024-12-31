"use client";
import Headlines from "../components/Headlines";
import Relevant from "../components/Relevant";
import Popularity from "../components/Popularity";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import { Box, Snackbar, Paper, InputBase, Link } from "@mui/material";
import SignupDialog from "../components/SignupDialog";
import {
  fetchData,
  fetchPopular,
  fetchHeadlines,
} from "../store/features/dataSlice";
import { fetchSearchResults } from "../store/features/searchSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AppDispatch } from "../store/store";
import { ApiResponseType } from "../components/types";
import { itemss } from "../components/consts";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
export default function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    document.title = "NewzZ";
  }, []);

  const headlines: ApiResponseType[] = useSelector(
    (state: any) => state.dataReducer.headlines
  );
  const data: ApiResponseType[] = useSelector(
    (state: any) => state.dataReducer.data
  );
  const popular: ApiResponseType[] = useSelector(
    (state: any) => state.dataReducer.popular
  );

  const searchResults: ApiResponseType[] = useSelector(
    (state: any) => state.searchReducer.searchResults
  );

  // const headlines = [];
  // const data = [];
  // const popular = [];
  // const searchResults = [];

  useEffect(() => {
    console.log("****initiating api's", dispatch);
    dispatch(fetchData());
    dispatch(fetchHeadlines());
    dispatch(fetchPopular());
  }, []);

  // api call for headlines section
  // const [headlines, setHeadlines] = useState([]);
  // useEffect(() => {
  //   axios
  //     .get(`https://newsapi.org/v2/top-headlines?country=in&apiKey=${API_KEY}`)
  //     .then((response) => {
  //       //console.log(response);
  //       setHeadlines(response.data.articles);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }, []);

  // api call for relevant/ trending now section
  // const [data, setData] = useState([]);
  // useEffect(() => {
  //   axios
  //     .get(
  //       `https://newsapi.org/v2/everything?q=india&sortBy=publishedAt&apiKey=${API_KEY}`
  //     )
  //     .then((response) => {
  //       //console.log(response);
  //       setData(response.data.articles);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }, []);

  // api call for popular section
  // const [popular, setPopular] = useState([]);
  // useEffect(() => {
  //   axios
  //     .get(
  //       `https://newsapi.org/v2/everything?q=world&from=2024-06-07&to=2024-06-13&sortBy=popularity&apiKey=${API_KEY}`
  //     )
  //     .then((response) => {
  //       //console.log(response);
  //       setPopular(response.data.articles);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }, []);

  const [searchInput, setSearchInput] = useState("");
  //const [searchResults, setSearchResults] = useState([]);

  function handleOnSearch(input) {
    //console.log(input.target.value);
    setSearchInput(input.target.value);
  }

  /*async function fetchSearchApi () {
      const result = setTimeout(() => {
        await axios.get(`https://newsapi.org/v2/everything?q=${searchInput}&searchIn=title&apiKey=${API_KEY}`)
      console.log("*** result", result);
      setSearchResults(result.data.articles);
      console.log("***result block")
      return result;
    }, 1000)
    */

  // api call for search input
  // useEffect(() => {
  //   if (searchInput) {
  //     const getSearchResults = setTimeout(() => {
  //       axios
  //         .get(
  //           `https://newsapi.org/v2/everything?q=${searchInput}&searchIn=title&sortBy=publishedAt&apiKey=${API_KEY}`
  //         )
  //         .then((response) => {
  //           //console.log(response);
  //           setSearchResults(response.data.articles);
  //         })
  //         .catch(function (error) {
  //           console.log(error);
  //         });
  //     }, 1500);

  //     return () => clearTimeout(getSearchResults);
  //   }
  // }, [searchInput]);

  useEffect(() => {
    if (searchInput) {
      const getSearchResults = setTimeout(() => {
        dispatch(fetchSearchResults(searchInput));
      }, 1500);
      return () => clearTimeout(getSearchResults);
    }
  }, [searchInput, dispatch]);

  return (
    <Box
      maxWidth={"xl"}
      py={4}
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Box sx={{ display: "grid", justifyItems: "center" }}>
        <Box sx={{ display: "flex", width: "250px" }}>
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: { xl: "250px" },
              background: "hsl(0, 6%, 93%)",
              borderRadius: "20px",
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search"
              inputProps={{ "aria-label": "search " }}
              onChange={(e) => handleOnSearch(e)}
            />
          </Paper>
        </Box>
        <Headlines items={headlines.length > 0 ? headlines : itemss} />
      </Box>
      <Box sx={{ margin: "none", width: "100%" }}>
        {searchInput === "" ? (
          <Grid
            container
            sx={{
              width: { md: "75%", sm: "100%" },
              margin: { md: "0px 220px", sm: "10px" },
            }}
          >
            <Grid item xs={8}>
              <Relevant items={data.length > 0 ? data : itemss} />
            </Grid>
            <Grid item xs={4}>
              <Popularity items={popular.length > 0 ? popular : itemss} />
            </Grid>
          </Grid>
        ) : searchResults.length === 0 ? (
          <>
            <h3 style={{ textAlign: "center" }}>No search results found</h3>
            <Grid
              container
              spacing={2}
              sx={{
                width: { md: "75%", sm: "100%" },
                margin: { md: "0px 220px", sm: "10px" },
              }}
            >
              <Grid item xs={8}>
                <Relevant items={data.length > 0 ? data : itemss} />
              </Grid>
              <Grid item xs={4}>
                <Popularity items={popular.length > 0 ? popular : itemss} />
              </Grid>
            </Grid>
          </>
        ) : (
          <Grid
            container
            spacing={2}
            sx={{
              width: { md: "75%", sm: "100%" },
              margin: { md: "0px 220px", sm: "10px" },
            }}
          >
            <Grid item xs={8}>
              <Relevant items={searchResults} input={searchInput} />
            </Grid>
            <Grid item xs={4}>
              <Popularity items={popular} />
            </Grid>
          </Grid>
        )}
        <SignupDialog />
      </Box>
    </Box>
  );
}

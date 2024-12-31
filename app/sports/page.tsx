"use client";
import OtherPage from "../../components/OtherPages";
import Relevant from "../../components/Relevant";
import axios from "axios";
import { Box, Paper, InputBase, Button, styled } from "@mui/material/";
import data from "../data";
import { useSearchParams } from "next/navigation";
import { useState, useCallback, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { fetchTabData } from "../../store/features/tabsDataSlice";
import { AppDispatch } from "../../store/store";
import { ApiResponseType } from "../../components/types";
import { itemss } from "../../components/consts";

export default function Sports() {
  const dispatch = useDispatch<AppDispatch>();
  const data: ApiResponseType[] = useSelector(
    (state: any) => state.tabDataReducer.results
  );
  useEffect(() => {
    dispatch(fetchTabData("sports"));
  }, [dispatch]);
  //const { content } = data("sports");
  const content = data;
  const router = useRouter();
  const pathname = usePathname();
  // const searchParams = useSearchParams();
  const [query, setQuery] = useState<string>("");

  // const createQueryString = useCallback(
  //     (name, value) => {
  //       const params = new URLSearchParams(searchParams)
  //       params.set(name, value)
  //       return params.toString()
  //     },
  //     [searchParams]
  //   )

  // useEffect(() => {
  //     setQuery(searchParams.get('search') || "");
  // }, [searchParams]);

  const handleSearchClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    // const params = new URLSearchParams(searchParams);
    // params.set("search", query);
    // router.push(`${pathname}?${params.toString()}`);
  };
  function filterBySearch(item) {
    const regex = new RegExp(query, "i");
    return (
      item.content?.match(regex) ||
      item.title?.match(regex) ||
      item.description?.match(regex)
    );
  }
  let filtered = query ? content.filter(filterBySearch) : content;

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Box sx={{ margin: "20px", width: "250px" }}>
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
            id="search"
            inputProps={{ "aria-label": "search " }}
            value={query}
            onChange={handleSearchClick}
          />
          <Button color="secondary">
            {" "}
            <SearchIcon />
          </Button>
        </Paper>
      </Box>
      {/* <Header tab={"sports"} /> */}
      <OtherPage
        items={filtered.length > 0 ? filtered.slice(0, 4) : itemss.slice(0, 4)}
      />
      <Box
        sx={{
          width: { md: "75%", sm: "100%" },
          margin: { md: "0px 220px", sm: "10px" },
        }}
      >
        <Relevant
          items={
            filtered.length > 0 ? filtered.slice(4, -1) : itemss.slice(4, -1)
          }
        />
      </Box>
    </Box>
  );
}

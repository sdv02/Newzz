"use client";
import OtherPage from "../../components/OtherPages";
import Relevant from "../../components/Relevant";
import { Box, Paper, InputBase, Button } from "@mui/material/";
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

export default function Politics() {
  const dispatch = useDispatch<AppDispatch>();
  const data: ApiResponseType[] = useSelector(
    (state: any) => state.tabDataReducer.results
  );
  //const { content } = data("politics");
  const content = data;
  useEffect(() => {
    dispatch(fetchTabData("politics"));
  }, [dispatch]);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState<string>(searchParams.get("search") || "");

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  useEffect(() => {
    setQuery(searchParams.get("search") || "");
  }, [searchParams]);

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
      <Box sx={{ float: "right", margin: "20px 750px", width: "250px" }}>
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
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button
            color="secondary"
            onClick={(e) => {
              router.push(pathname + "?" + createQueryString("search", query));
            }}
          >
            {" "}
            <SearchIcon />
          </Button>
        </Paper>
      </Box>
      {/* <Header tab="politics"></Header> */}
      <OtherPage items={filtered.slice(0, 4)} />
      <Box
        sx={{
          width: { md: "75%", sm: "100%" },
          margin: { md: "0px 220px", sm: "10px" },
        }}
      >
        <Relevant items={filtered.slice(4, -1)} />
      </Box>
    </Box>
  );
}

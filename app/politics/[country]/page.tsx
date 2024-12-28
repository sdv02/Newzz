"use client";
import OtherPage from "../../../components/OtherPages";
import Relevant from "../../../components/Relevant";
import { Box, Paper, InputBase, Button } from "@mui/material/";
import data from "../../data";
import { useSearchParams } from "next/navigation";
import { useState, useCallback, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { ApiResponseType } from "../../../components/types";
import { AppDispatch } from "../../../store/store";
import { fetchTabData } from "../../../store/features/tabsDataSlice";

export default function CountryPolitics({
  params,
}: {
  params: { country: string };
}) {
  const dispatch = useDispatch<AppDispatch>();
  const data = useSelector((state: any) => state.tabDataReducer.results);
  useEffect(() => {
    dispatch(fetchTabData(`${params.country}+politics`));
  }, [dispatch]);
  const content = data;
  const router = useRouter();
  const pathname = usePathname();
  // const { content } = data(`${params.country}+politics`);
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
    <>
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
            <SearchIcon color="secondary" />
          </Button>
        </Paper>
      </Box>
      <OtherPage items={filtered.slice(0, 4)} />
      <Box margin={"0px 250px"}>
        <Relevant items={filtered.slice(4, -1)} />
      </Box>
    </>
  );
}

"use client";
import { Paper, Typography, Box } from "@mui/material";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.push("/");
    }, 5000);
  }, []);
  return (
    <>
      <Box
        display="flex"
        margin="30px"
        justifyContent="center"
        alignItems="center"
      >
        <Paper
          sx={{
            padding: "50px",
            textAlign: "center",
            display: "block",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <Typography variant="h1" color="secondary" fontFamily="sans-serif">
            Oops!
          </Typography>
          <Typography variant="h2" color="secondary">
            404 error Page Not Found{" "}
          </Typography>
          <Link href="/">Return Home</Link>
        </Paper>
      </Box>
    </>
  );
}

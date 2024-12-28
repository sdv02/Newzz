// To reduce apicalls on several pages
"use client";
import axios from "axios";
import { get } from "https";
import { useEffect, useState } from "react";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export default function data(query: string) {
  const [content, setContent] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const q = await fetch(
          `https://newsapi.org/v2/everything?q=${query}&sortBy=publishedAt&apiKey=${API_KEY}`,
          {
            next: { revalidate: 10000 },
          }
        );
        const res = await q.json();
        console.log(res);
        setContent(res.articles);
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error; // Propagate the error further
      }
    };
    getData();
  }, []);
  return { content };
}

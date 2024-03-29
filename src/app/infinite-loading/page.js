"use client";

import { useEffect, useState } from "react";
import { useRef } from "react";

import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";

import { useIntersection } from "@mantine/hooks";

import ListOfPosts from "../components/ListOfPosts";
import SinglePost from "../components/SinglePost";
import Loader from "../components/Loader";
import ErrorMsg from "../components/ErrorMsg";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const queryClient = useQueryClient();

  const getPosts = async (page = 1) => {
    try {
      setLoading(true);

      const response = await fetch("/api/get-infinite", {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const res = await response.json();
      // console.log(res[3].id);
      setLoading(false);
      setErrorMsg("");
      return res;
    } catch (error) {
      setLoading(false);
      setErrorMsg("Something went wrong");
      console.error("Error fetching data:", error);
    }
  };

  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["query"],
    queryFn: ({ pageParam }) => getPosts(pageParam),

    getNextPageParam: (lastPage, pages) => {
      return pages.length + 1;
      // return lastPage.length > 0 ? pages.length + 1 : undefined;
    },
    initialData: { pages: [], pageParams: [1] },
  });

  useEffect(() => {
    // Fetch initial data only once
    if (data.pages.length === 0) {
      getPosts(1);
    }
  }, []);

  // stuff to infinite loading
  const lastPostRef = useRef(null);
  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  });

  useEffect(() => {
    if (entry && entry.isIntersecting) {
      fetchNextPage();
    }
  }, [entry]);

  const _posts = data?.pages.flatMap((page) => page);

  return (
    <main className="min-h-screen bg-slate-50 pb-10">
      <ListOfPosts />
      {/* LOADER */}
      {loading && <Loader />}
      {/* ERROR */}
      {!loading && errorMsg && (
        <ErrorMsg errorMsg={errorMsg} getPosts={getPosts} />
      )}
      {/* POSTS */}
      {!loading &&
        !errorMsg &&
        _posts.map((post, i) => {
          if (i === _posts.length) {
            return (
              <SinglePost
                ref={ref}
                key={post.id}
                title={post.title}
                body={post.body}
              />
            );
          } else {
            return (
              <SinglePost key={post.id} title={post.title} body={post.body} />
            );
          }
        })}
      {!loading && !errorMsg && (
        <div className="flex items-center justify-center">
          <button
            className="btn focus:text-slate-50 active:focus:text-slate-50"
            disabled={isFetchingNextPage}
          >
            {_posts.length === 100 ? "Nothing more to load" : "Loading..."}
          </button>
        </div>
      )}
    </main>
  );
}

"use client";

import { useEffect } from "react";

import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";

import ListOfPosts from "./components/ListOfPosts";
import SinglePost from "./components/SinglePost";

export default function Home() {
  const queryClient = useQueryClient();

  const getPosts = async (page = 1) => {
    try {
      const response = await fetch("/api/posts?page=" + page, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const res = await response.json();
      // console.log(res[3].id);
      return res;
    } catch (error) {
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

  return (
    <main className="min-h-screen bg-slate-50 pb-10">
      <ListOfPosts />
      {data.pages &&
        data.pages.map((page, i) => {
          return (
            <div key={i}>
              {page &&
                page.map((post) => {
                  return (
                    <SinglePost
                      key={post.id}
                      title={post.title}
                      body={post.body}
                    />
                  );
                })}
            </div>
          );
        })}
      <div className="flex items-center justify-center disabled:text-slate-50">
        <button
          className="btn"
          onClick={() => {
            fetchNextPage();
          }}
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage
            ? "Loading more..."
            : (data.pages.length ?? 0) < 25
            ? "Load more"
            : "Nothing more to load"}
        </button>
      </div>
    </main>
  );
}

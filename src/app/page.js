"use client";

import { useEffect, useState } from "react";

import { useInfiniteQuery } from "@tanstack/react-query";

import ListOfPosts from "./components/ListOfPosts";
import SinglePost from "./components/SinglePost";

// const getPosts = async (page) => {
//   const response = await fetch("/api/posts", {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

//   const data = await response.json();
//   console.log(data);

//   const postList = data.slice((page - 1) * 2, page * 4); // 4 - number of how many posts at the one time
//   console.log(postList);

//   return postList;
// };

// useEffect(() => {
//   getPosts();
// }, []);

export default function Home() {
  const [listPosts, setListPosts] = useState([]);

  const getPosts = async (page) => {
    const response = await fetch("/api/posts", {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log(data);

    setListPosts(data);
  };

  const fetchPost = async (page) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return listPosts.slice((page - 1) * 2, page * 4); // 4 - number of how many posts at the one time
  };

  useEffect(() => {
    getPosts();
  }, []);

  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["query"],

    queryFn: async ({ pageParam = 1 }) => {
      const response = await fetchPost(pageParam);
      return response;
    },

    getNextPageParam: (_, pages) => {
      return pages.length + 1;
    },
    initialData: {
      pages: [listPosts?.slice(0, 4)],
      pageParams: [1],
    },
  });

  return (
    <main className="min-h-screen bg-slate-50 pb-10">
      <ListOfPosts />
      {data.pages &&
        data.pages.map((page, i) => {
          return (
            <div key={i}>
              {page.map((post) => {
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
      <div className="flex items-center justify-center">
        <button
          className="btn"
          onClick={() => fetchNextPage()}
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

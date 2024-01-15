"use client";

import { useEffect, useState } from "react";

import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";

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
  const [currentPage, setCurrentPage] = useState(1);
  const queryClient = useQueryClient();
  // const [initVal, setInitVal] = useState([]);

  const getPosts = async (page = 1) => {
    console.log(page);
    console.log(
      "--------------------------------------------------------------------",
      currentPage
    );
    // const response = await fetch("/api/posts", {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });

    // const res = await response.json();
    // console.log(res);

    // console.log(res.slice(0, 4));

    // setInitVal(res.slice(0, 4));

    // setListPosts(res);

    // listPosts.slice((page - 1) * 4, page * 4)

    // console.log("blaaaaaaaaaaa");
    // console.log(res.slice((page - 1) * 4, page * 4));

    // setListPosts(res.slice((page - 1) * 4, page * 4));

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
      console.log(res[3].id);
      return res;

      // const slicedPosts = res.slice((page - 1) * 4, page * 4);

      //   setListPosts((prevListPosts) => {
      //   if (page === 1) {
      //     // Jeśli to pierwsza strona, zastąp poprzednią listę nową listą
      //     return slicedPosts;
      //   } else {
      //     // Jeśli to kolejna strona, dołącz nowe posty do poprzedniej listy
      //     return [...prevListPosts, ...slicedPosts];
      //   }
      // });

      // if (listPosts.length === 0) {
      //   setListPosts(slicedPosts);
      // } else if (listPosts.length > 0) {
      //   console.log(data);
      //   setListPosts((prevListPosts) => [...prevListPosts, ...slicedPosts]);
      // }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // const fetchPost = async (page) => {
  //   await new Promise((resolve) => setTimeout(resolve, 1000));
  //   return listPosts.slice((page - 1) * 4, page * 4); // 4 - number of how many posts at the one time
  // };

  // useEffect(() => {
  //   getPosts(1);
  // console.log(initVal);
  // }, []);

  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    {
      queryKey: ["query"],
      queryFn: ({ pageParam }) => getPosts(pageParam),

      getNextPageParam: (lastPage, pages) => {
        return pages.length + 1;
        // return lastPage.length > 0 ? pages.length + 1 : undefined;
      },
      initialData: { pages: [], pageParams: [1] },
    }
    //   {
    //   queryKey: ["query"],

    //   queryFn: async ({ pageParam = 1 }) => {
    //     await getPosts(pageParam);
    //   },

    //   getNextPageParam: (_, pages) => {
    //     return pages.length + 1;
    //   },
    //   initialData: {
    //     pages: [listPosts],
    //     pageParams: [1],
    //   },
    // }
  );

  // useEffect(() => {
  //   // Fetch initial data
  //   getPosts(1);
  //   console.log(data.pages);
  // }, []);

  // useEffect(() => {
  //   // Update data in query client
  //   queryClient.setQueryData(["query"], {
  //     pages: [listPosts],
  //     pageParams: [1],
  //   });
  // }, [listPosts, queryClient]);

  // useEffect(() => {
  //   console.log(data.pages);
  //   console.log(listPosts);
  //   console.log(data);
  // }, [data.pages]);

  useEffect(() => {
    // Fetch initial data only once
    if (data.pages.length === 0) {
      getPosts(1);
    }
  }, []);

  // useEffect(() => {
  //   // Update data in query client
  //   // queryClient.setQueryData(["query"], {
  //   //   pages: [listPosts],
  //   //   pageParams: [{ page: currentPage }],
  //   // });

  //   // console.log(listPosts);

  //   if (data.pages.length === 1) {
  //     queryClient.setQueryData(["query"], {
  //       pages: [listPosts],
  //       pageParams: [{ page: 1 }],
  //     });

  //     console.log(listPosts);
  //   } else if (data.pages.length > 1) {
  //     // queryClient.setQueryData(["query"], {
  //     //   pages: [listPosts],
  //     //   pageParams: [{ page: currentPage }],
  //     // });

  //     const currentPageData = data.pages[data.pages.length - 2];
  //     queryClient.setQueryData(["query"], {
  //       pages: [currentPageData],
  //       pageParams: [{ page: currentPageData.page }],
  //     });

  //     console.log(listPosts);
  //   }
  // }, [listPosts, currentPage, data.pages.length, queryClient]);
  // //   queryClient.setPages((pages) => {
  // //     return [...pages, listPosts];
  // //   });
  // // }, [listPosts, queryClient]);

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
            setCurrentPage((prev) => prev + 1);
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

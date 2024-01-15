"use client";

// import { useEffect, useState } from "react";

import { useInfiniteQuery } from "@tanstack/react-query";

import SinglePost from "./SinglePost";

const ListOfPosts = () => {
  // const [posts, setPosts] = useState();

  // const getPosts = async (page) => {
  //   const response = await fetch("/api/posts", {
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });

  //   const data = await response.json();

  //   const postList = data.slice((page - 1) * 2, page * 4) // 4 - number of how many posts at the one time

  //   setPosts(postList);
  //   console.log(data);
  // };

  // useEffect(() => {
  //   getPosts();
  // }, []);

  return (
    <section className="pt-32 pb-4">
      <div className="w-[90%] mx-auto text-center ">
        <h1 className="font-bold text-3xl">Welcome to the World News!</h1>
        <h2 className="font-medium text-2xl py-6">
          Here you will find the latest news from around the world
        </h2>
      </div>
      {/* <div className="lg:grid lg:grid-cols-2 lg:gap-2 lg:w-[90%] lg:mx-auto xl:w-[85%]">
        {posts &&
          posts.map((post) => {
            return (
              <SinglePost key={post.id} title={post.title} body={post.body} />
            );
          })}
      </div> */}
    </section>
  );
};

export default ListOfPosts;

"use client";

// import { useEffect, useState } from "react";

import SinglePost from "./SinglePost";

const ListOfPosts = () => {
  return (
    <section className="min-h-screen pt-32 pb-10">
      <div className="w-[90%] mx-auto text-center ">
        <h1 className="font-bold text-3xl">Welcome to the World News!</h1>
        <h2 className="font-medium text-2xl py-6">
          Here you will find the latest news from around the world
        </h2>
      </div>
      <div className="lg:grid lg:grid-cols-3 lg:gap-2 lg:w-[90%] lg:mx-auto xl:w-[85%]">
        <SinglePost />
        <SinglePost />
        <SinglePost />
        <SinglePost />
        <SinglePost />
        <SinglePost />
      </div>
    </section>
  );
};

export default ListOfPosts;

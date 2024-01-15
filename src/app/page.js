"use client";

import Link from "next/link";

import ListOfPosts from "./components/ListOfPosts";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 pb-10">
      <ListOfPosts />
      <div className="w-[90%] lg:w-[70%] mx-auto flex flex-col lg:flex-row items-center justify-center lg:justify-around">
        <Link href="/simple-loading" className="btn btn-wide btn-primary my-10">
          Simple loading
        </Link>
        <Link href="/infinite-loading" className="btn btn-wide btn-accent">
          Infinite loading
        </Link>
      </div>
    </main>
  );
}

"use client";

import Link from "next/link";

import { FaRegNewspaper } from "react-icons/fa";

const Navbar = () => {
  const clickHandler = () => {
    const elem = document.activeElement;
    if (elem) {
      elem?.blur();
    }
  };

  return (
    <>
      <div className="navbar fixed bg-base-300 z-50">
        {/* LOGO */}
        <div className="flex-1">
          <Link href="/" className="btn btn-ghost text-xl">
            <FaRegNewspaper size={30} />
            World News
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1 font-medium">
            <li onClick={clickHandler}>
              <Link href="/simple-loading" className="focus:text-slate-50">
                Simple
              </Link>
            </li>
            <li onClick={clickHandler}>
              <Link href="/infinite-loading" className="focus:text-slate-50">
                Infinite
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;

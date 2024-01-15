import Link from "next/link";

import { FaRegNewspaper } from "react-icons/fa";

const Navbar = () => {
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
      </div>
    </>
  );
};

export default Navbar;

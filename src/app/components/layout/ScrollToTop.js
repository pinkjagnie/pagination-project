"use client";

import { useState, useEffect } from "react";
import { FaAngleUp } from "react-icons/fa";

const ScrollToTop = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    });
  }, []);

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      {showTopBtn && (
        <FaAngleUp
          size={40}
          className="btn btn-circle btn-info fixed right-8 bottom-20 lg:bottom-12 z-50 cursor-pointer text-slate-100"
          onClick={goToTop}
        />
      )}
    </div>
  );
};

export default ScrollToTop;

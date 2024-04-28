import React from "react";
import Link from "next/link";

const Header = () => (
  <div className="bg-white shadow-lg p-4 md:p-6 flex justify-center">
    <div className="container max-w-[900px] flex flex-wrap mx-auto">
      <Link href="/">
        <div className="text-xl md:text-2xl font-semibold">
          Jobs Portal
        </div>
      </Link>
    </div>
  </div>
);

export default Header;
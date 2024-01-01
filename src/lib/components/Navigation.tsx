import Link from "next/link";
import type { FC } from "react";

export const Navigation: FC = () => {
  return (
    <nav className="flex w-full text-nowrap overflow-auto text-sm text-white px-4 py-3 bg-black">
      <Link href="/" className="text-white">
        Home
      </Link>
      <div className="text-gray-500 mx-3">|</div>
      <Link href="/secure-page" className="text-white">
        Secure Page
      </Link>
      <div className="text-gray-500 mx-3">|</div>
      <Link href="/api/secure-me" className="text-white" target="_blank">
        Secure Me API
      </Link>
      <div className="text-gray-500 mx-3">|</div>
      <Link href="/api/secure-users" className="text-white" target="_blank">
        Secure Users API
      </Link>
    </nav>
  );
};

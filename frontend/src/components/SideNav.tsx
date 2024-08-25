"use client";
import {
  House,
  NotebookPen,
  Info,
  CircleUserRound,
  Siren,
  FileChartPie,
  LogIn,
} from "lucide-react";
import Icon_Logo from "../../public/Icon_Logo.svg";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";


function SideNav() {
  const pathname = usePathname();
  console.log(pathname);

  const activeClassNames =
    "w-full flex flex-col text-center items-center justify-center h-[60px]\
    bg-indigo-100 rounded-[15px] shadow text-xs text-slate-500";
  const inactiveClassNames =
    "w-full flex flex-col text-center items-center justify-center h-[60px]\
    text-xs text-slate-500 hover:bg-indigo-50 rounded-[15px] hover:shadow";

  const links = [
    { href: "/", label: "Home" },
    { href: "/logs", label: "Logs" },
    { href: "/insights", label: "Insights" },
    { href: "/alerts", label: "Alerts" },
    { href: "/about", label: "About" },
    { href: "/profile", label: "Profile" },
  ];

  return (
    <nav className="flex flex-col h-full justify-between">
      {/* Logo */}
      <div className="flex flex-col items-center justify-center  pt-3 pb-3 gap-1">
        <Image src={Icon_Logo} alt="Logo" width={40} height={40} />
        <hr className="w-[90%] border-0 h-0.5 bg-slate-400 shadow-2xl" />
      </div>

      {/* Navigation */}
      <div className="self-center w-full flex flex-col space-y-2">
        <Link
          href="/"
          className={pathname === "/" ? activeClassNames : inactiveClassNames}
        >
          <House className="stroke-slate-500 stroke-1 " />

          <span>Home</span>
        </Link>

        <Link
          href="/logs"
          className={pathname === "/logs" ? activeClassNames : inactiveClassNames}
        >
          <NotebookPen className="stroke-slate-500 stroke-1 " />
          <span>Logs</span>
        </Link>

        <Link
          href="/insights"
          className={pathname === "/insights" ? activeClassNames : inactiveClassNames}
        >
          <FileChartPie className="stroke-slate-500 stroke-1 " />
          <span>Insights</span>
        </Link>

        <Link
          href="/alerts"
          className={pathname === "/alerts" ? activeClassNames : inactiveClassNames}
        >
          <Siren className="stroke-slate-500 stroke-1 " />

          <span>Alerts</span>
        </Link>

        <Link
          href="/about"
          className={pathname === "/about" ? activeClassNames : inactiveClassNames}
        >
          <Info className="stroke-slate-500 stroke-1 " />

          <span>About</span>
        </Link>
      </div>

      {/* Nav Footer */}
      <div className="pt-2 pb-2 flex flex-col items-center justify-center space-y-1">
        <hr className="w-[90%] border-0 h-0.5 bg-slate-400 shadow" />
        <Link
          href="/profile"
          className={pathname === "/profile" ? activeClassNames : inactiveClassNames}
        >
          <CircleUserRound className="stroke-slate-500 stroke-1 " />

          <span>Profile</span>
        </Link>

        <Link
          href="/logout"
          className="w-full flex flex-col text-center items-center justify-center h-[50px]
                     text-xs text-slate-500 hover:bg-indigo-50 rounded-[15px] hover:shadow"
        >
          <LogIn className="stroke-slate-500 stroke-1 " />
          <span>Logout</span>
        </Link>
      </div>
    </nav>
  );
}

export default SideNav;

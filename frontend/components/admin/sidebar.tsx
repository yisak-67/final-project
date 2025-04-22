import { adminNavLinks } from "@/constants";
import Link from "next/link";
import { useRef } from "react";
import { BiLogOut } from "react-icons/bi";
import { useOnClickOutside } from "usehooks-ts";
type Props = {
  open: boolean;
  setOpen(open: boolean): void;
};

const SideBar = ({ open, setOpen }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, (e) => {
    setOpen(false);
  });
  return (
    <div
      id="logo-sidebar"
      className={`z-40 w-64 h-screen pt-20 transition-transform  bg-red border-r border-gray-200 sm:translate-x-0
     dark:bg-gray-800 dark:border-gray-700 ${open && "-translate-x-full"}`}
      ref={ref}
    >
      <div className="fixed top-0 , left-0 h-full flex flex-col justify-between px-3 pb-4 overflow-y-auto bg-red dark:bg-gray-800">
        <ul className="space-y-2 font-medium">
          {adminNavLinks.map(({ name, link, icon }, index) => (
            <li key={`${name} ${index}`}>
              <Link
                href={link}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {icon}
                <span className="ml-3">{name}</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="border-t border-t-indigo-800 p-4">
          <button
            onClick={() => {}}
            className="flex gap-4 items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <BiLogOut />
            <span>Log Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SideBar;

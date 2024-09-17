import { UserProps } from "@/types";
import { ChakraProvider, Switch } from "@chakra-ui/react";
import { signOut } from "next-auth/react";
import { FaCircleUser } from "react-icons/fa6";
import { MdOutlineLogout } from "react-icons/md";

const Menu = ({
    user,
    isOpen,
    darkMode,
    setDarkMode
} : {
    user: UserProps | undefined
    isOpen: boolean
    darkMode: boolean
    setDarkMode: () => void
}) => {

  const handleSignOutClick = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <ChakraProvider>
      <div className={`${isOpen ? "translate-y-[370px]" : ""} transition-all duration-[300ms] rounded-sm fixed right-2.5 top-[-300px] flex flex-col items-start h-fit w-fit min-w-[170px] bg-white p-3 z-[1000] `}>
        <div className="flex flex-col items-center w-full p-2 pb-4 pt-2 gap-3"> 
          {user?.image
            ? <img 
                src={user?.image} 
                alt={`profile image`} 
                height={55}
                width={55}
                className="rounded-full"
              />
            : <FaCircleUser size={40} />
          }
          <div className="flex flex-col items-center">
            <p className="font-semibold">{user?.name}</p>
            <p>{user?.email}</p>
          </div>
        </div>
        <button className="py-3 px-2 w-full flex flex-row items-center justify-between border-y border-gray-300">
          Dark Mode
          <Switch size={"md"} className="outline-none" colorScheme="blue" onChange={setDarkMode} isChecked={darkMode} />
        </button>
        <button
          className="py-3 px-2 flex flex-row items-center gap-2 w-full active:bg-gray-100"
          onClick={handleSignOutClick}
        >
          <MdOutlineLogout size={20} />
          Sign Out
        </button>
      </div>
    </ChakraProvider>
  );
};

export default Menu;


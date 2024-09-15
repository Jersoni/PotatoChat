import { ChakraProvider, Switch } from "@chakra-ui/react";
import { MdOutlineLogout } from "react-icons/md";
import { signOut } from "next-auth/react";

const Menu = ({
    isOpen,
    darkMode,
    setDarkMode
} : {
    isOpen: boolean
    darkMode: boolean
    setDarkMode: () => void
}) => {

  const handleSignOutClick = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <ChakraProvider>
      <div className={`${isOpen ? "translate-y-[155%]" : ""} transition-all rounded-sm fixed right-2 top-[-100px] flex flex-col items-start h-fitw-fit bg-white p-2 z-[1000] `}>
        <button className="py-3 px-2 flex flex-row items-center gap-3 border-b border-gray-300">
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

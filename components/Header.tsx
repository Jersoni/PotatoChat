'use client'
import { UserProps } from "@/types";
import { FaCircleUser } from "react-icons/fa6";

const Header = ({
    user,
    darkMode,
    setDarkMode
} : {
    user?: UserProps
    darkMode: boolean
    setDarkMode: () => void
}) => {
    return (
        <div className='p-3 flex flex-row gap-3 w-full fixed bg-[#efe6ee] bg-opacity-10 backdrop-blur-md items-center'>
            <FaCircleUser size={40} />
            <div className="flex flex-col">
                <h1 className='font-semibold'>{user?.username}</h1>
                <h6 className='text-sm text-opacity-40'>{user?.fullname}</h6>
            </div>
            <button className="ml-auto" onClick={setDarkMode}>{darkMode ? 'dark' : 'light'}</button>
        </div>
    )
}

export default Header
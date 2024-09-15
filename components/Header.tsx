'use client'
import { UserProps } from "@/types";
import { FaCircleUser } from "react-icons/fa6";
import { HiMenuAlt4 } from "react-icons/hi";
import Menu from "./Menu";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const Header = ({
    user,
    darkMode,
    setDarkMode
} : {
    user?: UserProps
    darkMode: boolean
    setDarkMode: () => void
}) => {

    const { data: session, status } = useSession()
    const [ isMenuOpen, setIsMenuOpen ] = useState(false)

    useEffect(() => {
        if (session) console.log(session)
    }, [session])

    return (
        <div className="fixed top-0 left-0 right-0">
            <div className={`${darkMode ? "bg-[#30343b]" : ""} p-3 flex flex-row gap-3 w-full bg-white items-center z-[1500] bg-opacity-80 backdrop-blur-md relative`}>
                <FaCircleUser size={40} />
                <div className={`${darkMode ? "text-gray-400" : ""} flex flex-col`}>
                    <h1 className='font-semibold'>{user?.username}</h1>
                    <h6 className='text-sm text-opacity-40'>{user?.fullname}</h6>
                </div>
                <button 
                    className="p-1.5 rounded-full ml-auto"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <HiMenuAlt4 size={30} className="" />
                </button>
                {/* <button className="ml-auto" onClick={setDarkMode}>{darkMode ? 'dark' : 'light'}</button>
                <button
                onClick={handleSignOutClick}
                >Sign out</button> */}
            </div>
            <Menu 
                isOpen={isMenuOpen} 
                darkMode={darkMode} 
                setDarkMode={setDarkMode} 
            />
            <div 
                className={`${isMenuOpen ? "" : "hidden"} fixed top-0 bg-black opacity-20 h-[100vh] w-full z-[500]`}
                onClick={() => {setIsMenuOpen(false)}}
            ></div>
        </div>
    )
}

export default Header
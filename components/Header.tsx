'use client'
import { UserProps } from "@/types";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { FaCircleUser } from "react-icons/fa6";
import { HiMenuAlt4 } from "react-icons/hi";
import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";
import Menu from "./Menu";

const Header = ({
    user,
    recipient,
    darkMode,
    setDarkMode
} : {
    user?: UserProps
    recipient?: UserProps
    darkMode: boolean
    setDarkMode: () => void
}) => {

    // router
    const router = useRouter()

    // session
    const { data: session, status } = useSession()

    // menu UI
    const [ isMenuOpen, setIsMenuOpen ] = useState(false)

    
    useEffect(() => {
        if (session) {
            console.log(session)
        }
    }, [session])

    return (
        <div className="fixed top-0 left-0 right-0">
            <div className={`${darkMode ? "bg-[#30343b]" : ""} p-2 pl-0 flex flex-row w-full bg-white items-center z-[1500] relative`}>
                <button className={`p-3`} onClick={() => { router.push('/chats') }}>
                    <IoIosArrowBack size={20} />
                </button>
                {recipient?.image
                    ? <img
                        src={recipient.image}
                        alt={"User profile"}
                        height={40}
                        width={40}
                        className={`rounded-full`} />
                    : <FaCircleUser size={40} />
                }
                <div className={`${darkMode ? "text-gray-400" : ""} flex flex-col ml-2`}>
                    <h1 className='font-semibold'>{recipient?.name}</h1>
                    <h6 className='text-sm text-opacity-40'>{recipient?.email}</h6>
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
                user={user}
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
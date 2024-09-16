'use client'
import supabase from "@/lib/supabaseClient";
import { UserProps } from "@/types";
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { HiMenuAlt4 } from "react-icons/hi";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { FaCircleUser } from "react-icons/fa6";
import { Menu } from "@/components";

const Inbox = () => {

  const router = useRouter()

  // session, user, and contacts
  const { data: session, status } = useSession()
  const [user, setUser] = useState<UserProps>();
  const [ contacts, setContacts ] = useState<UserProps[]>([])

  useEffect(() => {
    console.log(session)
  }, [session])

  // get user data
  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("email", session?.user?.email);

      if (error) {
        console.log(error);
      } else {
        console.log('get user data: ')
        console.log(data)

        // if user is found in database
        if (data.length > 0) {
          console.log('set user data: ')
          setUser({...data[0], ...session?.user})
        } else { // if no user found
          
          const { data: signupResult, error: signupError } = await supabase
            .from('users')
            .insert({ 
              name: session?.user?.name, 
              email: session?.user?.email,
              image: session?.user?.image
            })
          
          if (signupError) {
            console.log(signupError)
          } else {
            console.log('user created: ')
            console.log(signupResult)
          }
        }
      }
    };

    if (session?.user?.email) {
      fetchUser();
    }
  }, [session]);

  // get all contacts 
  useEffect(() => {
    console.log(user)
    const fetchUser = async () => {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .not('id', 'eq', user?.id)

      if (error) {
        console.log(error);
      } else {
        console.log('get all contacts: ')
        console.log(data)
        setContacts(data)
      }
    };

    if (user?.id) {
      fetchUser()
    }
  }, [user])

  // update user data
  useEffect(() => {
    if (user) {
      const updateUser = async () => {
        const { data, error } = await supabase
          .from('users')
          .update({
            image: user.image,
            name: user.name
          }).eq('id', user?.id)

          if (error) {
            console.log(error)
          } else {
            console.log('update successful: ')
          }
      }

      updateUser()
    }
    // console.log(user)
  }, [user])

  // menu UI
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  return (
    <div className="w-full h-[100vh] bg-[#1e1e1e]">

      {/* header */}
      <div className="w-full py-4 flex flex-row items-center bg-neutral-900 z-[1500]">
        <h1 className="text-center text-gray-200 font-semibold text-xl w-full">Chats</h1>
        <button
          className="p-1.5 rounded-full ml-auto absolute right-2"
          onClick={() => {}}
        >
          <HiMenuAlt4 
            onClick={handleMenu}
            size={30} 
            className="fill-gray-200" 
          />
        </button>
      </div>
      <Menu 
        user={user} 
        isOpen={menuOpen} 
        darkMode={darkMode}
        setDarkMode={() => setDarkMode(!darkMode)}
      />
      <div 
          className={`${menuOpen ? "" : "hidden"} fixed top-0 bg-black opacity-20 h-[100vh] w-full z-[500]`}
          onClick={() => {setMenuOpen(false)}}
      ></div>

      {/* chats */}
      <div className="p-5 pt-0 flex flex-col gap-6">

        {contacts.map(contact => {
          return (
            <div 
              onClick={() => router.push(`/chats/${contact.id}`)}
              className="w-full flex flex-row items-center gap-3"
              key={contact.id}
            >
              <FaCircleUser size={44} className="fill-gray-400" />
              {/* user image */}
              {contact.image !== null
                ? <img src={contact.image} alt="user profile" className="rounded-full h-11 " />
                : <FaCircleUser size={44} className="fill-gray-400" />
              }
              {/* user info */}
              <div>
                <h1 className="text-gray-200 font-bold">{contact.fullname}</h1>
                <p className="text-gray-400 text-sm">{contact.email}</p>
              </div>
              <MdOutlineKeyboardArrowRight size={20} className="fill-gray-400 ml-auto" />
            </div>
          )
        })}

        {/* user 1 */}
        {/* <div 
          onClick={() => router.push('/chats/1')}
          className="w-full flex flex-row items-center gap-3"
        >
          <FaCircleUser size={44} className="fill-gray-400" />
          <div>
            <h1 className="text-gray-200 font-bold">John Doe</h1>
            <p className="text-gray-400 text-sm">Last seen 2 minutes ago</p>
          </div>
          <MdOutlineKeyboardArrowRight size={20} className="fill-gray-400 ml-auto" />
        </div> */}
      
      </div>

    </div>
  );
};

export default Inbox;
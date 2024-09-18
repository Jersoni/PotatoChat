import { ChangeEvent, FormEvent } from "react";
import { IoSend } from "react-icons/io5";

const Messagebox = ({
    message,
    onChange,
    onSubmit
} : {
    message: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    onSubmit: (e: FormEvent<HTMLFormElement>) => void
}) => {
  return (
    <div className={`p-3 pb-6 px-4 w-full fixed bottom-0 bg-white`}>
        <form 
            action=""
            onSubmit={e => {
                onSubmit(e)
            }} 
            className='flex rounded-full p-1.5 bg-gray-200'
        >
            <input 
                type="text" 
                className='px-3 w-full outline-none rounded-full bg-transparent' 
                placeholder="Aa"
                onChange={onChange}
                value={message}
            />

            <button 
                type="submit"
                className=" rounded-full p-1"
            >
                <IoSend 
                    size={20}
                    className="fill-gray-800" 
                />
            </button>
        </form>
    </div>
  )
}

export default Messagebox
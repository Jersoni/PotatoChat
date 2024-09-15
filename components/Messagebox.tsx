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
    <div className={`p-2 pb-6 w-full fixed bottom-0 border bg-[#272e38]`}>
        <form 
            action=""
            onSubmit={e => {
                onSubmit(e)
            }} 
            className='flex'
        >
            <input 
                type="text" 
                className='p-1 px-3 w-full outline-none' 
                placeholder="Aa" 
                onChange={onChange}
                value={message}
            />

            <button 
                type="submit" 
                className='p-2 bg-gray-400 '
            >
                <IoSend 
                    size={22}
                    fill={''} />
            </button>
        </form>
    </div>
  )
}

export default Messagebox
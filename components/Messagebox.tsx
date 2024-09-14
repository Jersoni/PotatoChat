import { ChangeEvent } from "react";
import { IoSend } from "react-icons/io5";

const Messagebox = ({
    message,
    onChange,
    onSubmit
} : {
    message: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    onSubmit: () => void
}) => {
  return (
    <div className='p-3 pb-6'>
        <form 
            action="" 
            onSubmit={onSubmit} 
            className='flex gap-2'
        >
            <input 
                type="text" 
                className='p-1 px-3 rounded-full w-full outline-none' 
                placeholder="Aa" 
                onChange={onChange}
                value={message}
            />

            <button 
                type="submit" 
                className='p-1 rounded-full'
            >
                <IoSend 
                    size={24}
                    fill="" />
            </button>
        </form>
    </div>
  )
}

export default Messagebox
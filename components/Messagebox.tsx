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
    <div className={`p-3 pb-6 w-full fixed bottom-0 border bg-[#27292b]`}>
        <form 
            action=""
            onSubmit={e => {
                onSubmit(e)
            }} 
            className='flex gap-3'
        >
            <input 
                type="text" 
                className='p-1 px-3 w-full outline-none rounded-full' 
                placeholder="Aa" 
                onChange={onChange}
                value={message}
            />

            <button type="submit">
                <IoSend 
                    size={24}
                    fill={'gray'} 
                />
            </button>
        </form>
    </div>
  )
}

export default Messagebox
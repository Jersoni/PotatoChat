export interface UserProps {
    id: number
    username: string
    fullname: string
    email: string
    image: string
}
  
export interface MessageProps {
    id: number
    createdAt: string
    message: string
    sender_id: number
    reciever_id: number
}
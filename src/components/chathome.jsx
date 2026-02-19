import { useEffect, useState } from "react"
import Swal from "sweetalert2"
import { loginApi } from "../http/axios"
import { Link } from "react-router"

export default function ChatHome () {
  const [chats, setChats] = useState([])

  async function fetchChats() {
    try {
      const response = await loginApi({
        method: 'GET',
        url: '/mycharacter',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      })
      setChats(response.data.data)
      console.log(response.data)
    }
    catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Fetching chats error!',
        text: error.response?.data?.message
      })
    }
  }

  useEffect(() => {
    fetchChats()
  }, [])

  useEffect(() => {
    console.log(chats)
  }, [chats])
  return (
    <>
      <div
        className="w-full h-full flex-col justify-center items-center overflow-y-auto"
      >

        {chats.length > 0 ? chats.map((e) => (
          <div
            key={e.id}
            className="p-4 border-b border-gray-200 text-white"
          >
            <Link to={`chat/${e.id}`} className="text-lg font-semibold">Chat id: {e.id}</Link>
          </div>
        )) : (
          <p className="text-center text-white">No chats available</p>
        )}

        <div className="flex justify-center items-end p-10">
          <Link to={`chat/new`}
            className="bg-white text-black outline-1 p-2 rounded-2xl hover:bg-slate-900 hover:text-white transition-colors duration-300"
          >Add new chat!</Link>
        </div>
      </div>
    </>
  )
}
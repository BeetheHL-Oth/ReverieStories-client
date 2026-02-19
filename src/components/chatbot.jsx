import { useEffect, useState } from "react"
import Swal from "sweetalert2"
import { loginApi } from "../http/axios"
import { Link, useParams } from "react-router"

export default function Chatbot () {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')

  const {storyId, chatId} = useParams()  

  async function fetchMessages() {
    try {
      const response = await loginApi({
        method: 'GET',
        url: '/mycharacter/' + chatId,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      })
      setMessages(response.data.data.Messages)
    }
    catch (error) {
      console.log(error)
      Swal.fire({
        icon: 'error',
        title: 'Fetching messages error!',
        text: error.response?.data?.message
      })
    }
  }

  async function submit (event) {
    event.preventDefault()
    try {
      const response = await loginApi({
        method: 'POST',
        url: '/mycharacter/chat/' + chatId,
        data: {
          message: input
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      })
      setInput('')
      fetchMessages()
    }
    catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Sending message error!',
        text: error.response?.data?.message
      })
    }
  }

  useEffect(() => {
    fetchMessages()
  }, [])

  useEffect(() => {
    console.log(messages)
  }, [messages])

  return (
    <>
    <div className="flex flex-col ">
    <Link to={"/mystories/" + storyId + '/addchapter'} className="text-sky-300">Back to chats</Link>

      <div
        className="w-full h-full flex flex-col justify-between"
      >
        <div
          className="m-3 flex flex-col overflow-y-auto"
          >

            {messages?.length > 0 ? messages.map((e) => (
              <div
                key={e.id}
                className={e.role === 'user' ? "p-2 mb-2 bg-gray-100 self-end rounded ml-5 mr-2" : "p-2 mb-2 bg-blue-100 rounded mr-5"}
              >
                {e.content}
              </div>
            )) : (
              <p className="text-white">No messages yet.</p>
            )}


          </div>

          <form onSubmit={submit}
            className="p-4 flex gap-2 justify-center items-center">
            <input type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full bg-white text-black p-2 border rounded"
              />

              <button type="submit" className="bg-blue-500 text-white p-2 rounded">Send</button>
          </form>

        </div>
    </div>
      </>
    )
}
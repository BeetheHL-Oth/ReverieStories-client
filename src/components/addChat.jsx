import { useState } from "react"
import Swal from "sweetalert2"
import { loginApi } from "../http/axios"
import { Link, useNavigate, useParams } from "react-router"

export default function AddChat () {
  const [chatSettings, setChatSettings] = useState({
    characterDescription: '',
    firstMessage: ''
  })

  const reroute = useNavigate()
  const {storyId} = useParams()

  async function submit (event) {
    event.preventDefault()
    try {
      const response = await loginApi({
        method: 'POST',
        url: '/mycharacter/chat',
        data: {
          characterDescription: chatSettings.characterDescription,
          message: chatSettings.firstMessage
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      })
      Swal.fire({
        icon: 'success',
        title: 'Chat added successfully!'
      })
      console.log(response)

      reroute(`/mystories/${storyId}/addchapter`)

    }
    catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Adding chat error!',
        text: error.response?.data?.message
      })
    }
  }
  return (
    <>
      <form 
        className="p-4 rounded w-full max-w-lg mx-auto mt-10 text-white flex flex-col gap-4"
        onSubmit={submit}
        >
        <h1
          className="text-center text-2xl font-bold"
        >New Chat</h1>

        <label htmlFor="characterDescription">
          Character Description:
        </label>

        <textarea
          id="characterDescription"
          value={chatSettings.characterDescription}
          onChange={(e) => setChatSettings({...chatSettings, characterDescription: e.target.value})}
          className="w-full p-2 border border-gray-300 rounded mb-4 h-1/3"
        />

        <label htmlFor="firstMessage">
          First Message:
        </label>

        <textarea
          id="firstMessage"
          value={chatSettings.firstMessage}
          onChange={(e) => setChatSettings({...chatSettings, firstMessage: e.target.value})}
          className="w-full p-2 border border-gray-300 rounded mb-4 h-1/3"
        />
        <br />

        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded self-center">
          Submit
        </button>

        <Link to={`/mystories/${storyId}/addchapter`} className="text-center text-blue-200 hover:underline">
          Return to Chatbot Home
        </Link>

      </form>
    </>
  )
}
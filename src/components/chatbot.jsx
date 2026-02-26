import { useEffect, useRef, useState } from "react"
import Swal from "sweetalert2"
import { loginApi } from "../http/axios"
import { Link, useParams } from "react-router"

export default function Chatbot () {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [playingMessageId, setPlayingMessageId] = useState(null)
  const [loadingMessageId, setLoadingMessageId] = useState(null)
  const audioRef = useRef(null)
  const audioUrlRef = useRef(null)

  const {storyId, chatId} = useParams()  

  function clearCurrentAudio() {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current = null
    }
    if (audioUrlRef.current) {
      URL.revokeObjectURL(audioUrlRef.current)
      audioUrlRef.current = null
    }
    setPlayingMessageId(null)
  }

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

  async function speakMessage(message) {
    if (!message?.content?.trim()) return

    try {
      if (playingMessageId === message.id) {
        clearCurrentAudio()
        return
      }

      clearCurrentAudio()
      setLoadingMessageId(message.id)

      const response = await loginApi({
        method: 'POST',
        url: '/mycharacter/tts',
        data: {
          text: message.content,
          message: message.content
        },
        responseType: 'blob',
        headers: {
          Accept: 'audio/mpeg',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      })

      const contentType = response.headers?.['content-type'] || ''
      if (!contentType.includes('audio')) {
        const rawText = await response.data.text()
        let parsedError = rawText
        try {
          const json = JSON.parse(rawText)
          parsedError = json?.message || rawText
        }
        catch {
          parsedError = rawText || 'Server did not return audio.'
        }
        throw new Error(parsedError)
      }

      if (!response.data || response.data.size === 0) {
        throw new Error('Audio file is empty.')
      }

      const audioBlob = new Blob([response.data], { type: contentType })
      const audioUrl = URL.createObjectURL(audioBlob)
      const audio = new Audio(audioUrl)

      audioRef.current = audio
      audioUrlRef.current = audioUrl
      setPlayingMessageId(message.id)

      audio.onended = () => {
        clearCurrentAudio()
      }

      audio.onerror = () => {
        clearCurrentAudio()
        Swal.fire({
          icon: 'error',
          title: 'Text to speech error!',
          text: 'Audio format is not playable by this browser.'
        })
      }

      await audio.play()
    }
    catch (error) {
      clearCurrentAudio()
      let errorMessage = error.response?.data?.message || error.message || 'Failed to play audio.'

      if (error.response?.data instanceof Blob) {
        try {
          const rawText = await error.response.data.text()
          const json = JSON.parse(rawText)
          errorMessage = json?.message || rawText || errorMessage
        }
        catch {
          errorMessage = 'Failed to play audio.'
        }
      }

      Swal.fire({
        icon: 'error',
        title: 'Text to speech error!',
        text: errorMessage
      })
    }
    finally {
      setLoadingMessageId(null)
    }
  }

  useEffect(() => {
    fetchMessages()
  }, [])

  useEffect(() => {
    return () => {
      clearCurrentAudio()
    }
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
                <div className="flex items-center gap-2">
                  <span>{e.content}</span>
                  <button
                    type="button"
                    onClick={() => speakMessage(e)}
                    disabled={loadingMessageId === e.id}
                    className="text-xs px-2 py-1 rounded bg-white/70 hover:bg-white disabled:opacity-50"
                  >
                    {loadingMessageId === e.id
                      ? 'Loading...'
                      : playingMessageId === e.id
                        ? 'Stop'
                        : 'Play'}
                  </button>
                </div>
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
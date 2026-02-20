import Swal from "sweetalert2"
import { loginApi } from "../http/axios"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router"

export default function ReadChapter () {
  const [chapter, setChapter] = useState({})
  const {storyId, chapterId} = useParams()

  async function fetchChapter() {
    try {
      const response = await loginApi({
        method: 'GET',
        url: `/stories/${storyId}/${chapterId}`
      })
      setChapter(response.data.data)
      console.log(response.data.data )
    }
    catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Fetching chapter error!',
        text: error.response?.data?.message
      })
    }
  }

  useEffect(() => {
    fetchChapter()
  }, [])
  return (
    <>
      <div
        className="mt-15 flex flex-col items-center gap-10 w-screen p-10 bg-amber-50 text-slate-900 min-h-screen"
        >
        <div
          className="w-full flex justify-start gap-10"
        >
          <Link to={`/${storyId}`}
            className="underline text-xl hover:text-blue-400"
          >
            Back to Story Home
          </Link>
        </div>
        <div
          className="h-70 w-2/5 flex items-center justify-center mb-5 outline-1 outline-slate-900"
        >

          <img src={chapter.chapterImageUrl} alt="buffering" 
            className="w-full h-full object-cover"
          />
        
        
        </div>
        <div 
          className="w-full h-100 p-5 outline-1 outline-slate-900 flex flex-col gap-5 items-center">
          <h1 className="text-3xl m-5 font-bold">{chapter.name}</h1>
          <p
            className="text-xl p-20"
          >{chapter.body}</p>
        </div>
      </div>
    </>
  )
}
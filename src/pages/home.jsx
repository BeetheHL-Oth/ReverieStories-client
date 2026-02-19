import { useEffect, useState } from "react"
import { loginApi } from "../http/axios"
import Swal from "sweetalert2"
import CardLooper from "../components/cardLooper"

export default function Home () {
  const [stories, setStories] = useState([])
  const [storyCount, setStoryCount] = useState(0)
  const [page, setPage] = useState(1)
  const [tag, setTag] = useState('')
  const [search, setSearch] = useState('')

  function incrementPage () {
    let limitPerPage = 10 //has to change both in backend and frontend
    if (page >= Math.ceil(storyCount/limitPerPage)) {
      return null
    }
    setPage(page + 1)
  }

  function decrementPage () {
    if (page <= 1) {
      return null
    }
    setPage(page - 1)
  }
  
  async function fetchStories() {
    try {
      const query = new URLSearchParams({
        page,
        tag,
        search
      }).toString()

      const response = await loginApi({
        method: 'GET',
        url: '/stories'
      })
  
      setStories(response.data.data)
      setStoryCount(response.data.count)
    }
    catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Fetching stories error!',
        text: error.response?.data?.message
      })
    }
  }

  useEffect(() => {
    fetchStories()
  }, [page, search, tag])

  return (
    <>
      <div 
        className="flex gap-2 p-10 mt-20 min-h-screen w-screen bg-stone-50 text-slate-900"
      >

        <div 
          className="flex w-3/4 outline-1 outline-neutral-300 shadow-xl"
        >

          <h1>Hello World</h1> {/* placeholder for div with story detail inside */}

        </div>

        <div 
          className="flex flex-col w-1/4 h-full"
        >

          <CardLooper array={stories}/>

        </div>
        
      </div>
    </>
  )
}